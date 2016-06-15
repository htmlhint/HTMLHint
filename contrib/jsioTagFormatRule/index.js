'use strict';

let debug;
try {
  debug = require('debug');
} catch (e) {
  debug = function () {
    return () => {};
  };
}


let DEFAULT_CONFIG = {
  indentSize: 2,
  maxLineLength: 80
};


let getEventLines = function (event) {
  return {
    start: event.line,
    end: event.line + Math.max(event.raw.split('\n').length - 1, 0)
  };
};


class Tag {
  constructor (rule, event) {
    this.rule = rule;

    this.event = event;
    this.children = [];

    // How many indentations is this tag on
    this.indentCount = Math.floor((event.col - 1) / rule.conf.indentSize);

    this.isMultiline = event.raw.indexOf('\n') > 0;

    this.parent = null;
    this.onOwnLine = true;
  }

  setParent (parent) {
    this.parent = parent;
    // Own line: check parent lines
    if (parent) {
      let parentLines = parent.getLines();
      this.onOwnLine = this.event.line > parentLines.end;
    } else {
      this.onOwnLine = true;
    }
    // Own line: check last event
    if (this.onOwnLine && this.event.lastEvent) {
      // Only take events with text on them in to account
      if (this.event.lastEvent.raw.match(/\w/)) {
        let lastLines = getEventLines(this.event.lastEvent);
        this.onOwnLine = this.event.line > lastLines.end;
      }
    }
  }

  addChild (child) {
    child.setParent(this);
    this.children.push(child);
  }

  getLines () {
    return getEventLines(this.event);
  }

  getInfo () {
    return {
      col: this.event.col,
      raw: this.event.raw,
      indentCount: this.indentCount,
      onOwnLine: this.onOwnLine,
      parent: this.parent && this.parent.event.raw.substring(0, 32)
    };
  }
}


let jsioTagFormat = {
  id: 'jsio-tag-format',
  description: 'Enforce tag multiline formatting and indentation',
  init: function (parser, reporter, rulesetConf) {
    if (typeof rulesetConf === 'object') {
      this.conf = rulesetConf;
    } else {
      this.conf = DEFAULT_CONFIG;
    }

    // Helper functions
    let generalDebug = debug('jsioTagFormat');
    let warn = (msg, event) => {
      generalDebug('> Warn:', msg);
      reporter.warn(msg, event.line, event.col, this, event.raw);
    };

    let warnAttr = (msg, attr, event) => {
      generalDebug('> Warn attr:', msg);
      let attrSubpos = event.raw.indexOf(attr.raw);
      let lineDiff = event.raw.substring(0, attrSubpos).split('\n').length;
      if (attr.raw.indexOf('\n') !== 0) {
        lineDiff -= 1;
      }
      reporter.warn(msg, event.line + lineDiff, event.col, this, event.raw);
    };

    // Book keeping
    // Build a tag tree
    let currentParentTag = null;

    let popCurrentParent = () => {
      if (!currentParentTag) {
        return;
      }
      generalDebug('> Restoring parent as currentParentTag');
      currentParentTag = currentParentTag.parent;
    };

    let pushCurrentParent = tag => {
      if (!currentParentTag) {
        currentParentTag = tag;
      } else {
        currentParentTag.addChild(tag);
        currentParentTag = tag;
      }
    };

    let textDebug = debug('jsioTagFormat:text');
    parser.addListener('text', event => {
      textDebug(event);
      // Verify tag text indentation level
      if (event.raw.indexOf('\n') !== 0) {
        return;
      }

      // Skip empty lines
      let match = event.raw.match(/^\n( *)([^ ])/);
      if (!match || !match[1].length) {
        return;
      }

      if (!currentParentTag) {
        return;
      }
      let indentCount = match[1].length / this.conf.indentSize;
      if (indentCount !== currentParentTag.indentCount + 1) {
        warn('Bad indentation count: ' + indentCount + ' (expected: ' + (currentParentTag.indentCount + 1) + ')', event);
      }
    });

    // Add the listeners!
    let tagstartDebug = debug('jsioTagFormat:tagstart');
    parser.addListener('tagstart', event => {
      let tag = new Tag(this, event);
      pushCurrentParent(tag);

      tagstartDebug(tag.getInfo());

      // Check line length (only the first line, htmlhint doesnt post good line events)
      let line = event.raw.split('\n')[0];
      let lineLength = line.length + (event.col - 1);
      if (this.conf.maxLineLength && lineLength > this.conf.maxLineLength) {
        warn('Line too long', event);
      }

      // Only check tags that are on their own line
      if (!tag.onOwnLine) {
        if (tag.isMultiline) {
          warn('Multiline tags should be on their own line', event);
        } else {
          tagstartDebug('> Skipping: same line as parent');
        }
        if (event.close) {
          popCurrentParent();
        }
        return;
      }

      let col = event.col - 1;
      // Warn abount tab amounts that are not divisble by the indent size
      if (col % this.conf.indentSize !== 0) {
        warn('Bad indentation size: ' + col, event);
      }

      // Warn about expected indent count
      if (tag.parent && tag.indentCount !== tag.parent.indentCount + 1) {
        warn('Bad indentation count: ' + tag.indentCount + ' (expected: ' + (tag.parent.indentCount + 1) + ')', event);
      }

      // Check multiline-format
      if (tag.isMultiline) {
        for (let i = 0; i < event.attrs.length; i++) {
          let attr = event.attrs[i];
          // Check that attr is on its own line
          if (attr.raw.indexOf('\n') !== 0) {
            warnAttr('Multiline tag: should specify attributes on new lines', attr, event);
            continue;
          }
          // Check the attr indentation level
          let match = attr.raw.match(/( *)(.+)$/);
          if (!match) {
            warnAttr('Multiline tag: attr should have leading whitespace', attr, event);
            continue;
          }
          let attrIndentCount = match[1].length / this.conf.indentSize;
          let expectedAttrIndentCount = tag.indentCount + 1;
          if (attrIndentCount !== expectedAttrIndentCount) {
            warnAttr('Multiline tag: attr bad indent count: ' + attrIndentCount + ' (expected: ' + expectedAttrIndentCount + ')', attr, event);
            continue;
          }
        }
        // Check that the '>' is hanging
        let hangingTagMatch = event.raw.match(/\n( *)(>|\/>)$/);
        if (!hangingTagMatch) {
          warn('Multiline tag: Should have hanging ">" or "/>"', event);
        } else {
          let hangingIndentCount = hangingTagMatch[1].length / this.conf.indentSize;
          if (hangingIndentCount !== tag.indentCount) {
            warnAttr(
              'Multiline tag: hanging ">" bad indentation: ' + hangingIndentCount + ' (expected: ' + tag.indentCount + ')',
              { raw: hangingTagMatch[0] },
              event
            );
          }
        }
      }

      // Check for self closing tags
      if (event.close) {
        popCurrentParent();
      }
    });

    let tagendDebug = debug('jsioTagFormat:tagend');
    parser.addListener('tagend', event => {
      tagendDebug(event.col - 1, event.raw);
      if (currentParentTag) {
        // Check that the end tag matches start tag (only if the end is on its own line)
        let currentTagLines = currentParentTag.getLines();
        let indentCount = (event.col - 1) / this.conf.indentSize;
        if (event.line > currentTagLines.end &&
            indentCount !== currentParentTag.indentCount) {
          warn('Tag end: bad indentation: ' + indentCount + ' (expected: ' + currentParentTag.indentCount + ')', event);
        }
      }
      popCurrentParent();
      tagendDebug();
    });

    // Cleanup and reset
    parser.addListener('end', event => {
      generalDebug('got end, resetting');
      currentParentTag = null;
    });
  }
};

module.exports = jsioTagFormat;

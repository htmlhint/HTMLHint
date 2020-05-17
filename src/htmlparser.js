class HTMLParser {
  constructor() {
    this._listeners = {}
    this._mapCdataTags = this.makeMap('script,style')
    this._arrBlocks = []
    this.lastEvent = null
  }

  makeMap(str) {
    var obj = {},
      items = str.split(',')

    for (var i = 0; i < items.length; i++) {
      obj[items[i]] = true
    }

    return obj
  }

  parse(html) {
    var self = this,
      mapCdataTags = self._mapCdataTags

    // eslint-disable-next-line
    var regTag = /<(?:\/([^\s>]+)\s*|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:\s+[^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]*))?)*?)\s*(\/?))>/g,
      // eslint-disable-next-line
      regAttr = /\s*([^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s"'>]*)))?/g,
      regLine = /\r?\n/g

    var match,
      matchIndex,
      lastIndex = 0,
      tagName,
      arrAttrs,
      tagCDATA,
      attrsCDATA,
      arrCDATA,
      lastCDATAIndex = 0,
      text
    var lastLineIndex = 0,
      line = 1
    var arrBlocks = self._arrBlocks

    self.fire('start', {
      pos: 0,
      line: 1,
      col: 1,
    })

    // Memory block
    function saveBlock(type, raw, pos, data) {
      var col = pos - lastLineIndex + 1
      if (data === undefined) {
        data = {}
      }
      data.raw = raw
      data.pos = pos
      data.line = line
      data.col = col
      arrBlocks.push(data)
      self.fire(type, data)

      // eslint-disable-next-line
      var lineMatch
      while ((lineMatch = regLine.exec(raw))) {
        line++
        lastLineIndex = pos + regLine.lastIndex
      }
    }

    while ((match = regTag.exec(html))) {
      matchIndex = match.index
      if (matchIndex > lastIndex) {
        // Save the previous text or CDATA
        text = html.substring(lastIndex, matchIndex)
        if (tagCDATA) {
          arrCDATA.push(text)
        } else {
          // text
          saveBlock('text', text, lastIndex)
        }
      }
      lastIndex = regTag.lastIndex

      if ((tagName = match[1])) {
        if (tagCDATA && tagName === tagCDATA) {
          // Output CDATA before closing the label
          text = arrCDATA.join('')
          saveBlock('cdata', text, lastCDATAIndex, {
            tagName: tagCDATA,
            attrs: attrsCDATA,
          })
          tagCDATA = null
          attrsCDATA = null
          arrCDATA = null
        }

        if (!tagCDATA) {
          // End of label
          saveBlock('tagend', match[0], matchIndex, {
            tagName: tagName,
          })
          continue
        }
      }

      if (tagCDATA) {
        arrCDATA.push(match[0])
      } else {
        if ((tagName = match[4])) {
          // Label start
          arrAttrs = []
          var attrs = match[5],
            attrMatch,
            attrMatchCount = 0

          while ((attrMatch = regAttr.exec(attrs))) {
            var name = attrMatch[1],
              quote = attrMatch[2]
                ? attrMatch[2]
                : attrMatch[4]
                ? attrMatch[4]
                : '',
              value = attrMatch[3]
                ? attrMatch[3]
                : attrMatch[5]
                ? attrMatch[5]
                : attrMatch[6]
                ? attrMatch[6]
                : ''

            arrAttrs.push({
              name: name,
              value: value,
              quote: quote,
              index: attrMatch.index,
              raw: attrMatch[0],
            })
            attrMatchCount += attrMatch[0].length
          }

          if (attrMatchCount === attrs.length) {
            saveBlock('tagstart', match[0], matchIndex, {
              tagName: tagName,
              attrs: arrAttrs,
              close: match[6],
            })

            if (mapCdataTags[tagName]) {
              tagCDATA = tagName
              attrsCDATA = arrAttrs.concat()
              arrCDATA = []
              lastCDATAIndex = lastIndex
            }
          } else {
            // If a miss match occurs, the current content is matched to text
            saveBlock('text', match[0], matchIndex)
          }
        } else if (match[2] || match[3]) {
          // Comment tag
          saveBlock('comment', match[0], matchIndex, {
            content: match[2] || match[3],
            long: match[2] ? true : false,
          })
        }
      }
    }

    if (html.length > lastIndex) {
      // End text
      text = html.substring(lastIndex, html.length)
      saveBlock('text', text, lastIndex)
    }

    self.fire('end', {
      pos: lastIndex,
      line: line,
      col: html.length - lastLineIndex + 1,
    })
  }

  addListener(types, listener) {
    var _listeners = this._listeners
    var arrTypes = types.split(/[,\s]/),
      type

    for (var i = 0, l = arrTypes.length; i < l; i++) {
      type = arrTypes[i]
      if (_listeners[type] === undefined) {
        _listeners[type] = []
      }
      _listeners[type].push(listener)
    }
  }

  fire(type, data) {
    if (data === undefined) {
      data = {}
    }
    data.type = type
    var self = this,
      listeners = [],
      listenersType = self._listeners[type],
      listenersAll = self._listeners['all']

    if (listenersType !== undefined) {
      listeners = listeners.concat(listenersType)
    }
    if (listenersAll !== undefined) {
      listeners = listeners.concat(listenersAll)
    }

    var lastEvent = self.lastEvent
    if (lastEvent !== null) {
      delete lastEvent['lastEvent']
      data.lastEvent = lastEvent
    }

    self.lastEvent = data

    for (var i = 0, l = listeners.length; i < l; i++) {
      listeners[i].call(self, data)
    }
  }

  removeListener(type, listener) {
    var listenersType = this._listeners[type]
    if (listenersType !== undefined) {
      for (var i = 0, l = listenersType.length; i < l; i++) {
        if (listenersType[i] === listener) {
          listenersType.splice(i, 1)
          break
        }
      }
    }
  }

  fixPos(event, index) {
    var text = event.raw.substr(0, index)
    var arrLines = text.split(/\r?\n/),
      lineCount = arrLines.length - 1,
      line = event.line,
      col

    if (lineCount > 0) {
      line += lineCount
      col = arrLines[lineCount].length + 1
    } else {
      col = event.col + index
    }

    return {
      line: line,
      col: col,
    }
  }

  getMapAttrs(arrAttrs) {
    var mapAttrs = {},
      attr

    for (var i = 0, l = arrAttrs.length; i < l; i++) {
      attr = arrAttrs[i]
      mapAttrs[attr.name] = attr.value
    }

    return mapAttrs
  }
}

export default HTMLParser

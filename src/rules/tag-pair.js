export default {
  id: 'tag-pair',
  description: 'Tag must be paired.',
  init: function(parser, reporter) {
    var self = this;
    
    function makeComplexMap(arr){
      return arr.reduce(function(p,c){
        c[0].split(',').forEach(function(v){
          p[v] = parser.makeMap(c[1]);
        });
        return p;
      }, {});
    }
    function inComplexMap(complexMap, left, right){
      return !!(left && right && complexMap[left] && complexMap[left][right]);
    }
    
    var stack = [],
      
      // https://html.spec.whatwg.org/multipage/syntax.html#optional-tags
      prevClosingTags = makeComplexMap([
        // [targettags, prevtags]
        ['li', 'li'],
        ['dt,dd', 'dt,dd'],
        ['option','option'],
        ['optgroup','optgroup,option'],
        ['rt,rp', 'rt,rp'],
        ['tr,td,th', 'tr,td,th'],
        ['address,article,aside,blockquote,details,'+
           'div,dl,fieldset,figcaption,figure,footer'+
           'form,h1,h2,h3,h4,h5,h6,header,hgroup,'+
           'hr,main,menu,nav,ol,p,pre,section,table,ul',
          'p'],
      ]),
      lastChildClosingTags = makeComplexMap([
        // targettags, lastchildtags
        ['ul,ol', 'li'],
        ['dl', 'dt,dd'],
        ['optgroup', 'option'],
        ['select', 'optgroup,option'],
        ['ruby', 'rt,rp'],
        ['table,tbody,thead,tfoot','tr,td,th,thead,tbody,tfoot'],
      ]),
    
      mapEmptyTags = parser.makeMap(
        'area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr'
      ); //HTML 4.01 + HTML 5
    parser.addListener('tagstart', function(event) {
      var tagName = event.tagName.toLowerCase();
      if (mapEmptyTags[tagName] === undefined && !event.close) {

        var lastTagName = stack.length && stack[stack.length-1].tagName;
        if (inComplexMap(prevClosingTags, tagName, lastTagName)) {
          // auto close sequenced tags
        } else {
          
          stack.push({
              tagName: tagName,
              line: event.line,
              raw: event.raw
            });
          
        }
      }
    });
    parser.addListener('tagend', function(event) {
      var tagName = event.tagName.toLowerCase();
      // Look up the matching start tag
      for (var pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].tagName === tagName) {
          break;
        }
      }
      if (pos >= 0) {

        // auto close last child
        while(stack.length){
          var lastTagName = stack[stack.length-1].tagName;
          if (inComplexMap(lastChildClosingTags, tagName, lastTagName)) {
            stack.pop();
          } else {
            break;
          }
        }

        var arrTags = [];
        for (var i = stack.length - 1; i > pos; i--) {
          arrTags.push('</' + stack[i].tagName + '>');
        }
        if (arrTags.length > 0) {
          var lastEvent = stack[stack.length - 1];
          reporter.error(
            'Tag must be paired, missing: [ ' +
              arrTags.join('') +
              ' ], start tag match failed [ ' +
              lastEvent.raw +
              ' ] on line ' +
              lastEvent.line +
              '.',
            event.line,
            event.col,
            self,
            event.raw
          );
        }
        stack.length = pos;
      } else {
        reporter.error(
          'Tag must be paired, no start tag: [ ' + event.raw + ' ]',
          event.line,
          event.col,
          self,
          event.raw
        );
      }
    });
    parser.addListener('end', function(event) {
      var arrTags = [];
      for (var i = stack.length - 1; i >= 0; i--) {
        arrTags.push('</' + stack[i].tagName + '>');
      }
      if (arrTags.length > 0) {
        var lastEvent = stack[stack.length - 1];
        reporter.error(
          'Tag must be paired, missing: [ ' +
            arrTags.join('') +
            ' ], open tag match failed [ ' +
            lastEvent.raw +
            ' ] on line ' +
            lastEvent.line +
            '.',
          event.line,
          event.col,
          self,
          ''
        );
      }
    });
  }
};

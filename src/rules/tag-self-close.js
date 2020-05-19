export default {
  id: 'tag-self-close',
  description: 'Empty tags must be self closed.',
  init(parser, reporter) {
    var mapEmptyTags = parser.makeMap(
      'area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr'
    ) //HTML 4.01 + HTML 5

    parser.addListener('tagstart', (event) => {
      var tagName = event.tagName.toLowerCase()
      if (mapEmptyTags[tagName] !== undefined) {
        if (!event.close) {
          reporter.warn(
            `The empty tag : [ ${tagName} ] must be self closed.`,
            event.line,
            event.col,
            this,
            event.raw
          )
        }
      }
    })
  },
}

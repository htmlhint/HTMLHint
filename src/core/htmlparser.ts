import { Hint } from './types'

class HTMLParser {
  public lastEvent: null

  private _listeners: { [type: string]: any }
  private _mapCdataTags: { [tagName: string]: boolean }
  private _arrBlocks: any[]

  constructor() {
    this._listeners = {}
    this._mapCdataTags = this.makeMap('script,style')
    this._arrBlocks = []
    this.lastEvent = null
  }

  makeMap(str: string) {
    const obj: { [key: string]: boolean } = {}
    const items = str.split(',')

    for (let i = 0; i < items.length; i++) {
      obj[items[i]] = true
    }

    return obj
  }

  parse(html: string) {
    const mapCdataTags = this._mapCdataTags

    // eslint-disable-next-line no-control-regex, no-useless-escape
    const regTag = /<(?:\/([^\s>]+)\s*|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:\s+[^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]*))?)*?)\s*(\/?))>/g
    // eslint-disable-next-line no-control-regex, no-useless-escape
    const regAttr = /\s*([^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s"'>]*)))?/g
    const regLine = /\r?\n/g

    let match: RegExpExecArray | null
    let matchIndex: number
    let lastIndex = 0
    let tagName: string
    let arrAttrs: Array<{
      name: string
      value: string
      quote: string
      index: number
      raw: string
    }>
    let tagCDATA: string | null
    let attrsCDATA: Array<{
      name: string
      value: string
      quote: string
      index: number
      raw: string
    }> | null
    let arrCDATA: string[] | null
    let lastCDATAIndex = 0
    let text: string
    let lastLineIndex = 0
    let line = 1
    const arrBlocks = this._arrBlocks

    this.fire('start', {
      pos: 0,
      line: 1,
      col: 1,
    })

    // Memory block
    const saveBlock = (type: string, raw: string, pos: number, data?: any) => {
      const col = pos - lastLineIndex + 1
      if (data === undefined) {
        data = {}
      }
      data.raw = raw
      data.pos = pos
      data.line = line
      data.col = col
      arrBlocks.push(data)
      this.fire(type, data)

      // eslint-disable-next-line no-unused-vars
      let lineMatch: RegExpExecArray | null
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
          const attrs = match[5]
          let attrMatch
          let attrMatchCount = 0

          while ((attrMatch = regAttr.exec(attrs))) {
            const name = attrMatch[1]
            const quote = attrMatch[2]
              ? attrMatch[2]
              : attrMatch[4]
              ? attrMatch[4]
              : ''
            const value = attrMatch[3]
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

    this.fire('end', {
      pos: lastIndex,
      line: line,
      col: html.length - lastLineIndex + 1,
    })
  }

  addListener(
    types: string,
    listener: (event: {
      tagName: string
      attrs: Array<{
        name: string
        value: any
        index: number
        raw: string
        quote: string
      }>
      col: number
      line: number
      raw: string
    }) => void
  ) {
    const _listeners = this._listeners
    const arrTypes = types.split(/[,\s]/)
    let type

    for (let i = 0, l = arrTypes.length; i < l; i++) {
      type = arrTypes[i]
      if (_listeners[type] === undefined) {
        _listeners[type] = []
      }
      _listeners[type].push(listener)
    }
  }

  fire(type: string, data: any) {
    if (data === undefined) {
      data = {}
    }
    data.type = type

    let listeners: any[] = []
    const listenersType = this._listeners[type]
    const listenersAll = this._listeners['all']

    if (listenersType !== undefined) {
      listeners = listeners.concat(listenersType)
    }
    if (listenersAll !== undefined) {
      listeners = listeners.concat(listenersAll)
    }

    const lastEvent = this.lastEvent
    if (lastEvent !== null) {
      delete lastEvent['lastEvent']
      data.lastEvent = lastEvent
    }

    this.lastEvent = data

    for (let i = 0, l = listeners.length; i < l; i++) {
      listeners[i].call(this, data)
    }
  }

  removeListener(type: string, listener: string) {
    const listenersType: string[] | undefined = this._listeners[type]
    if (listenersType !== undefined) {
      for (let i = 0, l = listenersType.length; i < l; i++) {
        if (listenersType[i] === listener) {
          listenersType.splice(i, 1)
          break
        }
      }
    }
  }

  fixPos(event: Hint, index: number) {
    const text = event.raw.substr(0, index)
    const arrLines = text.split(/\r?\n/)
    const lineCount = arrLines.length - 1
    let line = event.line
    let col: number

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

  getMapAttrs(arrAttrs: Array<{ name: string; value: any }>) {
    const mapAttrs: { [name: string]: any } = {}
    let attr

    for (let i = 0, l = arrAttrs.length; i < l; i++) {
      attr = arrAttrs[i]
      mapAttrs[attr.name] = attr.value
    }

    return mapAttrs
  }
}

export default HTMLParser

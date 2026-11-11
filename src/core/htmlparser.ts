export interface Attr {
  name: string
  value: string
  quote: string
  index: number
  raw: string
}

export interface Block {
  tagName: string
  attrs: Attr[]
  type: string
  raw: string
  pos: number
  line: number
  col: number
  content: string
  long: boolean
  close: string
  lastEvent?: Partial<Block>
}

export type Listener = (event: Block) => void

const isSpace = (code: number): boolean =>
  code === 0x20 ||
  (code >= 0x09 && code <= 0x0d) ||
  code === 0x00a0 ||
  code === 0x1680 ||
  (code >= 0x2000 && code <= 0x200a) ||
  code === 0x2028 ||
  code === 0x2029 ||
  code === 0x202f ||
  code === 0x205f ||
  code === 0x3000 ||
  code === 0xfeff

const isTagNameChar = (code: number): boolean =>
  (code >= 0x61 && code <= 0x7a) ||
  (code >= 0x41 && code <= 0x5a) ||
  (code >= 0x30 && code <= 0x39) ||
  code === 0x5f ||
  code === 0x2d ||
  code === 0x3a

const isAttrNameChar = (code: number): boolean =>
  !isSpace(code) &&
  code !== 0x22 &&
  code !== 0x27 &&
  code !== 0x3e &&
  code !== 0x2f &&
  code !== 0x3d &&
  code > 0x0f &&
  code !== 0x7f &&
  (code < 0x80 || code > 0x9f)

const isUnquotedAttrValueChar = (code: number): boolean =>
  !isSpace(code) && code !== 0x22 && code !== 0x27 && code !== 0x3e

export default class HTMLParser {
  public lastEvent: Partial<Block> | null

  private _listeners: { [type: string]: Listener[] }
  private _mapCdataTags: { [tagName: string]: boolean }
  private _arrBlocks: Array<Partial<Block>>

  public constructor() {
    this._listeners = {}
    this._mapCdataTags = this.makeMap('script,style')
    this._arrBlocks = []
    this.lastEvent = null
  }

  public makeMap(str: string): {
    [key: string]: boolean
  } {
    const obj: { [key: string]: boolean } = {}
    const items = str.split(',')

    for (let i = 0; i < items.length; i++) {
      obj[items[i]] = true
    }

    return obj
  }

  public parse(html: string): void {
    const mapCdataTags = this._mapCdataTags
    const htmlLen = html.length

    let lastIndex = 0
    let tagName = ''
    let arrAttrs: Attr[] = []
    let tagCDATA: string | null = null
    let attrsCDATA: Attr[] | undefined
    let arrCDATA: string[] = []
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

    // Do not ignore validation inside <script type="ng/template"> template
    const isMapCdataTagsRequired = () => {
      const attrType = arrAttrs.find((attr) => attr.name === 'type') || {
        value: '',
      }

      return (
        mapCdataTags[tagName] &&
        attrType.value.indexOf('text/ng-template') === -1
      )
    }

    // Memory block
    const saveBlock = (
      type: string,
      raw: string,
      pos: number,
      data?: Partial<Block>
    ) => {
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

      let nlIndex = raw.indexOf('\n')
      while (nlIndex !== -1) {
        line++
        lastLineIndex = pos + nlIndex + 1
        nlIndex = raw.indexOf('\n', nlIndex + 1)
      }
    }

    let gtPos = -1
    const nextGt = (from: number): number => {
      if (gtPos < from) {
        const found = html.indexOf('>', from)
        gtPos = found === -1 ? htmlLen : found
      }
      return gtPos
    }

    let endTagP = -1
    let endTagQ = -1
    const scanEndTag = (from: number): number => {
      if (endTagP < from) {
        let p = from
        while (p < htmlLen) {
          const c = html.charCodeAt(p)
          if (c === 0x3e || isSpace(c)) {
            break
          }
          p++
        }
        let q = p
        while (q < htmlLen && isSpace(html.charCodeAt(q))) {
          q++
        }
        endTagP = p
        endTagQ = q
      }
      if (
        endTagP > from &&
        endTagQ < htmlLen &&
        html.charCodeAt(endTagQ) === 0x3e
      ) {
        return endTagQ + 1
      }
      return -1
    }

    let commentCloseK = -1
    let commentCloseEnd = htmlLen
    const findCommentClose = (from: number): number => {
      if (commentCloseK < from) {
        let k = from
        while (true) {
          const dash = html.indexOf('--', k)
          if (dash === -1 || dash + 2 >= htmlLen) {
            commentCloseK = htmlLen
            commentCloseEnd = htmlLen
            break
          }
          const c2 = html.charCodeAt(dash + 2)
          if (c2 === 0x3e) {
            commentCloseK = dash
            commentCloseEnd = dash + 3
            break
          }
          if (
            c2 === 0x21 &&
            dash + 3 < htmlLen &&
            html.charCodeAt(dash + 3) === 0x3e
          ) {
            commentCloseK = dash
            commentCloseEnd = dash + 4
            break
          }
          k = dash + 1
        }
      }
      return commentCloseK
    }

    let failedStates: Uint8Array | null = null
    let noDoubleQuoteFrom = htmlLen + 1
    let noSingleQuoteFrom = htmlLen + 1
    const dfsStack: number[] = []
    let spanAttrsEnd = 0
    let spanClose = ''

    const markFailedState = (state: number) => {
      if (failedStates === null) {
        failedStates = new Uint8Array(Math.ceil((htmlLen * 3 + 3) / 8))
      }
      failedStates[state >>> 3] |= 1 << (state & 7)
    }

    const findStartTagSpan = (tagNameEnd: number): number => {
      dfsStack.length = 0
      dfsStack.push(tagNameEnd * 3)

      while (dfsStack.length > 0) {
        const item = dfsStack.pop()!
        if (item < 0) {
          markFailedState(~item)
          continue
        }

        if (
          failedStates !== null &&
          (failedStates[item >>> 3] & (1 << (item & 7))) !== 0
        ) {
          continue
        }

        const role = item % 3
        const cursor = (item - role) / 3
        let wsEnd = cursor

        if (role !== 2) {
          while (wsEnd < htmlLen && isSpace(html.charCodeAt(wsEnd))) {
            wsEnd++
          }
          if (wsEnd >= htmlLen) {
            markFailedState(item)
            continue
          }

          const ch = html.charCodeAt(wsEnd)
          if (ch === 0x3e) {
            spanAttrsEnd = cursor
            spanClose = ''
            return wsEnd + 1
          }
          if (
            ch === 0x2f &&
            wsEnd + 1 < htmlLen &&
            html.charCodeAt(wsEnd + 1) === 0x3e
          ) {
            spanAttrsEnd = cursor
            spanClose = '/'
            return wsEnd + 2
          }

          const hasSep = wsEnd > cursor || role === 1
          if (!hasSep || !isAttrNameChar(ch)) {
            markFailedState(item)
            continue
          }
        }

        let nameEnd = wsEnd + 1
        while (nameEnd < htmlLen && isAttrNameChar(html.charCodeAt(nameEnd))) {
          nameEnd++
        }

        let eqPos = nameEnd
        while (eqPos < htmlLen && isSpace(html.charCodeAt(eqPos))) {
          eqPos++
        }
        if (eqPos >= htmlLen || html.charCodeAt(eqPos) !== 0x3d) {
          dfsStack.push(~item)
          dfsStack.push(nameEnd * 3)
          continue
        }

        let valStart = eqPos + 1
        while (valStart < htmlLen && isSpace(html.charCodeAt(valStart))) {
          valStart++
        }
        if (valStart >= htmlLen) {
          markFailedState(item)
          continue
        }

        const vch = html.charCodeAt(valStart)
        if (vch === 0x3e) {
          spanAttrsEnd = valStart
          spanClose = ''
          return valStart + 1
        }

        if (vch === 0x22) {
          if (valStart + 1 >= noDoubleQuoteFrom) {
            markFailedState(item)
            continue
          }
          const closeQuote = html.indexOf('"', valStart + 1)
          if (closeQuote === -1) {
            noDoubleQuoteFrom = valStart + 1
            markFailedState(item)
            continue
          }
          dfsStack.push(~item)
          dfsStack.push((closeQuote + 1) * 3 + 1)
          continue
        }

        if (vch === 0x27) {
          if (valStart + 1 >= noSingleQuoteFrom) {
            markFailedState(item)
            continue
          }
          const closeQuote = html.indexOf("'", valStart + 1)
          if (closeQuote === -1) {
            noSingleQuoteFrom = valStart + 1
            markFailedState(item)
            continue
          }
          dfsStack.push(~item)
          dfsStack.push((closeQuote + 1) * 3 + 1)
          continue
        }

        let valEnd = valStart + 1
        while (
          valEnd < htmlLen &&
          isUnquotedAttrValueChar(html.charCodeAt(valEnd))
        ) {
          valEnd++
        }

        dfsStack.push(~item)
        if (valStart > eqPos + 1 && isAttrNameChar(vch)) {
          dfsStack.push(valStart * 3 + 2)
        }
        dfsStack.push(valEnd * 3)
      }

      return -1
    }

    const parseAttrs = (tagNameEnd: number, attrsEnd: number): boolean => {
      arrAttrs = []
      let cursor = tagNameEnd

      while (cursor < attrsEnd) {
        let wsEnd = cursor
        while (wsEnd < attrsEnd && isSpace(html.charCodeAt(wsEnd))) {
          wsEnd++
        }
        if (wsEnd >= attrsEnd || !isAttrNameChar(html.charCodeAt(wsEnd))) {
          return false
        }

        let nameEnd = wsEnd + 1
        while (nameEnd < attrsEnd && isAttrNameChar(html.charCodeAt(nameEnd))) {
          nameEnd++
        }
        const attrName = html.slice(wsEnd, nameEnd)

        let eqPos = nameEnd
        while (eqPos < attrsEnd && isSpace(html.charCodeAt(eqPos))) {
          eqPos++
        }
        if (eqPos >= attrsEnd || html.charCodeAt(eqPos) !== 0x3d) {
          arrAttrs.push({
            name: attrName,
            value: '',
            quote: '',
            index: cursor - tagNameEnd,
            raw: html.slice(cursor, nameEnd),
          })
          cursor = nameEnd
          continue
        }

        let valStart = eqPos + 1
        while (valStart < attrsEnd && isSpace(html.charCodeAt(valStart))) {
          valStart++
        }

        if (valStart < attrsEnd && html.charCodeAt(valStart) === 0x22) {
          const closeQuote = html.indexOf('"', valStart + 1)
          if (closeQuote === -1 || closeQuote >= attrsEnd) {
            return false
          }
          arrAttrs.push({
            name: attrName,
            value: html.slice(valStart + 1, closeQuote),
            quote: '"',
            index: cursor - tagNameEnd,
            raw: html.slice(cursor, closeQuote + 1),
          })
          cursor = closeQuote + 1
          continue
        }

        if (valStart < attrsEnd && html.charCodeAt(valStart) === 0x27) {
          const closeQuote = html.indexOf("'", valStart + 1)
          if (closeQuote === -1 || closeQuote >= attrsEnd) {
            return false
          }
          arrAttrs.push({
            name: attrName,
            value: html.slice(valStart + 1, closeQuote),
            quote: "'",
            index: cursor - tagNameEnd,
            raw: html.slice(cursor, closeQuote + 1),
          })
          cursor = closeQuote + 1
          continue
        }

        let valEnd = valStart
        while (
          valEnd < attrsEnd &&
          isUnquotedAttrValueChar(html.charCodeAt(valEnd))
        ) {
          valEnd++
        }
        arrAttrs.push({
          name: attrName,
          value: html.slice(valStart, valEnd),
          quote: '',
          index: cursor - tagNameEnd,
          raw: html.slice(cursor, valEnd),
        })
        cursor = valEnd
      }

      return true
    }

    let searchIndex = 0
    while (searchIndex < htmlLen) {
      const matchIndex = html.indexOf('<', searchIndex)
      if (matchIndex === -1 || matchIndex + 1 >= htmlLen) {
        break
      }
      if (nextGt(matchIndex + 1) === htmlLen) {
        break
      }

      const nextCode = html.charCodeAt(matchIndex + 1)
      let matchEnd = -1
      let matchedKind: 'end' | 'start' | 'comment' | null = null
      let commentContent = ''
      let isLongComment = false
      let startTagNameEnd = 0

      if (nextCode === 0x2f) {
        const endPos = scanEndTag(matchIndex + 2)
        if (endPos !== -1) {
          tagName = html.slice(matchIndex + 2, endTagP)
          matchEnd = endPos
          matchedKind = 'end'
        }
      } else if (nextCode === 0x21) {
        if (
          matchIndex + 3 < htmlLen &&
          html.charCodeAt(matchIndex + 2) === 0x2d &&
          html.charCodeAt(matchIndex + 3) === 0x2d
        ) {
          const afterOpen = matchIndex + 4
          if (afterOpen < htmlLen && html.charCodeAt(afterOpen) === 0x3e) {
            matchEnd = afterOpen + 1
            commentContent = ''
            isLongComment = true
            matchedKind = 'comment'
          } else if (
            afterOpen + 1 < htmlLen &&
            html.charCodeAt(afterOpen) === 0x2d &&
            html.charCodeAt(afterOpen + 1) === 0x3e
          ) {
            matchEnd = afterOpen + 2
            commentContent = ''
            isLongComment = true
            matchedKind = 'comment'
          } else {
            const closeK = findCommentClose(afterOpen)
            if (closeK < htmlLen) {
              matchEnd = commentCloseEnd
              commentContent = html.slice(afterOpen, closeK)
              isLongComment = true
              matchedKind = 'comment'
            }
          }
        }

        if (matchedKind === null) {
          const closeGt = nextGt(matchIndex + 2)
          if (closeGt < htmlLen) {
            matchEnd = closeGt + 1
            commentContent = html.slice(matchIndex + 2, closeGt)
            isLongComment = false
            matchedKind = 'comment'
          }
        }
      } else if (isTagNameChar(nextCode)) {
        let tagNameEnd = matchIndex + 2
        while (
          tagNameEnd < htmlLen &&
          isTagNameChar(html.charCodeAt(tagNameEnd))
        ) {
          tagNameEnd++
        }
        const endPos = findStartTagSpan(tagNameEnd)
        if (endPos !== -1) {
          tagName = html.slice(matchIndex + 1, tagNameEnd)
          startTagNameEnd = tagNameEnd
          matchEnd = endPos
          matchedKind = 'start'
        }
      }

      if (matchedKind === null) {
        searchIndex = matchIndex + 1
        continue
      }

      const rawMatch = html.slice(matchIndex, matchEnd)
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
      lastIndex = matchEnd
      searchIndex = matchEnd

      if (matchedKind === 'end') {
        if (tagCDATA && tagName === tagCDATA) {
          // Output CDATA before closing the label
          text = arrCDATA.join('')
          saveBlock('cdata', text, lastCDATAIndex, {
            tagName: tagCDATA,
            attrs: attrsCDATA,
          })
          tagCDATA = null
          attrsCDATA = undefined
          arrCDATA = []
        }

        if (!tagCDATA) {
          // End of label
          saveBlock('tagend', rawMatch, matchIndex, {
            tagName: tagName,
          })
          continue
        }
      }

      if (tagCDATA) {
        arrCDATA.push(rawMatch)
      } else if (matchedKind === 'start') {
        if (parseAttrs(startTagNameEnd, spanAttrsEnd)) {
          saveBlock('tagstart', rawMatch, matchIndex, {
            tagName: tagName,
            attrs: arrAttrs,
            close: spanClose,
          })

          if (isMapCdataTagsRequired()) {
            tagCDATA = tagName
            attrsCDATA = arrAttrs.concat()
            arrCDATA = []
            lastCDATAIndex = lastIndex
          }
        } else {
          // If a miss match occurs, the current content is matched to text
          saveBlock('text', rawMatch, matchIndex)
        }
      } else if (isLongComment || commentContent) {
        saveBlock('comment', rawMatch, matchIndex, {
          content: commentContent,
          long: isLongComment,
        })
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

  public addListener(types: string, listener: Listener): void {
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

  public fire(type: string, data?: Partial<Block>): void {
    if (data === undefined) {
      data = {}
    }
    data.type = type

    let listeners: Listener[] = []
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
      // TODO: we may improve where data is actually a Block or a Partial<Block>
      // @ts-expect-error
      listeners[i].call(this, data)
    }
  }

  public removeListener(type: string, listener: Listener): void {
    const listenersType: Listener[] | undefined = this._listeners[type]
    if (listenersType !== undefined) {
      for (let i = 0, l = listenersType.length; i < l; i++) {
        if (listenersType[i] === listener) {
          listenersType.splice(i, 1)
          break
        }
      }
    }
  }

  public fixPos(
    event: Block,
    index: number
  ): {
    line: number
    col: number
  } {
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

  public getMapAttrs(arrAttrs: Attr[]): {
    [name: string]: string
  } {
    const mapAttrs: { [name: string]: string } = {}
    let attr: Attr

    for (let i = 0, l = arrAttrs.length; i < l; i++) {
      attr = arrAttrs[i]
      mapAttrs[attr.name] = attr.value
    }

    return mapAttrs
  }
}

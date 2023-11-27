import * as xml from 'xml'
import type { XmlObject } from 'xml'
import { FormatterCallback } from '../formatter'

const checkstyleFormatter: FormatterCallback = function checkstyleFormatter(
  formatter
) {
  formatter.on('end', (event) => {
    const arrFiles: XmlObject[] = []
    const arrAllMessages = event.arrAllMessages

    arrAllMessages.forEach((fileInfo) => {
      const arrMessages = fileInfo.messages
      const arrErrors: XmlObject[] = []

      arrMessages.forEach((message) => {
        arrErrors.push({
          error: {
            _attr: {
              line: message.line,
              column: message.col,
              severity: message.type,
              message: message.message,
              source: `htmlhint.${message.rule.id}`,
            },
          },
        })
      })

      arrFiles.push({
        file: [
          {
            _attr: {
              name: fileInfo.file,
            },
          },
          ...arrErrors,
        ],
      })
    })

    const objXml: XmlObject = {
      checkstyle: [
        {
          _attr: {
            version: '4.3',
          },
        },
        ...arrFiles,
      ],
    }

    console.log(
      xml(objXml, {
        declaration: true,
        indent: '    ',
      })
    )
  })
}

export = checkstyleFormatter

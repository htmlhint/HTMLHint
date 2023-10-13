import * as xml from 'xml'
import type { XmlObject } from 'xml'
import { FormatterCallback } from '../formatter'

const junitFormatter: FormatterCallback = function junitFormatter(
  formatter,
  HTMLHint
) {
  formatter.on('end', (event) => {
    const arrTestcase: XmlObject[] = []
    const arrAllMessages = event.arrAllMessages

    arrAllMessages.forEach((fileInfo) => {
      const arrMessages = fileInfo.messages
      const arrLogs = HTMLHint.format(arrMessages)

      arrTestcase.push({
        testcase: [
          {
            _attr: {
              name: fileInfo.file,
              time: (fileInfo.time / 1000).toFixed(3),
            },
          },
          {
            failure: {
              _attr: {
                message: `Found ${arrMessages.length} errors`,
              },
              _cdata: arrLogs.join('\r\n'),
            },
          },
        ],
      })
    })

    const objXml: XmlObject = {
      testsuites: [
        {
          testsuite: [
            {
              _attr: {
                name: 'HTMLHint Tests',
                time: (event.time / 1000).toFixed(3),
                tests: event.allFileCount,
                failures: arrAllMessages.length,
              },
            },
            ...arrTestcase,
          ],
        },
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

export default junitFormatter

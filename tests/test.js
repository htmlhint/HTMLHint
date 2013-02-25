//本文件临时开发测试用，近期开始写完整的单测
var HTMLHint = require('../lib/htmlhint').HTMLHint;
var text = '\r\n\r\na<!DOCTYPE html><html lanG="en" b=\'1\' c=2><heaD\r\na>a<\r\nb\r\nc<meta content="text/html; charset=utf-8" http-equiv="Content-Type" /><script></script></head><body class="classA b c d"><img src=""><br><ul id="abA"><li><span></ul></aaa><style>a{}</style>abc<script>var aaa;</script></body></html>';
// text = '';
var messages = HTMLHint.verify(text, {
    // 'img-alt-require': true,
    // 'head-script-disabled': true
    // 'doctype-first': true,
    // 'doctype-html5': true,
    // 'tagname-lower-case': true,
    // 'attr-lower-case': true,
    // 'attr-value-double-quotes': true,
    // 'attr-value-empty': true,
    // 'spec-char-escape': true,
    // 'style-disabled': true,
    'tag-pair': true,
    // 'tag-self-close': true,
    // 'id-class-value': {
    //         'regId': /^(J-)?[a-z\d]+(-[a-z\d]+)*$/,
    //         'message': 'Id and class value must lower case and split by dash, or start with J-.'
    //     }
});

console.log(messages)
<<<<<<< HEAD
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("csslint"),require("jshint")):"function"==typeof define&&define.amd?define(["csslint","jshint"],t):"object"==typeof exports?exports.HTMLHint=t(require("csslint"),require("jshint")):e.HTMLHint=t(e.CSSLint,e.JSHINT)}("undefined"!=typeof self?self:this,function(e,t){return function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}return a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=2)}([function(t,a){t.exports=e},function(e,a){e.exports=t},function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"altRequire",function(){return s}),a.d(n,"attrLowercase",function(){return l}),a.d(n,"attrSort",function(){return u}),a.d(n,"attrNoDuplication",function(){return c}),a.d(n,"attrUnsafeChars",function(){return d}),a.d(n,"attrValueDoubleQuotes",function(){return f}),a.d(n,"attrValueNotEmpty",function(){return h}),a.d(n,"attrValueSingleQuotes",function(){return g}),a.d(n,"attrWhitespace",function(){return p}),a.d(n,"csslint",function(){return v}),a.d(n,"doctypeFirst",function(){return b}),a.d(n,"doctypeHTML5",function(){return w}),a.d(n,"headScriptDisabled",function(){return y}),a.d(n,"hrefAbsOrRel",function(){return x}),a.d(n,"idClsasAdDisabled",function(){return L}),a.d(n,"idClassValue",function(){return T}),a.d(n,"idUnique",function(){return N}),a.d(n,"inlineScriptDisabled",function(){return C}),a.d(n,"inlineStyleDisabled",function(){return k}),a.d(n,"jshint",function(){return j}),a.d(n,"scriptDisabled",function(){return q}),a.d(n,"spaceTabMixedDisabled",function(){return S}),a.d(n,"specCharEscape",function(){return E}),a.d(n,"srcNotEmpty",function(){return M}),a.d(n,"styleDisabled",function(){return _}),a.d(n,"tagPair",function(){return I}),a.d(n,"tagSelfClose",function(){return O}),a.d(n,"tagnameLowercase",function(){return D}),a.d(n,"tagnameSpecialChars",function(){return P}),a.d(n,"titleRequire",function(){return R});var r=class{constructor(){this._listeners={},this._mapCdataTags=this.makeMap("script,style"),this._arrBlocks=[],this.lastEvent=null}makeMap(e){for(var t={},a=e.split(","),n=0;n<a.length;n++)t[a[n]]=!0;return t}parse(e){var t,a,n,r,i,s,o,l,u=this,c=u._mapCdataTags,d=/<(?:\/([^\s>]+)\s*|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:\s+[^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]*))?)*?)\s*(\/?))>/g,f=/\s*([^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s"'>]*)))?/g,h=/\r?\n/g,g=0,p=0,m=0,v=1,b=u._arrBlocks;function w(e,t,a,n){var r=a-m+1;for(void 0===n&&(n={}),n.raw=t,n.pos=a,n.line=v,n.col=r,b.push(n),u.fire(e,n);h.exec(t);)v++,m=a+h.lastIndex}for(u.fire("start",{pos:0,line:1,col:1});t=d.exec(e);)if((a=t.index)>g&&(l=e.substring(g,a),i?o.push(l):w("text",l,g)),g=d.lastIndex,!(n=t[1])||(i&&n===i&&(w("cdata",l=o.join(""),p,{tagName:i,attrs:s}),i=null,s=null,o=null),i))if(i)o.push(t[0]);else if(n=t[4]){r=[];for(var y,x=t[5],L=0;y=f.exec(x);){var T=y[1],N=y[2]?y[2]:y[4]?y[4]:"",C=y[3]?y[3]:y[5]?y[5]:y[6]?y[6]:"";r.push({name:T,value:C,quote:N,index:y.index,raw:y[0]}),L+=y[0].length}L===x.length?(w("tagstart",t[0],a,{tagName:n,attrs:r,close:t[6]}),c[n]&&(i=n,s=r.concat(),o=[],p=g)):w("text",t[0],a)}else(t[2]||t[3])&&w("comment",t[0],a,{content:t[2]||t[3],long:!!t[2]});else w("tagend",t[0],a,{tagName:n});e.length>g&&w("text",l=e.substring(g,e.length),g),u.fire("end",{pos:g,line:v,col:e.length-m+1})}addListener(e,t){for(var a,n=this._listeners,r=e.split(/[,\s]/),i=0,s=r.length;i<s;i++)void 0===n[a=r[i]]&&(n[a]=[]),n[a].push(t)}fire(e,t){void 0===t&&(t={}),t.type=e;var a=[],n=this._listeners[e],r=this._listeners.all;void 0!==n&&(a=a.concat(n)),void 0!==r&&(a=a.concat(r));var i=this.lastEvent;null!==i&&(delete i.lastEvent,t.lastEvent=i),this.lastEvent=t;for(var s=0,o=a.length;s<o;s++)a[s].call(this,t)}removeListener(e,t){var a=this._listeners[e];if(void 0!==a)for(var n=0,r=a.length;n<r;n++)if(a[n]===t){a.splice(n,1);break}}fixPos(e,t){var a,n=e.raw.substr(0,t).split(/\r?\n/),r=n.length-1,i=e.line;return r>0?(i+=r,a=n[r].length+1):a=e.col+t,{line:i,col:a}}getMapAttrs(e){for(var t,a={},n=0,r=e.length;n<r;n++)a[(t=e[n]).name]=t.value;return a}};var i=class{constructor(e,t){this.html=e,this.lines=e.split(/\r?\n/);var a=e.match(/\r?\n/);this.brLen=null!==a?a[0].length:0,this.ruleset=t,this.messages=[],this.error=this.report.bind(this,"error"),this.warn=this.report.bind(this,"warning"),this.info=this.report.bind(this,"info")}report(e,t,a,n,r,i){for(var s,o,l=this.lines,u=this.brLen,c=a-1,d=l.length;c<d&&(n>(o=(s=l[c]).length)&&a<d);c++)a++,1!==(n-=o)&&(n-=u);this.messages.push({type:e,message:t,raw:i,evidence:s,line:a,col:n,rule:{id:r.id,description:r.description,link:"https://github.com/thedaviddias/HTMLHint/wiki/"+r.id}})}},s={id:"alt-require",description:"The alt attribute of an <img> element must be present and alt attribute of area[href] and input[type=image] must have a value.",init:function(e,t){var a=this;e.addListener("tagstart",function(n){var r,i=n.tagName.toLowerCase(),s=e.getMapAttrs(n.attrs),o=n.col+i.length+1;"img"!==i||"alt"in s?("area"===i&&"href"in s||"input"===i&&"image"===s.type)&&("alt"in s&&""!==s.alt||(r="area"===i?"area[href]":"input[type=image]",t.warn("The alt attribute of "+r+" must have a value.",n.line,o,a,n.raw))):t.warn("An alt attribute must be present on <img> elements.",n.line,o,a,n.raw)})}};function o(e,t){if(t instanceof RegExp)return!!t.test(e)&&{match:e,pattern:t};const a=t[0],n=t[t.length-1],r=t[t.length-2],i="/"===a&&("/"===n||"/"===r&&"i"===n);if(i){return i&&"i"===n?new RegExp(t.slice(1,-2),"i").test(e):new RegExp(t.slice(1,-1)).test(e)}return e===t}var l={id:"attr-lowercase",description:"All attribute names must be in lowercase.",init:function(e,t,a){var n=this,r=Array.isArray(a)?a:[];e.addListener("tagstart",function(e){for(var a,i=e.attrs,s=e.col+e.tagName.length+1,l=0,u=i.length;l<u;l++){var c=(a=i[l]).name;r.find(e=>o(c,e))||c===c.toLowerCase()||t.error("The attribute name of [ "+c+" ] must be in lowercase.",e.line,s+a.index,n,a.raw)}})}},u={id:"attr-sorted",description:"Attribute tags must be in proper order.",init:function(e,t){for(var a=this,n={},r=["class","id","name","src","for","type","href","value","title","alt","role"],i=0;i<r.length;i++)n[r[i]]=i;e.addListener("tagstart",function(e){for(var r=e.attrs,i=[],s=0;s<r.length;s++)i.push(r[s].name);var o=JSON.stringify(i);i.sort(function(e,t){return null==n[e]&&null==n[t]?0:null==n[e]?1:null==n[t]?-1:n[e]-n[t]||e.localeCompare(t)}),o!==JSON.stringify(i)&&t.error("Inaccurate order "+o+" should be in hierarchy "+JSON.stringify(i)+" ",e.line,e.col,a)})}},c={id:"attr-no-duplication",description:"Elements cannot have duplicate attributes.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,r,i=e.attrs,s=e.col+e.tagName.length+1,o={},l=0,u=i.length;l<u;l++)!0===o[r=(n=i[l]).name]&&t.error("Duplicate of attribute name [ "+n.name+" ] was found.",e.line,s+n.index,a,n.raw),o[r]=!0})}},d={id:"attr-unsafe-chars",description:"Attribute values cannot contain unsafe chars.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,r,i=e.attrs,s=e.col+e.tagName.length+1,o=/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/,l=0,u=i.length;l<u;l++)if(null!==(r=(n=i[l]).value.match(o))){var c=escape(r[0]).replace(/%u/,"\\u").replace(/%/,"\\x");t.warn("The value of attribute [ "+n.name+" ] cannot contain an unsafe char [ "+c+" ].",e.line,s+n.index,a,n.raw)}})}},f={id:"attr-value-double-quotes",description:"Attribute values must be in double quotes.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,r=e.attrs,i=e.col+e.tagName.length+1,s=0,o=r.length;s<o;s++)(""!==(n=r[s]).value&&'"'!==n.quote||""===n.value&&"'"===n.quote)&&t.error("The value of attribute [ "+n.name+" ] must be in double quotes.",e.line,i+n.index,a,n.raw)})}},h={id:"attr-value-not-empty",description:"All attributes must have values.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,r=e.attrs,i=e.col+e.tagName.length+1,s=0,o=r.length;s<o;s++)""===(n=r[s]).quote&&""===n.value&&t.warn("The attribute [ "+n.name+" ] must have a value.",e.line,i+n.index,a,n.raw)})}},g={id:"attr-value-single-quotes",description:"Attribute values must be in single quotes.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,r=e.attrs,i=e.col+e.tagName.length+1,s=0,o=r.length;s<o;s++)(""!==(n=r[s]).value&&"'"!==n.quote||""===n.value&&'"'===n.quote)&&t.error("The value of attribute [ "+n.name+" ] must be in single quotes.",e.line,i+n.index,a,n.raw)})}},p={id:"attr-whitespace",description:"All attributes should be separated by only one space and not have leading/trailing whitespace.",init:function(e,t,a){var n=this,r=Array.isArray(a)?a:[];e.addListener("tagstart",function(e){var a,i=e.attrs,s=e.col+e.tagName.length+1;i.forEach(function(i){a=i;var o=i.name;-1===r.indexOf(o)&&(i.value.trim(i.value)!==i.value&&t.error("The attributes of [ "+o+" ] must not have trailing whitespace.",e.line,s+a.index,n,a.raw),i.value.replace(/ +(?= )/g,"")!==i.value&&t.error("The attributes of [ "+o+" ] must be separated by only one space.",e.line,s+a.index,n,a.raw))})})}},m=a(0),v={id:"csslint",description:"Scan css with csslint.",init:function(e,t,a){var n=this;e.addListener("cdata",function(e){if("style"===e.tagName.toLowerCase()){var r=m.CSSLint.verify;if(void 0!==a){var i=e.line-1,s=e.col-1;try{r(e.raw,a).messages.forEach(function(e){var a=e.line;t["warning"===e.type?"warn":"error"]("["+e.rule.id+"] "+e.message,i+a,(1===a?s:0)+e.col,n,e.evidence)})}catch(e){}}}})}},b={id:"doctype-first",description:"Doctype must be declared first.",init:function(e,t){var a=this,n=function(r){"start"===r.type||"text"===r.type&&/^\s*$/.test(r.raw)||(("comment"!==r.type&&!1===r.long||!1===/^DOCTYPE\s+/i.test(r.content))&&t.error("Doctype must be declared first.",r.line,r.col,a,r.raw),e.removeListener("all",n))};e.addListener("all",n)}},w={id:"doctype-html5",description:'Invalid doctype. Use: "<!DOCTYPE html>"',init:function(e,t){var a=this;function n(e){!1===e.long&&"doctype html"!==e.content.toLowerCase()&&t.warn('Invalid doctype. Use: "<!DOCTYPE html>"',e.line,e.col,a,e.raw)}e.addListener("all",n),e.addListener("tagstart",function t(){e.removeListener("comment",n),e.removeListener("tagstart",t)})}},y={id:"head-script-disabled",description:"The <script> tag cannot be used in a <head> tag.",init:function(e,t){var a=this,n=/^(text\/javascript|application\/javascript)$/i,r=!1;function i(i){var s=e.getMapAttrs(i.attrs).type,o=i.tagName.toLowerCase();"head"===o&&(r=!0),!0!==r||"script"!==o||s&&!0!==n.test(s)||t.warn("The <script> tag cannot be used in a <head> tag.",i.line,i.col,a,i.raw)}e.addListener("tagstart",i),e.addListener("tagend",function t(a){"head"===a.tagName.toLowerCase()&&(e.removeListener("tagstart",i),e.removeListener("tagend",t))})}},x={id:"href-abs-or-rel",description:"An href attribute must be either absolute or relative.",init:function(e,t,a){var n=this,r="abs"===a?"absolute":"relative";e.addListener("tagstart",function(e){for(var a,i=e.attrs,s=e.col+e.tagName.length+1,o=0,l=i.length;o<l;o++)if("href"===(a=i[o]).name){("absolute"===r&&!1===/^\w+?:/.test(a.value)||"relative"===r&&!0===/^https?:\/\//.test(a.value))&&t.warn("The value of the href attribute [ "+a.value+" ] must be "+r+".",e.line,s+a.index,n,a.raw);break}})}},L={id:"id-class-ad-disabled",description:"The id and class attributes cannot use the ad keyword, it will be blocked by adblock software.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,r,i=e.attrs,s=e.col+e.tagName.length+1,o=0,l=i.length;o<l;o++)r=(n=i[o]).name,/^(id|class)$/i.test(r)&&/(^|[-_])ad([-_]|$)/i.test(n.value)&&t.warn("The value of attribute "+r+" cannot use the ad keyword.",e.line,s+n.index,a,n.raw)})}},T={id:"id-class-value",description:"The id and class attribute values must meet the specified rules.",init:function(e,t,a){var n,r=this;if((n="string"==typeof a?{underline:{regId:/^[a-z\d]+(_[a-z\d]+)*$/,message:"The id and class attribute values must be in lowercase and split by an underscore."},dash:{regId:/^[a-z\d]+(-[a-z\d]+)*$/,message:"The id and class attribute values must be in lowercase and split by a dash."},hump:{regId:/^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/,message:"The id and class attribute values must meet the camelCase style."}}[a]:a)&&n.regId){var i=n.regId,s=n.message;i instanceof RegExp||(i=new RegExp(i)),e.addListener("tagstart",function(e){for(var a,n=e.attrs,o=e.col+e.tagName.length+1,l=0,u=n.length;l<u;l++)if("id"===(a=n[l]).name.toLowerCase()&&!1===i.test(a.value)&&t.warn(s,e.line,o+a.index,r,a.raw),"class"===a.name.toLowerCase())for(var c,d=a.value.split(/\s+/g),f=0,h=d.length;f<h;f++)(c=d[f])&&!1===i.test(c)&&t.warn(s,e.line,o+a.index,r,c)})}}},N={id:"id-unique",description:"The value of id attributes must be unique.",init:function(e,t){var a=this,n={};e.addListener("tagstart",function(e){for(var r,i,s=e.attrs,o=e.col+e.tagName.length+1,l=0,u=s.length;l<u;l++)if("id"===(r=s[l]).name.toLowerCase()){(i=r.value)&&(void 0===n[i]?n[i]=1:n[i]++,n[i]>1&&t.error("The id value [ "+i+" ] must be unique.",e.line,o+r.index,a,r.raw));break}})}},C={id:"inline-script-disabled",description:"Inline script cannot be used.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,r,i=e.attrs,s=e.col+e.tagName.length+1,o=/^on(unload|message|submit|select|scroll|resize|mouseover|mouseout|mousemove|mouseleave|mouseenter|mousedown|load|keyup|keypress|keydown|focus|dblclick|click|change|blur|error)$/i,l=0,u=i.length;l<u;l++)r=(n=i[l]).name.toLowerCase(),!0===o.test(r)?t.warn("Inline script [ "+n.raw+" ] cannot be used.",e.line,s+n.index,a,n.raw):"src"!==r&&"href"!==r||/^\s*javascript:/i.test(n.value)&&t.warn("Inline script [ "+n.raw+" ] cannot be used.",e.line,s+n.index,a,n.raw)})}},k={id:"inline-style-disabled",description:"Inline style cannot be used.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,r=e.attrs,i=e.col+e.tagName.length+1,s=0,o=r.length;s<o;s++)"style"===(n=r[s]).name.toLowerCase()&&t.warn("Inline style [ "+n.raw+" ] cannot be used.",e.line,i+n.index,a,n.raw)})}},A=a(1),j={id:"jshint",description:"Scan script with jshint.",init:function(e,t,a){var n=this;e.addListener("cdata",function(r){if("script"===r.tagName.toLowerCase()){var i=e.getMapAttrs(r.attrs),s=i.type;if(void 0!==i.src||s&&!1===/^(text\/javascript)$/i.test(s))return;var o=A.JSHINT;if(void 0!==a){var l=r.line-1,u=r.col-1,c=r.raw.replace(/\t/g," ");try{!1===o(c,a,a.globals)&&o.errors.forEach(function(e){var a=e.line;t.warn(e.reason,l+a,(1===a?u:0)+e.character,n,e.evidence)})}catch(e){}}}})}},q={id:"script-disabled",description:"The <script> tag cannot be used.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){"script"===e.tagName.toLowerCase()&&t.error("The <script> tag cannot be used.",e.line,e.col,a,e.raw)})}},S={id:"space-tab-mixed-disabled",description:"Do not mix tabs and spaces for indentation.",init:function(e,t,a){var n=this,r="nomix",i=null;if("string"==typeof a){var s=a.match(/^([a-z]+)(\d+)?/);r=s[1],i=s[2]&&parseInt(s[2],10)}e.addListener("text",function(a){for(var s,o=a.raw,l=/(^|\r?\n)([ \t]+)/g;s=l.exec(o);){var u=e.fixPos(a,s.index+s[1].length);if(1===u.col){var c=s[2];"space"===r?i?!1!==/^ +$/.test(c)&&c.length%i==0||t.warn("Please use space for indentation and keep "+i+" length.",u.line,1,n,a.raw):!1===/^ +$/.test(c)&&t.warn("Please use space for indentation.",u.line,1,n,a.raw):"tab"===r&&!1===/^\t+$/.test(c)?t.warn("Please use tab for indentation.",u.line,1,n,a.raw):!0===/ +\t|\t+ /.test(c)&&t.warn("Do not mix tabs and spaces for indentation.",u.line,1,n,a.raw)}}})}},E={id:"spec-char-escape",description:"Special characters must be escaped.",init:function(e,t){var a=this;e.addListener("text",function(n){for(var r,i=n.raw,s=/[<>]/g;r=s.exec(i);){var o=e.fixPos(n,r.index);t.error("Special characters must be escaped : [ "+r[0]+" ].",o.line,o.col,a,n.raw)}})}},M={id:"src-not-empty",description:"The src attribute of an img(script,link) must have a value.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){for(var n,r=e.tagName,i=e.attrs,s=e.col+r.length+1,o=0,l=i.length;o<l;o++)n=i[o],(!0===/^(img|script|embed|bgsound|iframe)$/.test(r)&&"src"===n.name||"link"===r&&"href"===n.name||"object"===r&&"data"===n.name)&&""===n.value&&t.error("The attribute [ "+n.name+" ] of the tag [ "+r+" ] must have a value.",e.line,s+n.index,a,n.raw)})}},_={id:"style-disabled",description:"<style> tags cannot be used.",init:function(e,t){var a=this;e.addListener("tagstart",function(e){"style"===e.tagName.toLowerCase()&&t.warn("The <style> tag cannot be used.",e.line,e.col,a,e.raw)})}},I={id:"tag-pair",description:"Tag must be paired.",init:function(e,t){var a=this,n=[],r=e.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");e.addListener("tagstart",function(e){var t=e.tagName.toLowerCase();void 0!==r[t]||e.close||n.push({tagName:t,line:e.line,raw:e.raw})}),e.addListener("tagend",function(e){for(var r=e.tagName.toLowerCase(),i=n.length-1;i>=0&&n[i].tagName!==r;i--);if(i>=0){for(var s=[],o=n.length-1;o>i;o--)s.push("</"+n[o].tagName+">");if(s.length>0){var l=n[n.length-1];t.error("Tag must be paired, missing: [ "+s.join("")+" ], start tag match failed [ "+l.raw+" ] on line "+l.line+".",e.line,e.col,a,e.raw)}n.length=i}else t.error("Tag must be paired, no start tag: [ "+e.raw+" ]",e.line,e.col,a,e.raw)}),e.addListener("end",function(e){for(var r=[],i=n.length-1;i>=0;i--)r.push("</"+n[i].tagName+">");if(r.length>0){var s=n[n.length-1];t.error("Tag must be paired, missing: [ "+r.join("")+" ], open tag match failed [ "+s.raw+" ] on line "+s.line+".",e.line,e.col,a,"")}})}},O={id:"tag-self-close",description:"Empty tags must be self closed.",init:function(e,t){var a=this,n=e.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");e.addListener("tagstart",function(e){var r=e.tagName.toLowerCase();void 0!==n[r]&&(e.close||t.warn("The empty tag : [ "+r+" ] must be self closed.",e.line,e.col,a,e.raw))})}},D={id:"tagname-lowercase",description:"All html element names must be in lowercase.",init:function(e,t,a){var n=this,r=Array.isArray(a)?a:[];e.addListener("tagstart,tagend",function(e){var a=e.tagName;-1===r.indexOf(a)&&a!==a.toLowerCase()&&t.error("The html element name of [ "+a+" ] must be in lowercase.",e.line,e.col,n,e.raw)})}},P={id:"tagname-specialchars",description:"All html element names must be in lowercase.",init:function(e,t){var a=this,n=/[^a-zA-Z0-9\-:_]/;e.addListener("tagstart,tagend",function(e){var r=e.tagName;n.test(r)&&t.error("The html element name of [ "+r+" ] contains special character.",e.line,e.col,a,e.raw)})}},R={id:"title-require",description:"<title> must be present in <head> tag.",init:function(e,t){var a=this,n=!1,r=!1;function i(e){var t=e.tagName.toLowerCase();"head"===t?n=!0:"title"===t&&n&&(r=!0)}e.addListener("tagstart",i),e.addListener("tagend",function n(s){var o=s.tagName.toLowerCase();if(r&&"title"===o){var l=s.lastEvent;("text"!==l.type||"text"===l.type&&!0===/^\s*$/.test(l.raw))&&t.error("<title></title> must not be empty.",s.line,s.col,a,s.raw)}else"head"===o&&(!1===r&&t.error("<title> must be present in <head> tag.",s.line,s.col,a,s.raw),e.removeListener("tagstart",i),e.removeListener("tagend",n))})}};a.d(t,"HTMLHint",function(){return $}),a.d(t,"HTMLRules",function(){return n}),a.d(t,"Reporter",function(){return i}),a.d(t,"HTMLParser",function(){return r});class ${constructor(){this.rules={},this.defaultRuleset={"tagname-lowercase":!0,"attr-lowercase":!0,"attr-value-double-quotes":!0,"doctype-first":!0,"tag-pair":!0,"spec-char-escape":!0,"id-unique":!0,"src-not-empty":!0,"attr-no-duplication":!0,"title-require":!0}}addRule(e){this.rules[e.id]=e}verify(e,t){void 0!==t&&0!==Object.keys(t).length||(t=this.defaultRuleset),e=e.replace(/^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->/i,function(e,a){return void 0===t&&(t={}),a.replace(/(?:^|,)\s*([^:,]+)\s*(?:\:\s*([^,\s]+))?/g,function(e,a,n){"false"===n?n=!1:"true"===n&&(n=!0),t[a]=void 0===n||n}),""});var a,n=new r,s=new i(e,t),o=this.rules;for(var l in t)void 0!==(a=o[l])&&!1!==t[l]&&a.init(n,s,t[l]);return n.parse(e),s.messages}format(e,t){var a=[],n={white:"",grey:"",red:"",reset:""};(t=t||{}).colors&&(n.white="[37m",n.grey="[90m",n.red="[31m",n.reset="[39m");var r=t.indent||0;return e.forEach(e=>{var t=e.evidence,i=e.line,s=e.col,o=t.length,l=s>41?s-40:1,u=t.length>s+60?s+60:o;s<41&&(u+=40-s+1),t=t.replace(/\t/g," ").substring(l-1,u),l>1&&(t="..."+t,l-=3),u<o&&(t+="..."),a.push(n.white+H(r)+"L"+i+" |"+n.grey+t+n.reset);var c=s-l,d=t.substring(0,c).match(/[^\u0000-\u00ff]/g);null!==d&&(c+=d.length),a.push(n.white+H(r)+H(String(i).length+3+c)+"^ "+n.red+e.message+" ("+e.rule.id+")"+n.reset)}),a}}function H(e,t){return new Array(e+1).join(t||" ")}const z=new $;Object.keys(n).forEach(e=>{z.addRule(n[e])});t.default=z}])});
||||||| constructed merge base
!(function(e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t(require('csslint'), require('jshint')))
    : 'function' == typeof define && define.amd
      ? define(['csslint', 'jshint'], t)
      : 'object' == typeof exports
        ? (exports.HTMLHint = t(require('csslint'), require('jshint')))
        : (e.HTMLHint = t(e.CSSLint, e.JSHINT));
})('undefined' != typeof self ? self : this, function(e, t) {
  return (function(e) {
    var t = {};
    function a(n) {
      if (t[n]) return t[n].exports;
      var r = (t[n] = { i: n, l: !1, exports: {} });
      return e[n].call(r.exports, r, r.exports, a), (r.l = !0), r.exports;
    }
    return (
      (a.m = e),
      (a.c = t),
      (a.d = function(e, t, n) {
        a.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
      }),
      (a.r = function(e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (a.t = function(e, t) {
        if ((1 & t && (e = a(e)), 8 & t)) return e;
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (
          (a.r(n),
          Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
          2 & t && 'string' != typeof e)
        )
          for (var r in e)
            a.d(
              n,
              r,
              function(t) {
                return e[t];
              }.bind(null, r)
            );
        return n;
      }),
      (a.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return a.d(t, 'a', t), t;
      }),
      (a.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (a.p = ''),
      a((a.s = 2))
    );
  })([
    function(t, a) {
      t.exports = e;
    },
    function(e, a) {
      e.exports = t;
    },
    function(e, t, a) {
      'use strict';
      a.r(t);
      var n = {};
      a.r(n),
        a.d(n, 'altRequire', function() {
          return s;
        }),
        a.d(n, 'attrLowercase', function() {
          return o;
        }),
        a.d(n, 'attrSort', function() {
          return l;
        }),
        a.d(n, 'attrNoDuplication', function() {
          return u;
        }),
        a.d(n, 'attrUnsafeChars', function() {
          return c;
        }),
        a.d(n, 'attrValueDoubleQuotes', function() {
          return d;
        }),
          return f;
        }),
        a.d(n, 'attrWhitespace', function() {
          return h;
        }),
        a.d(n, 'csslint', function() {
        }),
        a.d(n, 'doctypeFirst', function() {
          return m;
        }),
        a.d(n, 'doctypeHTML5', function() {
          return v;
        }),
        a.d(n, 'headScriptDisabled', function() {
          return b;
        }),
        a.d(n, 'hrefAbsOrRel', function() {
          return w;
        }),
        a.d(n, 'idClsasAdDisabled', function() {
          return y;
        }),
        a.d(n, 'idClassValue', function() {
          return L;
        }),
        a.d(n, 'idUnique', function() {
          return x;
        }),
        a.d(n, 'inlineScriptDisabled', function() {
          return T;
        }),
        a.d(n, 'inlineStyleDisabled', function() {
          return N;
        }),
        a.d(n, 'jshint', function() {
          return k;
        }),
        a.d(n, 'scriptDisabled', function() {
          return j;
        }),
        a.d(n, 'spaceTabMixedDisabled', function() {
        }),
        a.d(n, 'specCharEscape', function() {
          return S;
        }),
        a.d(n, 'srcNotEmpty', function() {
          return S;
        }),
        a.d(n, 'styleDisabled', function() {
          return M;
        }),
        a.d(n, 'tagPair', function() {
          return E;
        }),
        a.d(n, 'tagSelfClose', function() {
        });
      var r = class {
        constructor() {
          (this._listeners = {}),
            (this._mapCdataTags = this.makeMap('script,style')),
            (this._arrBlocks = []),
            (this.lastEvent = null);
        }
        makeMap(e) {
          for (var t = {}, a = e.split(','), n = 0; n < a.length; n++)
            t[a[n]] = !0;
          return t;
        }
        parse(e) {
          var t,
            a,
            n,
            r,
            i,
            s,
            o,
            l,
            u = this,
            c = u._mapCdataTags,
            d = /<(?:\/([^\s>]+)\s*|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:\s+[^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]*))?)*?)\s*(\/?))>/g,
            f = /\s*([^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s"'>]*)))?/g,
            h = /\r?\n/g,
            g = 0,
            m = 0,
            p = 0,
            v = 1,
            b = u._arrBlocks;
          function w(e, t, a, n) {
            var r = a - p + 1;
            for (
              void 0 === n && (n = {}),
                n.raw = t,
                n.pos = a,
                n.line = v,
                n.col = r,
                b.push(n),
                u.fire(e, n);
              h.exec(t);

            )
              v++, (p = a + h.lastIndex);
          }
          for (u.fire('start', { pos: 0, line: 1, col: 1 }); (t = d.exec(e)); )
            if (
              ((a = t.index) > g &&
                ((l = e.substring(g, a)), i ? o.push(l) : w('text', l, g)),
              (g = d.lastIndex),
              !(n = t[1]) ||
                (i &&
                  n === i &&
                  (w('cdata', (l = o.join('')), m, { tagName: i, attrs: s }),
                  (i = null),
                  (s = null),
                  (o = null)),
                i))
            )
              if (i) o.push(t[0]);
              else if ((n = t[4])) {
                r = [];
                for (var y, L = t[5], x = 0; (y = f.exec(L)); ) {
                  var T = y[1],
                    N = y[2] ? y[2] : y[4] ? y[4] : '',
                    C = y[3] ? y[3] : y[5] ? y[5] : y[6] ? y[6] : '';
                  r.push({
                    name: T,
                    value: C,
                    quote: N,
                    index: y.index,
                    raw: y[0]
                  }),
                    (x += y[0].length);
                }
                x === L.length
                  ? (w('tagstart', t[0], a, {
                      tagName: n,
                      attrs: r,
                      close: t[6]
                    }),
                    c[n] && ((i = n), (s = r.concat()), (o = []), (m = g)))
                  : w('text', t[0], a);
              } else
                (t[2] || t[3]) &&
                  w('comment', t[0], a, {
                    content: t[2] || t[3],
                    long: !!t[2]
                  });
            else w('tagend', t[0], a, { tagName: n });
          e.length > g && w('text', (l = e.substring(g, e.length)), g),
            u.fire('end', { pos: g, line: v, col: e.length - p + 1 });
        }
        addListener(e, t) {
          for (
            var a,
              n = this._listeners,
              r = e.split(/[,\s]/),
              i = 0,
              s = r.length;
            i < s;
            i++
          )
            void 0 === n[(a = r[i])] && (n[a] = []), n[a].push(t);
        }
        fire(e, t) {
          void 0 === t && (t = {}), (t.type = e);
          var a = [],
            n = this._listeners[e],
            r = this._listeners.all;
          void 0 !== n && (a = a.concat(n)), void 0 !== r && (a = a.concat(r));
          var i = this.lastEvent;
          null !== i && (delete i.lastEvent, (t.lastEvent = i)),
            (this.lastEvent = t);
          for (var s = 0, o = a.length; s < o; s++) a[s].call(this, t);
        }
        removeListener(e, t) {
          var a = this._listeners[e];
          if (void 0 !== a)
            for (var n = 0, r = a.length; n < r; n++)
              if (a[n] === t) {
                a.splice(n, 1);
                break;
              }
        }
        fixPos(e, t) {
          var a,
            n = e.raw.substr(0, t).split(/\r?\n/),
            r = n.length - 1,
            i = e.line;
          return (
            r > 0 ? ((i += r), (a = n[r].length + 1)) : (a = e.col + t),
            { line: i, col: a }
          );
        }
        getMapAttrs(e) {
          for (var t, a = {}, n = 0, r = e.length; n < r; n++)
            a[(t = e[n]).name] = t.value;
          return a;
        }
      };
      var i = class {
          constructor(e, t) {
            (this.html = e), (this.lines = e.split(/\r?\n/));
            var a = e.match(/\r?\n/);
            (this.brLen = null !== a ? a[0].length : 0),
              (this.ruleset = t),
              (this.messages = []),
              (this.error = this.report.bind(this, 'error')),
              (this.warn = this.report.bind(this, 'warning')),
              (this.info = this.report.bind(this, 'info'));
          }
          report(e, t, a, n, r, i) {
            for (
              var s, o, l = this.lines, u = this.brLen, c = a - 1, d = l.length;
              c < d && n > (o = (s = l[c]).length) && a < d;
              c++
            )
              a++, 1 != (n -= o) && (n -= u);
            this.messages.push({
              type: e,
              message: t,
              raw: i,
              evidence: s,
              line: a,
              col: n,
              rule: {
                id: r.id,
                description: r.description,
                link: 'https://github.com/thedaviddias/HTMLHint/wiki/' + r.id
              }
            });
          }
        },
        s = {
          id: 'alt-require',
          description:
            'The alt attribute of an <img> element must be present and alt attribute of area[href] and input[type=image] must have a value.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(n) {
              var r,
                i = n.tagName.toLowerCase(),
                s = e.getMapAttrs(n.attrs),
                o = n.col + i.length + 1;
              'img' !== i || 'alt' in s
                ? (('area' === i && 'href' in s) ||
                    ('input' === i && 'image' === s.type)) &&
                  (('alt' in s && '' !== s.alt) ||
                    ((r = 'area' === i ? 'area[href]' : 'input[type=image]'),
                    t.warn(
                      'The alt attribute of ' + r + ' must have a value.',
                      n.line,
                      o,
                      a,
                      n.raw
                    )))
                : t.warn(
                    'An alt attribute must be present on <img> elements.',
                    n.line,
                    o,
                    a,
                    n.raw
                  );
            });
          }
        },
        o = {
          id: 'attr-lowercase',
          description: 'All attribute names must be in lowercase.',
          init: function(e, t, a) {
            var n = this,
              r = Array.isArray(a) ? a : [];
            e.addListener('tagstart', function(e) {
              for (
                var a,
                  i = e.attrs,
                  s = e.col + e.tagName.length + 1,
                  o = 0,
                  l = i.length;
                o < l;
                o++
              ) {
                var u = (a = i[o]).name;
                -1 === r.indexOf(u) &&
                  u !== u.toLowerCase() &&
                  t.error(
                    'The attribute name of [ ' + u + ' ] must be in lowercase.',
                    e.line,
                    s + a.index,
                    n,
                    a.raw
                  );
              }
            });
          }
        },
        l = {
          id: 'attr-sorted',
          description: 'Attribute tags must be in proper order.',
          init: function(e, t) {
            for (
              var a = this,
                n = {},
                r = [
                  'class',
                  'id',
                  'name',
                  'src',
                  'for',
                  'type',
                  'href',
                  'value',
                  'title',
                  'alt',
                  'role'
                ],
                i = 0;
              i < r.length;
              i++
            )
              n[r[i]] = i;
            e.addListener('tagstart', function(e) {
              for (var r = e.attrs, i = [], s = 0; s < r.length; s++)
                i.push(r[s].name);
              var o = JSON.stringify(i);
              i.sort(function(e, t) {
                return null == n[e] && null == n[t]
                  ? 0
                  : null == n[e]
                    ? 1
                    : null == n[t]
                      ? -1
                      : n[e] - n[t] || e.localeCompare(t);
              }),
                o !== JSON.stringify(i) &&
                  t.error(
                    'Inaccurate order ' +
                      o +
                      ' should be in hierarchy ' +
                      JSON.stringify(i) +
                      ' ',
                    e.line,
                    e.col,
                    a
                  );
            });
          }
        },
        u = {
          id: 'attr-no-duplication',
          description: 'Elements cannot have duplicate attributes.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(e) {
              for (
                var n,
                  r,
                  i = e.attrs,
                  s = e.col + e.tagName.length + 1,
                  o = {},
                  l = 0,
                  u = i.length;
                l < u;
                l++
              )
                !0 === o[(r = (n = i[l]).name)] &&
                  t.error(
                    'Duplicate of attribute name [ ' + n.name + ' ] was found.',
                    e.line,
                    s + n.index,
                    a,
                    n.raw
                  ),
                  (o[r] = !0);
            });
          }
        },
        c = {
          id: 'attr-unsafe-chars',
          description: 'Attribute values cannot contain unsafe chars.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(e) {
              for (
                var n,
                  r,
                  i = e.attrs,
                  s = e.col + e.tagName.length + 1,
                  o = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/,
                  l = 0,
                  u = i.length;
                l < u;
                l++
              )
                if (null !== (r = (n = i[l]).value.match(o))) {
                  var c = escape(r[0])
                    .replace(/%u/, '\\u')
                    .replace(/%/, '\\x');
                  t.warn(
                    'The value of attribute [ ' +
                      n.name +
                      ' ] cannot contain an unsafe char [ ' +
                      c +
                      ' ].',
                    e.line,
                    s + n.index,
                    a,
                    n.raw
                  );
                }
            });
          }
        },
        d = {
          id: 'attr-value-double-quotes',
          description: 'Attribute values must be in double quotes.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(e) {
              for (
                var n,
                  r = e.attrs,
                  i = e.col + e.tagName.length + 1,
                  s = 0,
                  o = r.length;
                s < o;
                s++
              )
                (('' !== (n = r[s]).value && '"' !== n.quote) ||
                  ('' === n.value && "'" === n.quote)) &&
                  t.error(
                    'The value of attribute [ ' +
                      n.name +
                      ' ] must be in double quotes.',
                    e.line,
                    i + n.index,
                    a,
                    n.raw
                  );
            });
          }
        },
        f = {
          id: 'attr-value-not-empty',
          description: 'All attributes must have values.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(e) {
              for (
                var n,
                  r = e.attrs,
                  i = e.col + e.tagName.length + 1,
                  s = 0,
                  o = r.length;
                s < o;
                s++
              )
                '' === (n = r[s]).quote &&
                  '' === n.value &&
                  t.warn(
                    'The attribute [ ' + n.name + ' ] must have a value.',
                    e.line,
                    i + n.index,
                    a,
                    n.raw
                  );
            });
          }
        },
        h = {
          id: 'attr-whitespace',
          description:
            'All attributes should be separated by only one space and not have leading/trailing whitespace.',
          init: function(e, t, a) {
            var n = this,
              r = Array.isArray(a) ? a : [];
            e.addListener('tagstart', function(e) {
              var a,
                i = e.attrs,
                s = e.col + e.tagName.length + 1;
              i.forEach(function(i) {
                a = i;
                var o = i.name;
                -1 === r.indexOf(o) &&
                  (i.value.trim(i.value) !== i.value &&
                    t.error(
                      'The attributes of [ ' +
                        o +
                        ' ] must not have trailing whitespace.',
                      e.line,
                      s + a.index,
                      n,
                      a.raw
                    ),
                  i.value.replace(/ +(?= )/g, '') !== i.value &&
                    t.error(
                      'The attributes of [ ' +
                        o +
                        ' ] must be separated by only one space.',
                      e.line,
                      s + a.index,
                      n,
                      a.raw
                    ));
              });
            });
          }
        },
        g = a(0),
          id: 'csslint',
          description: 'Scan css with csslint.',
          init: function(e, t, a) {
            var n = this;
            e.addListener('cdata', function(e) {
              if ('style' === e.tagName.toLowerCase()) {
                var r = g.CSSLint.verify;
                if (void 0 !== a) {
                  var i = e.line - 1,
                    s = e.col - 1;
                  try {
                    r(e.raw, a).messages.forEach(function(e) {
                      var a = e.line;
                      t['warning' === e.type ? 'warn' : 'error'](
                        '[' + e.rule.id + '] ' + e.message,
                        i + a,
                        (1 === a ? s : 0) + e.col,
                        n,
                        e.evidence
                      );
                    });
                  } catch (e) {}
                }
              }
            });
          }
        },
        m = {
          id: 'doctype-first',
          description: 'Doctype must be declared first.',
          init: function(e, t) {
            var a = this,
              n = function(r) {
                'start' === r.type ||
                  ('text' === r.type && /^\s*$/.test(r.raw)) ||
                  ((('comment' !== r.type && !1 === r.long) ||
                    !1 === /^DOCTYPE\s+/i.test(r.content)) &&
                    t.error(
                      'Doctype must be declared first.',
                      r.line,
                      r.col,
                      a,
                      r.raw
                    ),
                  e.removeListener('all', n));
              };
            e.addListener('all', n);
          }
        },
        v = {
          id: 'doctype-html5',
          description: 'Invalid doctype. Use: "<!DOCTYPE html>"',
          init: function(e, t) {
            var a = this;
            function n(e) {
              !1 === e.long &&
                'doctype html' !== e.content.toLowerCase() &&
                t.warn(
                  'Invalid doctype. Use: "<!DOCTYPE html>"',
                  e.line,
                  e.col,
                  a,
                  e.raw
                );
            }
            e.addListener('all', n),
              e.addListener('tagstart', function t() {
                e.removeListener('comment', n), e.removeListener('tagstart', t);
              });
          }
        },
        b = {
          id: 'head-script-disabled',
          description: 'The <script> tag cannot be used in a <head> tag.',
          init: function(e, t) {
            var a = this,
              n = /^(text\/javascript|application\/javascript)$/i,
              r = !1;
            function i(i) {
              var s = e.getMapAttrs(i.attrs).type,
                o = i.tagName.toLowerCase();
              'head' === o && (r = !0),
                !0 !== r ||
                  'script' !== o ||
                  (s && !0 !== n.test(s)) ||
                  t.warn(
                    'The <script> tag cannot be used in a <head> tag.',
                    i.line,
                    i.col,
                    a,
                    i.raw
                  );
            }
            e.addListener('tagstart', i),
              e.addListener('tagend', function t(a) {
                'head' === a.tagName.toLowerCase() &&
                  (e.removeListener('tagstart', i),
                  e.removeListener('tagend', t));
              });
          }
        },
        w = {
          id: 'href-abs-or-rel',
          description: 'An href attribute must be either absolute or relative.',
          init: function(e, t, a) {
            var n = this,
              r = 'abs' === a ? 'absolute' : 'relative';
            e.addListener('tagstart', function(e) {
              for (
                var a,
                  i = e.attrs,
                  s = e.col + e.tagName.length + 1,
                  o = 0,
                  l = i.length;
                o < l;
                o++
              )
                if ('href' === (a = i[o]).name) {
                  (('absolute' === r && !1 === /^\w+?:/.test(a.value)) ||
                    ('relative' === r &&
                      !0 === /^https?:\/\//.test(a.value))) &&
                    t.warn(
                      'The value of the href attribute [ ' +
                        a.value +
                        ' ] must be ' +
                        r +
                        '.',
                      e.line,
                      s + a.index,
                      n,
                      a.raw
                    );
                  break;
                }
            });
          }
        },
        y = {
          id: 'id-class-ad-disabled',
          description:
            'The id and class attributes cannot use the ad keyword, it will be blocked by adblock software.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(e) {
              for (
                var n,
                  r,
                  i = e.attrs,
                  s = e.col + e.tagName.length + 1,
                  o = 0,
                  l = i.length;
                o < l;
                o++
              )
                (r = (n = i[o]).name),
                  /^(id|class)$/i.test(r) &&
                    /(^|[-_])ad([-_]|$)/i.test(n.value) &&
                    t.warn(
                      'The value of attribute ' +
                        r +
                        ' cannot use the ad keyword.',
                      e.line,
                      s + n.index,
                      a,
                      n.raw
                    );
            });
          }
        },
        L = {
          id: 'id-class-value',
          description:
            'The id and class attribute values must meet the specified rules.',
          init: function(e, t, a) {
            var n,
              r = this;
            if (
              (n =
                'string' == typeof a
                  ? {
                      underline: {
                        regId: /^[a-z\d]+(_[a-z\d]+)*$/,
                        message:
                          'The id and class attribute values must be in lowercase and split by an underscore.'
                      },
                      dash: {
                        regId: /^[a-z\d]+(-[a-z\d]+)*$/,
                        message:
                          'The id and class attribute values must be in lowercase and split by a dash.'
                      },
                      hump: {
                        regId: /^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/,
                        message:
                          'The id and class attribute values must meet the camelCase style.'
                      }
                    }[a]
                  : a) &&
              n.regId
            ) {
              var i = n.regId,
                s = n.message;
              e.addListener('tagstart', function(e) {
                for (
                  var a,
                    n = e.attrs,
                    o = e.col + e.tagName.length + 1,
                    l = 0,
                    u = n.length;
                  l < u;
                  l++
                )
                  if (
                    ('id' === (a = n[l]).name.toLowerCase() &&
                      !1 === i.test(a.value) &&
                      t.warn(s, e.line, o + a.index, r, a.raw),
                    'class' === a.name.toLowerCase())
                  )
                    for (
                      var c, d = a.value.split(/\s+/g), f = 0, h = d.length;
                      f < h;
                      f++
                    )
                      (c = d[f]) &&
                        !1 === i.test(c) &&
                        t.warn(s, e.line, o + a.index, r, c);
              });
            }
          }
        },
        x = {
          id: 'id-unique',
          description: 'The value of id attributes must be unique.',
          init: function(e, t) {
            var a = this,
              n = {};
            e.addListener('tagstart', function(e) {
              for (
                var r,
                  i,
                  s = e.attrs,
                  o = e.col + e.tagName.length + 1,
                  l = 0,
                  u = s.length;
                l < u;
                l++
              )
                if ('id' === (r = s[l]).name.toLowerCase()) {
                  (i = r.value) &&
                    (void 0 === n[i] ? (n[i] = 1) : n[i]++,
                    n[i] > 1 &&
                      t.error(
                        'The id value [ ' + i + ' ] must be unique.',
                        e.line,
                        o + r.index,
                        a,
                        r.raw
                      ));
                  break;
                }
            });
          }
        },
        T = {
          id: 'inline-script-disabled',
          description: 'Inline script cannot be used.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(e) {
              for (
                var n,
                  r,
                  i = e.attrs,
                  s = e.col + e.tagName.length + 1,
                  o = /^on(unload|message|submit|select|scroll|resize|mouseover|mouseout|mousemove|mouseleave|mouseenter|mousedown|load|keyup|keypress|keydown|focus|dblclick|click|change|blur|error)$/i,
                  l = 0,
                  u = i.length;
                l < u;
                l++
              )
                (r = (n = i[l]).name.toLowerCase()),
                  !0 === o.test(r)
                    ? t.warn(
                        'Inline script [ ' + n.raw + ' ] cannot be used.',
                        e.line,
                        s + n.index,
                        a,
                        n.raw
                      )
                    : ('src' !== r && 'href' !== r) ||
                      (/^\s*javascript:/i.test(n.value) &&
                        t.warn(
                          'Inline script [ ' + n.raw + ' ] cannot be used.',
                          e.line,
                          s + n.index,
                          a,
                          n.raw
                        ));
            });
          }
        },
        N = {
          id: 'inline-style-disabled',
          description: 'Inline style cannot be used.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(e) {
              for (
                var n,
                  r = e.attrs,
                  i = e.col + e.tagName.length + 1,
                  s = 0,
                  o = r.length;
                s < o;
                s++
              )
                'style' === (n = r[s]).name.toLowerCase() &&
                  t.warn(
                    'Inline style [ ' + n.raw + ' ] cannot be used.',
                    e.line,
                    i + n.index,
                    a,
                    n.raw
                  );
            });
          }
        },
        C = a(1),
        k = {
          id: 'jshint',
          description: 'Scan script with jshint.',
          init: function(e, t, a) {
            var n = this;
            e.addListener('cdata', function(r) {
              if ('script' === r.tagName.toLowerCase()) {
                var i = e.getMapAttrs(r.attrs),
                  s = i.type;
                if (
                  void 0 !== i.src ||
                  (s && !1 === /^(text\/javascript)$/i.test(s))
                )
                  return;
                var o = C.JSHINT;
                if (void 0 !== a) {
                  var l = r.line - 1,
                    u = r.col - 1,
                    c = r.raw.replace(/\t/g, ' ');
                  try {
                    !1 === o(c, a, a.globals) &&
                      o.errors.forEach(function(e) {
                        var a = e.line;
                        t.warn(
                          e.reason,
                          l + a,
                          (1 === a ? u : 0) + e.character,
                          n,
                          e.evidence
                        );
                      });
                  } catch (e) {}
                }
              }
            });
          }
        },
        j = {
          id: 'script-disabled',
          description: 'The <script> tag cannot be used.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(e) {
              'script' === e.tagName.toLowerCase() &&
                t.error(
                  'The <script> tag cannot be used.',
                  e.line,
                  e.col,
                  a,
                  e.raw
                );
            });
          }
        },
          id: 'space-tab-mixed-disabled',
          description: 'Do not mix tabs and spaces for indentation.',
          init: function(e, t, a) {
            var n = this,
              r = 'nomix',
              i = null;
            if ('string' == typeof a) {
              var s = a.match(/^([a-z]+)(\d+)?/);
              (r = s[1]), (i = s[2] && parseInt(s[2], 10));
            }
            e.addListener('text', function(a) {
              for (
                var s, o = a.raw, l = /(^|\r?\n)([ \t]+)/g;
                (s = l.exec(o));

              ) {
                var u = e.fixPos(a, s.index + s[1].length);
                if (1 === u.col) {
                  var c = s[2];
                  'space' === r
                    ? i
                      ? (!1 !== /^ +$/.test(c) && c.length % i == 0) ||
                        t.warn(
                          'Please use space for indentation and keep ' +
                            i +
                            ' length.',
                          u.line,
                          1,
                          n,
                          a.raw
                        )
                      : !1 === /^ +$/.test(c) &&
                        t.warn(
                          'Please use space for indentation.',
                          u.line,
                          1,
                          n,
                          a.raw
                        )
                    : 'tab' === r && !1 === /^\t+$/.test(c)
                      ? t.warn(
                          'Please use tab for indentation.',
                          u.line,
                          1,
                          n,
                          a.raw
                        )
                      : !0 === / +\t|\t+ /.test(c) &&
                        t.warn(
                          'Do not mix tabs and spaces for indentation.',
                          u.line,
                          1,
                          n,
                          a.raw
                        );
                }
              }
            });
          }
        },
        S = {
          id: 'spec-char-escape',
          description: 'Special characters must be escaped.',
          init: function(e, t) {
            var a = this;
            e.addListener('text', function(n) {
              for (var r, i = n.raw, s = /[<>]/g; (r = s.exec(i)); ) {
                var o = e.fixPos(n, r.index);
                t.error(
                  'Special characters must be escaped : [ ' + r[0] + ' ].',
                  o.line,
                  o.col,
                  a,
                  n.raw
                );
              }
            });
          }
        },
        S = {
          id: 'src-not-empty',
          description:
            'The src attribute of an img(script,link) must have a value.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(e) {
              for (
                var n,
                  r = e.tagName,
                  i = e.attrs,
                  s = e.col + r.length + 1,
                  o = 0,
                  l = i.length;
                o < l;
                o++
              )
                (n = i[o]),
                  ((!0 === /^(img|script|embed|bgsound|iframe)$/.test(r) &&
                    'src' === n.name) ||
                    ('link' === r && 'href' === n.name) ||
                    ('object' === r && 'data' === n.name)) &&
                    '' === n.value &&
                    t.error(
                      'The attribute [ ' +
                        n.name +
                        ' ] of the tag [ ' +
                        r +
                        ' ] must have a value.',
                      e.line,
                      s + n.index,
                      a,
                      n.raw
                    );
            });
          }
        },
        M = {
          id: 'style-disabled',
          description: '<style> tags cannot be used.',
          init: function(e, t) {
            var a = this;
            e.addListener('tagstart', function(e) {
              'style' === e.tagName.toLowerCase() &&
                t.warn(
                  'The <style> tag cannot be used.',
                  e.line,
                  e.col,
                  a,
                  e.raw
                );
            });
          }
        },
        E = {
          id: 'tag-pair',
          description: 'Tag must be paired.',
          init: function(e, t) {
            var a = this,
              n = [],
              r = e.makeMap(
                'area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr'
              );
            e.addListener('tagstart', function(e) {
              var t = e.tagName.toLowerCase();
              void 0 !== r[t] ||
                e.close ||
                n.push({ tagName: t, line: e.line, raw: e.raw });
            }),
              e.addListener('tagend', function(e) {
                for (
                  var r = e.tagName.toLowerCase(), i = n.length - 1;
                  i >= 0 && n[i].tagName !== r;
                  i--
                );
                if (i >= 0) {
                  for (var s = [], o = n.length - 1; o > i; o--)
                    s.push('</' + n[o].tagName + '>');
                  if (s.length > 0) {
                    var l = n[n.length - 1];
                    t.error(
                      'Tag must be paired, missing: [ ' +
                        s.join('') +
                        ' ], start tag match failed [ ' +
                        l.raw +
                        ' ] on line ' +
                        l.line +
                        '.',
                      e.line,
                      e.col,
                      a,
                      e.raw
                    );
                  }
                  n.length = i;
                } else t.error('Tag must be paired, no start tag: [ ' + e.raw + ' ]', e.line, e.col, a, e.raw);
              }),
              e.addListener('end', function(e) {
                for (var r = [], i = n.length - 1; i >= 0; i--)
                  r.push('</' + n[i].tagName + '>');
                if (r.length > 0) {
                  var s = n[n.length - 1];
                  t.error(
                    'Tag must be paired, missing: [ ' +
                      r.join('') +
                      ' ], open tag match failed [ ' +
                      s.raw +
                      ' ] on line ' +
                      s.line +
                      '.',
                    e.line,
                    e.col,
                    a,
                    ''
                  );
                }
              });
          }
        },
          id: 'tag-self-close',
          description: 'Empty tags must be self closed.',
          init: function(e, t) {
            var a = this,
              n = e.makeMap(
                'area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr'
              );
            e.addListener('tagstart', function(e) {
              var r = e.tagName.toLowerCase();
              void 0 !== n[r] &&
                (e.close ||
                  t.warn(
                    'The empty tag : [ ' + r + ' ] must be self closed.',
                    e.line,
                    e.col,
                    a,
                    e.raw
                  ));
            });
          }
        },
          id: 'tagname-lowercase',
          description: 'All html element names must be in lowercase.',
          init: function(e, t, a) {
            var n = this,
              r = Array.isArray(a) ? a : [];
            e.addListener('tagstart,tagend', function(e) {
              var a = e.tagName;
              -1 === r.indexOf(a) &&
                a !== a.toLowerCase() &&
                t.error(
                  'The html element name of [ ' +
                    a +
                    ' ] must be in lowercase.',
                  e.line,
                  e.col,
                  n,
                  e.raw
                );
            });
          }
        },
          id: 'title-require',
          description: '<title> must be present in <head> tag.',
          init: function(e, t) {
            var a = this,
              n = !1,
              r = !1;
            function i(e) {
              var t = e.tagName.toLowerCase();
              'head' === t ? (n = !0) : 'title' === t && n && (r = !0);
            }
            e.addListener('tagstart', i),
              e.addListener('tagend', function n(s) {
                var o = s.tagName.toLowerCase();
                if (r && 'title' === o) {
                  var l = s.lastEvent;
                  ('text' !== l.type ||
                    ('text' === l.type && !0 === /^\s*$/.test(l.raw))) &&
                    t.error(
                      '<title></title> must not be empty.',
                      s.line,
                      s.col,
                      a,
                      s.raw
                    );
                } else 'head' === o && (!1 === r && t.error('<title> must be present in <head> tag.', s.line, s.col, a, s.raw), e.removeListener('tagstart', i), e.removeListener('tagend', n));
              });
          }
        };
      a.d(t, 'HTMLHint', function() {
      }),
        a.d(t, 'HTMLRules', function() {
          return n;
        }),
        a.d(t, 'Reporter', function() {
          return i;
        }),
        a.d(t, 'HTMLParser', function() {
          return r;
        });
        constructor() {
          (this.rules = {}),
            (this.defaultRuleset = {
              'tagname-lowercase': !0,
              'attr-lowercase': !0,
              'attr-value-double-quotes': !0,
              'doctype-first': !0,
              'tag-pair': !0,
              'spec-char-escape': !0,
              'id-unique': !0,
              'src-not-empty': !0,
              'attr-no-duplication': !0,
              'title-require': !0
            });
        }
        addRule(e) {
          this.rules[e.id] = e;
        }
        verify(e, t) {
          (void 0 !== t && 0 !== Object.keys(t).length) ||
            (t = this.defaultRuleset),
            (e = e.replace(/^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->/i, function(
              e,
              a
            ) {
              return (
                void 0 === t && (t = {}),
                a.replace(/(?:^|,)\s*([^:,]+)\s*(?:\:\s*([^,\s]+))?/g, function(
                  e,
                  a,
                  n
                ) {
                  'false' === n ? (n = !1) : 'true' === n && (n = !0),
                    (t[a] = void 0 === n || n);
                }),
                ''
              );
            }));
          var a,
            n = new r(),
            s = new i(e, t),
            o = this.rules;
          for (var l in t)
            void 0 !== (a = o[l]) && !1 !== t[l] && a.init(n, s, t[l]);
          return n.parse(e), s.messages;
        }
        format(e, t) {
          var a = [],
            n = { white: '', grey: '', red: '', reset: '' };
          (t = t || {}).colors &&
            ((n.white = '[37m'), (n.grey = '[90m'), (n.red = '[31m'), (n.reset = '[39m'));
          var r = t.indent || 0;
          return (
            e.forEach(e => {
              var t = e.evidence,
                i = e.line,
                s = e.col,
                o = t.length,
                l = s > 41 ? s - 40 : 1,
                u = t.length > s + 60 ? s + 60 : o;
              s < 41 && (u += 40 - s + 1),
                (t = t.replace(/\t/g, ' ').substring(l - 1, u)),
                l > 1 && ((t = '...' + t), (l -= 3)),
                u < o && (t += '...'),
              var c = s - l,
                d = t.substring(0, c).match(/[^\u0000-\u00ff]/g);
              null !== d && (c += d.length),
                a.push(
                  n.white +
                    '^ ' +
                    n.red +
                    e.message +
                    ' (' +
                    e.rule.id +
                    ')' +
                    n.reset
                );
            }),
            a
          );
        }
      }
    }
  ]);
});
=======
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).HTMLHint={})}(this,(function(e){"use strict";class t{constructor(){this._listeners={},this._mapCdataTags=this.makeMap("script,style"),this._arrBlocks=[],this.lastEvent=null}makeMap(e){for(var t={},a=e.split(","),i=0;i<a.length;i++)t[a[i]]=!0;return t}parse(e){var t,a,i,n,r,s,l,o,u=this,d=u._mapCdataTags,c=/<(?:\/([^\s>]+)\s*|!--([\s\S]*?)--|!([^>]*?)|([\w\-:]+)((?:\s+[^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]*))?)*?)\s*(\/?))>/g,h=/\s*([^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]+)(?:\s*=\s*(?:(")([^"]*)"|(')([^']*)'|([^\s"'>]*)))?/g,g=/\r?\n/g,f=0,m=0,p=0,v=1,b=u._arrBlocks;function w(e,t,a,i){var n=a-p+1;for(void 0===i&&(i={}),i.raw=t,i.pos=a,i.line=v,i.col=n,b.push(i),u.fire(e,i);g.exec(t);)v++,p=a+g.lastIndex}for(u.fire("start",{pos:0,line:1,col:1});t=c.exec(e);)if((a=t.index)>f&&(o=e.substring(f,a),r?l.push(o):w("text",o,f)),f=c.lastIndex,!(i=t[1])||(r&&i===r&&(w("cdata",o=l.join(""),m,{tagName:r,attrs:s}),r=null,s=null,l=null),r))if(r)l.push(t[0]);else if(i=t[4]){n=[];for(var y,L=t[5],x=0;y=h.exec(L);){var T=y[1],N=y[2]?y[2]:y[4]?y[4]:"",k=y[3]?y[3]:y[5]?y[5]:y[6]?y[6]:"";n.push({name:T,value:k,quote:N,index:y.index,raw:y[0]}),x+=y[0].length}x===L.length?(w("tagstart",t[0],a,{tagName:i,attrs:n,close:t[6]}),d[i]&&(r=i,s=n.concat(),l=[],m=f)):w("text",t[0],a)}else(t[2]||t[3])&&w("comment",t[0],a,{content:t[2]||t[3],long:!!t[2]});else w("tagend",t[0],a,{tagName:i});e.length>f&&w("text",o=e.substring(f,e.length),f),u.fire("end",{pos:f,line:v,col:e.length-p+1})}addListener(e,t){for(var a,i=this._listeners,n=e.split(/[,\s]/),r=0,s=n.length;r<s;r++)void 0===i[a=n[r]]&&(i[a]=[]),i[a].push(t)}fire(e,t){void 0===t&&(t={}),t.type=e;var a=[],i=this._listeners[e],n=this._listeners.all;void 0!==i&&(a=a.concat(i)),void 0!==n&&(a=a.concat(n));var r=this.lastEvent;null!==r&&(delete r.lastEvent,t.lastEvent=r),this.lastEvent=t;for(var s=0,l=a.length;s<l;s++)a[s].call(this,t)}removeListener(e,t){var a=this._listeners[e];if(void 0!==a)for(var i=0,n=a.length;i<n;i++)if(a[i]===t){a.splice(i,1);break}}fixPos(e,t){var a,i=e.raw.substr(0,t).split(/\r?\n/),n=i.length-1,r=e.line;return n>0?(r+=n,a=i[n].length+1):a=e.col+t,{line:r,col:a}}getMapAttrs(e){for(var t,a={},i=0,n=e.length;i<n;i++)a[(t=e[i]).name]=t.value;return a}}class a{constructor(e,t){this.html=e,this.lines=e.split(/\r?\n/);var a=e.match(/\r?\n/);this.brLen=null!==a?a[0].length:0,this.ruleset=t,this.messages=[],this.error=this.report.bind(this,"error"),this.warn=this.report.bind(this,"warning"),this.info=this.report.bind(this,"info")}report(e,t,a,i,n,r){for(var s,l,o=this.lines,u=this.brLen,d=a-1,c=o.length;d<c&&(i>(l=(s=o[d]).length)&&a<c);d++)a++,1!==(i-=l)&&(i-=u);this.messages.push({type:e,message:t,raw:r,evidence:s,line:a,col:i,rule:{id:n.id,description:n.description,link:"https://github.com/thedaviddias/HTMLHint/wiki/"+n.id}})}}function i(e,t){if(t instanceof RegExp)return!!t.test(e)&&{match:e,pattern:t};const a=t[0],i=t[t.length-1],n=t[t.length-2],r="/"===a&&("/"===i||"/"===n&&"i"===i);if(r){return r&&"i"===i?new RegExp(t.slice(1,-2),"i").test(e):new RegExp(t.slice(1,-1)).test(e)}return e===t}var n={id:"attr-lowercase",description:"All attribute names must be in lowercase.",init:function(e,t,a){var n=this,r=Array.isArray(a)?a:[];e.addListener("tagstart",(function(e){for(var a,s=e.attrs,l=e.col+e.tagName.length+1,o=0,u=s.length;o<u;o++){var d=(a=s[o]).name;r.find(e=>i(d,e))||d===d.toLowerCase()||t.error("The attribute name of [ "+d+" ] must be in lowercase.",e.line,l+a.index,n,a.raw)}}))}},r={id:"attr-sorted",description:"Attribute tags must be in proper order.",init:function(e,t){for(var a=this,i={},n=["class","id","name","src","for","type","href","value","title","alt","role"],r=0;r<n.length;r++)i[n[r]]=r;e.addListener("tagstart",(function(e){for(var n=e.attrs,r=[],s=0;s<n.length;s++)r.push(n[s].name);var l=JSON.stringify(r);r.sort((function(e,t){return null==i[e]&&null==i[t]?0:null==i[e]?1:null==i[t]?-1:i[e]-i[t]||e.localeCompare(t)})),l!==JSON.stringify(r)&&t.error("Inaccurate order "+l+" should be in hierarchy "+JSON.stringify(r)+" ",e.line,e.col,a)}))}},s={id:"attr-unsafe-chars",description:"Attribute values cannot contain unsafe chars.",init:function(e,t){var a=this;e.addListener("tagstart",(function(e){for(var i,n,r=e.attrs,s=e.col+e.tagName.length+1,l=/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/,o=0,u=r.length;o<u;o++)if(null!==(n=(i=r[o]).value.match(l))){var d=escape(n[0]).replace(/%u/,"\\u").replace(/%/,"\\x");t.warn("The value of attribute [ "+i.name+" ] cannot contain an unsafe char [ "+d+" ].",e.line,s+i.index,a,i.raw)}}))}},l={id:"attr-whitespace",description:"All attributes should be separated by only one space and not have leading/trailing whitespace.",init:function(e,t,a){var i=this,n=Array.isArray(a)?a:[];e.addListener("tagstart",(function(e){var a,r=e.attrs,s=e.col+e.tagName.length+1;r.forEach((function(r){a=r;var l=r.name;-1===n.indexOf(l)&&(r.value.trim(r.value)!==r.value&&t.error("The attributes of [ "+l+" ] must not have trailing whitespace.",e.line,s+a.index,i,a.raw),r.value.replace(/ +(?= )/g,"")!==r.value&&t.error("The attributes of [ "+l+" ] must be separated by only one space.",e.line,s+a.index,i,a.raw))}))}))}},o={id:"id-class-value",description:"The id and class attribute values must meet the specified rules.",init:function(e,t,a){var i,n=this;if((i="string"==typeof a?{underline:{regId:/^[a-z\d]+(_[a-z\d]+)*$/,message:"The id and class attribute values must be in lowercase and split by an underscore."},dash:{regId:/^[a-z\d]+(-[a-z\d]+)*$/,message:"The id and class attribute values must be in lowercase and split by a dash."},hump:{regId:/^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/,message:"The id and class attribute values must meet the camelCase style."}}[a]:a)&&i.regId){var r=i.regId,s=i.message;r instanceof RegExp||(r=new RegExp(r)),e.addListener("tagstart",(function(e){for(var a,i=e.attrs,l=e.col+e.tagName.length+1,o=0,u=i.length;o<u;o++)if("id"===(a=i[o]).name.toLowerCase()&&!1===r.test(a.value)&&t.warn(s,e.line,l+a.index,n,a.raw),"class"===a.name.toLowerCase())for(var d,c=a.value.split(/\s+/g),h=0,g=c.length;h<g;h++)(d=c[h])&&!1===r.test(d)&&t.warn(s,e.line,l+a.index,n,d)}))}}},u={id:"id-unique",description:"The value of id attributes must be unique.",init:function(e,t){var a=this,i={};e.addListener("tagstart",(function(e){for(var n,r,s=e.attrs,l=e.col+e.tagName.length+1,o=0,u=s.length;o<u;o++)if("id"===(n=s[o]).name.toLowerCase()){(r=n.value)&&(void 0===i[r]?i[r]=1:i[r]++,i[r]>1&&t.error("The id value [ "+r+" ] must be unique.",e.line,l+n.index,a,n.raw));break}}))}},d={id:"space-tab-mixed-disabled",description:"Do not mix tabs and spaces for indentation.",init:function(e,t,a){var i=this,n="nomix",r=null;if("string"==typeof a){var s=a.match(/^([a-z]+)(\d+)?/);n=s[1],r=s[2]&&parseInt(s[2],10)}e.addListener("text",(function(a){for(var s,l=a.raw,o=/(^|\r?\n)([ \t]+)/g;s=o.exec(l);){var u=e.fixPos(a,s.index+s[1].length);if(1===u.col){var d=s[2];"space"===n?r?!1!==/^ +$/.test(d)&&d.length%r==0||t.warn("Please use space for indentation and keep "+r+" length.",u.line,1,i,a.raw):!1===/^ +$/.test(d)&&t.warn("Please use space for indentation.",u.line,1,i,a.raw):"tab"===n&&!1===/^\t+$/.test(d)?t.warn("Please use tab for indentation.",u.line,1,i,a.raw):!0===/ +\t|\t+ /.test(d)&&t.warn("Do not mix tabs and spaces for indentation.",u.line,1,i,a.raw)}}}))}},c={id:"tag-pair",description:"Tag must be paired.",init:function(e,t){var a=this,i=[],n=e.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");e.addListener("tagstart",(function(e){var t=e.tagName.toLowerCase();void 0!==n[t]||e.close||i.push({tagName:t,line:e.line,raw:e.raw})})),e.addListener("tagend",(function(e){for(var n=e.tagName.toLowerCase(),r=i.length-1;r>=0&&i[r].tagName!==n;r--);if(r>=0){for(var s=[],l=i.length-1;l>r;l--)s.push("</"+i[l].tagName+">");if(s.length>0){var o=i[i.length-1];t.error("Tag must be paired, missing: [ "+s.join("")+" ], start tag match failed [ "+o.raw+" ] on line "+o.line+".",e.line,e.col,a,e.raw)}i.length=r}else t.error("Tag must be paired, no start tag: [ "+e.raw+" ]",e.line,e.col,a,e.raw)})),e.addListener("end",(function(e){for(var n=[],r=i.length-1;r>=0;r--)n.push("</"+i[r].tagName+">");if(n.length>0){var s=i[i.length-1];t.error("Tag must be paired, missing: [ "+n.join("")+" ], open tag match failed [ "+s.raw+" ] on line "+s.line+".",e.line,e.col,a,"")}}))}},h={id:"tag-self-close",description:"Empty tags must be self closed.",init:function(e,t){var a=this,i=e.makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr");e.addListener("tagstart",(function(e){var n=e.tagName.toLowerCase();void 0!==i[n]&&(e.close||t.warn("The empty tag : [ "+n+" ] must be self closed.",e.line,e.col,a,e.raw))}))}},g={id:"tagname-lowercase",description:"All html element names must be in lowercase.",init:function(e,t,a){var i=this,n=Array.isArray(a)?a:[];e.addListener("tagstart,tagend",(function(e){var a=e.tagName;-1===n.indexOf(a)&&a!==a.toLowerCase()&&t.error("The html element name of [ "+a+" ] must be in lowercase.",e.line,e.col,i,e.raw)}))}},f=Object.freeze({__proto__:null,altRequire:{id:"alt-require",description:"The alt attribute of an <img> element must be present and alt attribute of area[href] and input[type=image] must have a value.",init:function(e,t){var a=this;e.addListener("tagstart",(function(i){var n,r=i.tagName.toLowerCase(),s=e.getMapAttrs(i.attrs),l=i.col+r.length+1;"img"!==r||"alt"in s?("area"===r&&"href"in s||"input"===r&&"image"===s.type)&&("alt"in s&&""!==s.alt||(n="area"===r?"area[href]":"input[type=image]",t.warn("The alt attribute of "+n+" must have a value.",i.line,l,a,i.raw))):t.warn("An alt attribute must be present on <img> elements.",i.line,l,a,i.raw)}))}},attrLowercase:n,attrSort:r,attrNoDuplication:{id:"attr-no-duplication",description:"Elements cannot have duplicate attributes.",init:function(e,t){var a=this;e.addListener("tagstart",(function(e){for(var i,n,r=e.attrs,s=e.col+e.tagName.length+1,l={},o=0,u=r.length;o<u;o++)!0===l[n=(i=r[o]).name]&&t.error("Duplicate of attribute name [ "+i.name+" ] was found.",e.line,s+i.index,a,i.raw),l[n]=!0}))}},attrUnsafeChars:s,attrValueDoubleQuotes:{id:"attr-value-double-quotes",description:"Attribute values must be in double quotes.",init:function(e,t){var a=this;e.addListener("tagstart",(function(e){for(var i,n=e.attrs,r=e.col+e.tagName.length+1,s=0,l=n.length;s<l;s++)(""!==(i=n[s]).value&&'"'!==i.quote||""===i.value&&"'"===i.quote)&&t.error("The value of attribute [ "+i.name+" ] must be in double quotes.",e.line,r+i.index,a,i.raw)}))}},attrValueNotEmpty:{id:"attr-value-not-empty",description:"All attributes must have values.",init:function(e,t){var a=this;e.addListener("tagstart",(function(e){for(var i,n=e.attrs,r=e.col+e.tagName.length+1,s=0,l=n.length;s<l;s++)""===(i=n[s]).quote&&""===i.value&&t.warn("The attribute [ "+i.name+" ] must have a value.",e.line,r+i.index,a,i.raw)}))}},attrValueSingleQuotes:{id:"attr-value-single-quotes",description:"Attribute values must be in single quotes.",init:function(e,t){var a=this;e.addListener("tagstart",(function(e){for(var i,n=e.attrs,r=e.col+e.tagName.length+1,s=0,l=n.length;s<l;s++)(""!==(i=n[s]).value&&"'"!==i.quote||""===i.value&&'"'===i.quote)&&t.error("The value of attribute [ "+i.name+" ] must be in single quotes.",e.line,r+i.index,a,i.raw)}))}},attrWhitespace:l,doctypeFirst:{id:"doctype-first",description:"Doctype must be declared first.",init:function(e,t){var a=this,i=function(n){"start"===n.type||"text"===n.type&&/^\s*$/.test(n.raw)||(("comment"!==n.type&&!1===n.long||!1===/^DOCTYPE\s+/i.test(n.content))&&t.error("Doctype must be declared first.",n.line,n.col,a,n.raw),e.removeListener("all",i))};e.addListener("all",i)}},doctypeHTML5:{id:"doctype-html5",description:'Invalid doctype. Use: "<!DOCTYPE html>"',init:function(e,t){var a=this;function i(e){!1===e.long&&"doctype html"!==e.content.toLowerCase()&&t.warn('Invalid doctype. Use: "<!DOCTYPE html>"',e.line,e.col,a,e.raw)}e.addListener("all",i),e.addListener("tagstart",(function t(){e.removeListener("comment",i),e.removeListener("tagstart",t)}))}},headScriptDisabled:{id:"head-script-disabled",description:"The <script> tag cannot be used in a <head> tag.",init:function(e,t){var a=this,i=/^(text\/javascript|application\/javascript)$/i,n=!1;function r(r){var s=e.getMapAttrs(r.attrs).type,l=r.tagName.toLowerCase();"head"===l&&(n=!0),!0!==n||"script"!==l||s&&!0!==i.test(s)||t.warn("The <script> tag cannot be used in a <head> tag.",r.line,r.col,a,r.raw)}e.addListener("tagstart",r),e.addListener("tagend",(function t(a){"head"===a.tagName.toLowerCase()&&(e.removeListener("tagstart",r),e.removeListener("tagend",t))}))}},hrefAbsOrRel:{id:"href-abs-or-rel",description:"An href attribute must be either absolute or relative.",init:function(e,t,a){var i=this,n="abs"===a?"absolute":"relative";e.addListener("tagstart",(function(e){for(var a,r=e.attrs,s=e.col+e.tagName.length+1,l=0,o=r.length;l<o;l++)if("href"===(a=r[l]).name){("absolute"===n&&!1===/^\w+?:/.test(a.value)||"relative"===n&&!0===/^https?:\/\//.test(a.value))&&t.warn("The value of the href attribute [ "+a.value+" ] must be "+n+".",e.line,s+a.index,i,a.raw);break}}))}},idClsasAdDisabled:{id:"id-class-ad-disabled",description:"The id and class attributes cannot use the ad keyword, it will be blocked by adblock software.",init:function(e,t){var a=this;e.addListener("tagstart",(function(e){for(var i,n,r=e.attrs,s=e.col+e.tagName.length+1,l=0,o=r.length;l<o;l++)n=(i=r[l]).name,/^(id|class)$/i.test(n)&&/(^|[-_])ad([-_]|$)/i.test(i.value)&&t.warn("The value of attribute "+n+" cannot use the ad keyword.",e.line,s+i.index,a,i.raw)}))}},idClassValue:o,idUnique:u,inlineScriptDisabled:{id:"inline-script-disabled",description:"Inline script cannot be used.",init:function(e,t){var a=this;e.addListener("tagstart",(function(e){for(var i,n,r=e.attrs,s=e.col+e.tagName.length+1,l=/^on(unload|message|submit|select|scroll|resize|mouseover|mouseout|mousemove|mouseleave|mouseenter|mousedown|load|keyup|keypress|keydown|focus|dblclick|click|change|blur|error)$/i,o=0,u=r.length;o<u;o++)n=(i=r[o]).name.toLowerCase(),!0===l.test(n)?t.warn("Inline script [ "+i.raw+" ] cannot be used.",e.line,s+i.index,a,i.raw):"src"!==n&&"href"!==n||/^\s*javascript:/i.test(i.value)&&t.warn("Inline script [ "+i.raw+" ] cannot be used.",e.line,s+i.index,a,i.raw)}))}},inlineStyleDisabled:{id:"inline-style-disabled",description:"Inline style cannot be used.",init:function(e,t){var a=this;e.addListener("tagstart",(function(e){for(var i,n=e.attrs,r=e.col+e.tagName.length+1,s=0,l=n.length;s<l;s++)"style"===(i=n[s]).name.toLowerCase()&&t.warn("Inline style [ "+i.raw+" ] cannot be used.",e.line,r+i.index,a,i.raw)}))}},scriptDisabled:{id:"script-disabled",description:"The <script> tag cannot be used.",init:function(e,t){var a=this;e.addListener("tagstart",(function(e){"script"===e.tagName.toLowerCase()&&t.error("The <script> tag cannot be used.",e.line,e.col,a,e.raw)}))}},spaceTabMixedDisabled:d,specCharEscape:{id:"spec-char-escape",description:"Special characters must be escaped.",init:function(e,t){var a=this;e.addListener("text",(function(i){for(var n,r=i.raw,s=/[<>]/g;n=s.exec(r);){var l=e.fixPos(i,n.index);t.error("Special characters must be escaped : [ "+n[0]+" ].",l.line,l.col,a,i.raw)}}))}},srcNotEmpty:{id:"src-not-empty",description:"The src attribute of an img(script,link) must have a value.",init:function(e,t){var a=this;e.addListener("tagstart",(function(e){for(var i,n=e.tagName,r=e.attrs,s=e.col+n.length+1,l=0,o=r.length;l<o;l++)i=r[l],(!0===/^(img|script|embed|bgsound|iframe)$/.test(n)&&"src"===i.name||"link"===n&&"href"===i.name||"object"===n&&"data"===i.name)&&""===i.value&&t.error("The attribute [ "+i.name+" ] of the tag [ "+n+" ] must have a value.",e.line,s+i.index,a,i.raw)}))}},styleDisabled:{id:"style-disabled",description:"<style> tags cannot be used.",init:function(e,t){var a=this;e.addListener("tagstart",(function(e){"style"===e.tagName.toLowerCase()&&t.warn("The <style> tag cannot be used.",e.line,e.col,a,e.raw)}))}},tagPair:c,tagSelfClose:h,tagnameLowercase:g,tagnameSpecialChars:{id:"tagname-specialchars",description:"All html element names must be in lowercase.",init:function(e,t){var a=this,i=/[^a-zA-Z0-9\-:_]/;e.addListener("tagstart,tagend",(function(e){var n=e.tagName;i.test(n)&&t.error("The html element name of [ "+n+" ] contains special character.",e.line,e.col,a,e.raw)}))}},titleRequire:{id:"title-require",description:"<title> must be present in <head> tag.",init:function(e,t){var a=this,i=!1,n=!1;function r(e){var t=e.tagName.toLowerCase();"head"===t?i=!0:"title"===t&&i&&(n=!0)}e.addListener("tagstart",r),e.addListener("tagend",(function i(s){var l=s.tagName.toLowerCase();if(n&&"title"===l){var o=s.lastEvent;("text"!==o.type||"text"===o.type&&!0===/^\s*$/.test(o.raw))&&t.error("<title></title> must not be empty.",s.line,s.col,a,s.raw)}else"head"===l&&(!1===n&&t.error("<title> must be present in <head> tag.",s.line,s.col,a,s.raw),e.removeListener("tagstart",r),e.removeListener("tagend",i))}))}}});class m{constructor(){this.rules={},this.defaultRuleset={"tagname-lowercase":!0,"attr-lowercase":!0,"attr-value-double-quotes":!0,"doctype-first":!0,"tag-pair":!0,"spec-char-escape":!0,"id-unique":!0,"src-not-empty":!0,"attr-no-duplication":!0,"title-require":!0}}addRule(e){this.rules[e.id]=e}verify(e,i){void 0!==i&&0!==Object.keys(i).length||(i=this.defaultRuleset),e=e.replace(/^\s*<!--\s*htmlhint\s+([^\r\n]+?)\s*-->/i,(function(e,t){return void 0===i&&(i={}),t.replace(/(?:^|,)\s*([^:,]+)\s*(?:\:\s*([^,\s]+))?/g,(function(e,t,a){"false"===a?a=!1:"true"===a&&(a=!0),i[t]=void 0===a||a})),""}));var n,r=new t,s=new a(e,i),l=this.rules;for(var o in i)void 0!==(n=l[o])&&!1!==i[o]&&n.init(r,s,i[o]);return r.parse(e),s.messages}format(e,t){var a=[],i={white:"",grey:"",red:"",reset:""};(t=t||{}).colors&&(i.white="[37m",i.grey="[90m",i.red="[31m",i.reset="[39m");var n=t.indent||0;return e.forEach(e=>{var t=e.evidence,r=e.line,s=e.col,l=t.length,o=s>41?s-40:1,u=t.length>s+60?s+60:l;s<41&&(u+=40-s+1),t=t.replace(/\t/g," ").substring(o-1,u),o>1&&(t="..."+t,o-=3),u<l&&(t+="..."),a.push(i.white+p(n)+"L"+r+" |"+i.grey+t+i.reset);var d=s-o,c=t.substring(0,d).match(/[^\u0000-\u00ff]/g);null!==c&&(d+=c.length),a.push(i.white+p(n)+p(String(r).length+3+d)+"^ "+i.red+e.message+" ("+e.rule.id+")"+i.reset)}),a}}function p(e,t){return new Array(e+1).join(t||" ")}const v=new m;Object.keys(f).forEach(e=>{v.addRule(f[e])}),e.HTMLHint=m,e.HTMLParser=t,e.HTMLRules=f,e.Reporter=a,e.hint=v,Object.defineProperty(e,"__esModule",{value:!0})}));
>>>>>>> feat: add rollup configuration (#367)

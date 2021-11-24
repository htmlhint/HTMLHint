"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regular = '(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang)';
var irregular = '(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)';
var grandfathered = "(?<grandfathered>" + irregular + "|" + regular + ")";
var privateUse = '(?<privateUse>x(-[A-Za-z0-9]{1,8})+)';
var privateUse2 = '(?<privateUse2>x(-[A-Za-z0-9]{1,8})+)';
var singleton = '[0-9A-WY-Za-wy-z]';
var extension = "(?<extension>" + singleton + "(-[A-Za-z0-9]{2,8})+)";
var variant = '(?<variant>[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3})';
var region = '(?<region>[A-Za-z]{2}|[0-9]{3})';
var script = '(?<script>[A-Za-z]{4})';
var extlang = '(?<extlang>[A-Za-z]{3}(-[A-Za-z]{3}){0,2})';
var language = "(?<language>([A-Za-z]{2,3}(-" + extlang + ")?)|[A-Za-z]{4}|[A-Za-z]{5,8})";
var langtag = "(" + language + "(-" + script + ")?" +
    ("(-" + region + ")?") +
    ("(-" + variant + ")*") +
    ("(-" + extension + ")*") +
    ("(-" + privateUse + ")?") +
    ')';
var languageTag = "(" + grandfathered + "|" + langtag + "|" + privateUse2 + ")";
exports.default = {
    id: 'html-lang-require',
    description: 'The lang attribute of an <html> element must be present and should be valid.',
    init: function (parser, reporter) {
        var _this = this;
        parser.addListener('tagstart', function (event) {
            var tagName = event.tagName.toLowerCase();
            var mapAttrs = parser.getMapAttrs(event.attrs);
            var col = event.col + tagName.length + 1;
            var langValidityPattern = new RegExp(languageTag, 'g');
            if (tagName === 'html') {
                if ('lang' in mapAttrs) {
                    if (!mapAttrs['lang']) {
                        reporter.warn('The lang attribute of <html> element must have a value.', event.line, col, _this, event.raw);
                    }
                    else if (!langValidityPattern.test(mapAttrs['lang'])) {
                        reporter.warn('The lang attribute value of <html> element must be a valid BCP47.', event.line, col, _this, event.raw);
                    }
                }
                else {
                    reporter.warn('An lang attribute must be present on <html> elements.', event.line, col, _this, event.raw);
                }
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbC1sYW5nLXJlcXVpcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9odG1sLWxhbmctcmVxdWlyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLElBQU0sT0FBTyxHQUNYLHFGQUFxRixDQUFBO0FBQ3ZGLElBQU0sU0FBUyxHQUNiLDJJQUEySSxDQUFBO0FBQzdJLElBQU0sYUFBYSxHQUFHLHNCQUFvQixTQUFTLFNBQUksT0FBTyxNQUFHLENBQUE7QUFDakUsSUFBTSxVQUFVLEdBQUcsc0NBQXNDLENBQUE7QUFDekQsSUFBTSxXQUFXLEdBQUcsdUNBQXVDLENBQUE7QUFDM0QsSUFBTSxTQUFTLEdBQUcsbUJBQW1CLENBQUE7QUFDckMsSUFBTSxTQUFTLEdBQUcsa0JBQWdCLFNBQVMsMEJBQXVCLENBQUE7QUFDbEUsSUFBTSxPQUFPLEdBQUcsa0RBQWtELENBQUE7QUFDbEUsSUFBTSxNQUFNLEdBQUcsaUNBQWlDLENBQUE7QUFDaEQsSUFBTSxNQUFNLEdBQUcsd0JBQXdCLENBQUE7QUFDdkMsSUFBTSxPQUFPLEdBQUcsNENBQTRDLENBQUE7QUFDNUQsSUFBTSxRQUFRLEdBQUcsaUNBQStCLE9BQU8sbUNBQWdDLENBQUE7QUFDdkYsSUFBTSxPQUFPLEdBQ1gsTUFBSSxRQUFRLFVBQUssTUFBTSxPQUFJO0tBQzNCLE9BQUssTUFBTSxPQUFJLENBQUE7S0FDZixPQUFLLE9BQU8sT0FBSSxDQUFBO0tBQ2hCLE9BQUssU0FBUyxPQUFJLENBQUE7S0FDbEIsT0FBSyxVQUFVLE9BQUksQ0FBQTtJQUNuQixHQUFHLENBQUE7QUFDTCxJQUFNLFdBQVcsR0FBRyxNQUFJLGFBQWEsU0FBSSxPQUFPLFNBQUksV0FBVyxNQUFHLENBQUE7QUFFbEUsa0JBQWU7SUFDYixFQUFFLEVBQUUsbUJBQW1CO0lBQ3ZCLFdBQVcsRUFDVCw4RUFBOEU7SUFDaEYsSUFBSSxZQUFDLE1BQU0sRUFBRSxRQUFRO1FBQXJCLGlCQXFDQztRQXBDQyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxVQUFDLEtBQUs7WUFDbkMsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUMzQyxJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNoRCxJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1lBQzFDLElBQU0sbUJBQW1CLEdBQUcsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBRXhELElBQUksT0FBTyxLQUFLLE1BQU0sRUFBRTtnQkFDdEIsSUFBSSxNQUFNLElBQUksUUFBUSxFQUFFO29CQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO3dCQUNyQixRQUFRLENBQUMsSUFBSSxDQUNYLHlEQUF5RCxFQUN6RCxLQUFLLENBQUMsSUFBSSxFQUNWLEdBQUcsRUFDSCxLQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFBO3FCQUNGO3lCQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7d0JBQ3RELFFBQVEsQ0FBQyxJQUFJLENBQ1gsbUVBQW1FLEVBQ25FLEtBQUssQ0FBQyxJQUFJLEVBQ1YsR0FBRyxFQUNILEtBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7cUJBQ0Y7aUJBQ0Y7cUJBQU07b0JBQ0wsUUFBUSxDQUFDLElBQUksQ0FDWCx1REFBdUQsRUFDdkQsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEVBQ0gsS0FBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTtpQkFDRjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ00sQ0FBQSJ9
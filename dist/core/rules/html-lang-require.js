"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regular = '(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang)';
var irregular = '(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)';
var grandfathered = "(?<grandfathered>".concat(irregular, "|").concat(regular, ")");
var privateUse = '(?<privateUse>x(-[A-Za-z0-9]{1,8})+)';
var privateUse2 = '(?<privateUse2>x(-[A-Za-z0-9]{1,8})+)';
var singleton = '[0-9A-WY-Za-wy-z]';
var extension = "(?<extension>".concat(singleton, "(-[A-Za-z0-9]{2,8})+)");
var variant = '(?<variant>[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3})';
var region = '(?<region>[A-Za-z]{2}|[0-9]{3})';
var script = '(?<script>[A-Za-z]{4})';
var extlang = '(?<extlang>[A-Za-z]{3}(-[A-Za-z]{3}){0,2})';
var language = "(?<language>([A-Za-z]{2,3}(-".concat(extlang, ")?)|[A-Za-z]{4}|[A-Za-z]{5,8})");
var langtag = "(".concat(language, "(-").concat(script, ")?") +
    "(-".concat(region, ")?") +
    "(-".concat(variant, ")*") +
    "(-".concat(extension, ")*") +
    "(-".concat(privateUse, ")?") +
    ')';
var languageTag = "(".concat(grandfathered, "|").concat(langtag, "|").concat(privateUse2, ")");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbC1sYW5nLXJlcXVpcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9ydWxlcy9odG1sLWxhbmctcmVxdWlyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLElBQU0sT0FBTyxHQUNYLHFGQUFxRixDQUFBO0FBQ3ZGLElBQU0sU0FBUyxHQUNiLDJJQUEySSxDQUFBO0FBQzdJLElBQU0sYUFBYSxHQUFHLDJCQUFvQixTQUFTLGNBQUksT0FBTyxNQUFHLENBQUE7QUFDakUsSUFBTSxVQUFVLEdBQUcsc0NBQXNDLENBQUE7QUFDekQsSUFBTSxXQUFXLEdBQUcsdUNBQXVDLENBQUE7QUFDM0QsSUFBTSxTQUFTLEdBQUcsbUJBQW1CLENBQUE7QUFDckMsSUFBTSxTQUFTLEdBQUcsdUJBQWdCLFNBQVMsMEJBQXVCLENBQUE7QUFDbEUsSUFBTSxPQUFPLEdBQUcsa0RBQWtELENBQUE7QUFDbEUsSUFBTSxNQUFNLEdBQUcsaUNBQWlDLENBQUE7QUFDaEQsSUFBTSxNQUFNLEdBQUcsd0JBQXdCLENBQUE7QUFDdkMsSUFBTSxPQUFPLEdBQUcsNENBQTRDLENBQUE7QUFDNUQsSUFBTSxRQUFRLEdBQUcsc0NBQStCLE9BQU8sbUNBQWdDLENBQUE7QUFDdkYsSUFBTSxPQUFPLEdBQ1gsV0FBSSxRQUFRLGVBQUssTUFBTSxPQUFJO0lBQzNCLFlBQUssTUFBTSxPQUFJO0lBQ2YsWUFBSyxPQUFPLE9BQUk7SUFDaEIsWUFBSyxTQUFTLE9BQUk7SUFDbEIsWUFBSyxVQUFVLE9BQUk7SUFDbkIsR0FBRyxDQUFBO0FBQ0wsSUFBTSxXQUFXLEdBQUcsV0FBSSxhQUFhLGNBQUksT0FBTyxjQUFJLFdBQVcsTUFBRyxDQUFBO0FBRWxFLGtCQUFlO0lBQ2IsRUFBRSxFQUFFLG1CQUFtQjtJQUN2QixXQUFXLEVBQ1QsOEVBQThFO0lBQ2hGLElBQUksWUFBQyxNQUFNLEVBQUUsUUFBUTtRQUFyQixpQkFxQ0M7UUFwQ0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsVUFBQyxLQUFLO1lBQ25DLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDM0MsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDaEQsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtZQUMxQyxJQUFNLG1CQUFtQixHQUFHLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUV4RCxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUU7Z0JBQ3RCLElBQUksTUFBTSxJQUFJLFFBQVEsRUFBRTtvQkFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFDckIsUUFBUSxDQUFDLElBQUksQ0FDWCx5REFBeUQsRUFDekQsS0FBSyxDQUFDLElBQUksRUFDVixHQUFHLEVBQ0gsS0FBSSxFQUNKLEtBQUssQ0FBQyxHQUFHLENBQ1YsQ0FBQTtxQkFDRjt5QkFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFO3dCQUN0RCxRQUFRLENBQUMsSUFBSSxDQUNYLG1FQUFtRSxFQUNuRSxLQUFLLENBQUMsSUFBSSxFQUNWLEdBQUcsRUFDSCxLQUFJLEVBQ0osS0FBSyxDQUFDLEdBQUcsQ0FDVixDQUFBO3FCQUNGO2lCQUNGO3FCQUFNO29CQUNMLFFBQVEsQ0FBQyxJQUFJLENBQ1gsdURBQXVELEVBQ3ZELEtBQUssQ0FBQyxJQUFJLEVBQ1YsR0FBRyxFQUNILEtBQUksRUFDSixLQUFLLENBQUMsR0FBRyxDQUNWLENBQUE7aUJBQ0Y7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNNLENBQUEifQ==
HTMLHint.addRule({
    id: 'radio-group',
    description: 'group of radio buttons should have role of radiogroup. every radio button should have radio role',
    init: function(parser, reporter){
        var isRadiogroupContainer = function(event) { 
            var isRadioClassExist = false;
            var classNames = HTMLHint.utils.getAttribute(event.attrs,"class");
            if(!classNames){
                return false;
            }
            var classesArray = classNames.value.split(/\s+/g);
            classesArray.forEach(function(className){
                if(className.toLowerCase() ==="radio" ){
                    isRadioClassExist = true;
                }
            });
            return isRadioClassExist;
        };
        
        var self = this;        
        parser.addListener('tagstart', function(event){
            var roleAttribute = HTMLHint.utils.getAttribute(event.attrs,"role");
            var ariaLabelAttribute = HTMLHint.utils.getAttribute(event.attrs,"aria-labelledby");
            if (isRadiogroupContainer(event) && (!roleAttribute || roleAttribute.value !== 'radiogroup'))
            {
               reporter.error('radiogroup container should have role attr with radiogroup value' + event.line , event.line, event.col, self, event.raw);
            }  
             if (isRadiogroupContainer(event) && (!ariaLabelAttribute || ariaLabelAttribute.value === ''))
            {
               reporter.error('radiogroup container should have aria-labelledby attribute with value' + event.line , event.line, event.col, self, event.raw);
            }                 
        });
        //parser.addListener('tagend', function(event){
        //    var tagName = event.tagName.toLowerCase();          
          //  if (tagName === "table" && unclosedTablesCounter>0) {
            //    unclosedTablesCounter--;
           // }
           // if (unclosedTablesCounter === 0)  {
             //   inTable = false;
           // }        
        //});       
    }
});

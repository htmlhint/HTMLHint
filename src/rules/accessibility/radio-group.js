HTMLHint.addRule({
    id: 'radio-group',
    description: 'group of radio buttons should have role of radiogroup. every radio button should have radio role',
    init: function(parser, reporter){
        var isRadiogroupContainer = function(event) { 
                return event.class && event.class.toLowerCase() === "radio";
        };
        
        var self = this;        
        parser.addListener('tagstart', function(event){
          
            if (isRadiogroupContainer(event) && HTMLHint.utils.getAttribute(event.attrs,"role") !== 'radiogroup')
            {
               reporter.error('radiogroup container should have role attr with radiogroup value' + event.line , event.line, event.col, self, event.raw);
            }  
             if (!HTMLHint.utils.getAttribute(event.attrs,"aria-labelledby"))
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

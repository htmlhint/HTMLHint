HTMLHint.addRule({
    id: 'label-data-for',
    description: 'label within a dynamic table should have a data-for attribute.',
    init: function(parser, reporter){
        var isDynamicTable = function(tagName, attributes) { 
                return (tagName.toLowerCase() === "table") &&                       
                       (HTMLHint.utils.isAttributeExists(attributes,"tfsdata") ||
                        HTMLHint.utils.isAttributeExists(attributes,"tfsnestedtable"));
        };
        var inTable = false;  
        var self = this;
        var unclosedTablesCounter = 0;        
        
        parser.addListener('tagstart', function(event){
          
            var tagName = event.tagName.toLowerCase();           
            if (inTable && tagName==="label" && !HTMLHint.utils.isAttributeExists(event.attrs,"data-for"))
            {
               reporter.error('label within a dynamic table should have a data-for attribute. Error on line ' + event.line , event.line, event.col, self, event.raw);
            }         
            if (isDynamicTable(tagName,event.attrs)  && !event.close){
               unclosedTablesCounter++;
               inTable = true;
            }            
        });
        parser.addListener('tagend', function(event){
            var tagName = event.tagName.toLowerCase();          
            if (tagName === "table" && unclosedTablesCounter>0) {
                unclosedTablesCounter--;
            }
            if (unclosedTablesCounter === 0)  {
                inTable = false;
            }        
        });       
    }
});

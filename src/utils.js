(function(HTMLHint, undefined){

    const isAttributeExists = function(attributes, attributeName) {
        if (!Array.isArray(attributes) || typeof attributeName !== "string") {
            return undefined;
        }

        return attributes.some( 
             (attr) =>  attr.name.toLowerCase() === attributeName.toLowerCase()
        );
    };

    const getAttribute = function(attributes, attributeName) {
         if (!Array.isArray(attributes) || typeof attributeName !== "string") {
            return undefined;
        }

        if(isAttributeExists(attributes, attributeName)) {
            return attributes.find( 
                (attr) =>  attr.name.toLowerCase() === attributeName.toLowerCase()
            );
        }

        return undefined;
    };

    HTMLHint.utils = {
        isAttributeExists,
        getAttribute
    };

})(HTMLHint);

(function(){
    $.cookie.json = true;
    //Default rules
    var ruleSets = {
        'tagname-lowercase': true,
        'attr-lowercase': true,
        'attr-value-double-quotes': true,
        'doctype-first': true,
        'tag-pair': true,
        'spec-char-escape': true
    };
    loadRules();
    //init editor
    var editor = ace.edit("editor"), upTimer;
    editor.setShowPrintMargin(false);
    editor.setTheme("ace/theme/merbivore");
    editor.getSession().setMode("ace/mode/html");
    editor.on('change', function(e){
        clearTimeout(upTimer);
        upTimer = setTimeout(updateHTMLHint, 500);
    });
    function updateHTMLHint(){
        var code = editor.getValue();
        var messages = HTMLHint.verify(code, ruleSets);
        var errors = [], message;
        for(var i=0, l=messages.length;i<l;i++){
            message = messages[i];
            errors.push({
                row: message.line-1,
                column: message.col-1,
                text: message.message,
                type: message.type,
                raw: message.raw
            });
        }
        editor.getSession().setAnnotations(errors);
    }
    function loadRules(){
        var saveRuleSets = $.cookie('htmlhintRules');
        if(saveRuleSets){
            ruleSets = saveRuleSets;
        }
    }
    function saveRules(){
        $.cookie('htmlhintRules', ruleSets, { expires: 365 });
    }
    $('input[type=checkbox]').change(function(){
        var jThis = $(this),
            id = jThis.attr('id'),
            ruleValue = jThis.prop('checked');
        if(ruleValue === true){
            var jValue = $('#'+id+'_value');
            if(jValue.length > 0){
                ruleValue = jValue.val();
            }
            ruleSets[id] = ruleValue;
            $('#'+id+'_valuearea').show();
        }
        else{
            delete ruleSets[id];
            $('#'+id+'_valuearea').hide();
        }
        saveRules();
        updateHTMLHint();
    });
    $('select').change(function(){
        var jThis = $(this),
            id = jThis.attr('id').replace('_value', '');
        ruleSets[id] = jThis.val();
        saveRules();
        updateHTMLHint();
    });
    for(var id in ruleSets){
        var ruleValue = ruleSets[id],
            jValue = $('#'+id+'_value');
        $('#'+id).prop('checked', true);
        if(jValue.length>0){
            jValue.val(ruleValue);
            $('#'+id+'_valuearea').show();
        }
    }
    updateHTMLHint();
})();
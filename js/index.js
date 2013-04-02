(function(){
    $.cookie.json = true;
    
    //Default rules
    var ruleSets = {
            'tagname-lowercase': true,
            'attr-lowercase': true,
            'attr-value-double-quotes': true,
            'doctype-first': true,
            'tag-pair': true,
            'spec-char-escape': true,
            'id-unique': true
        },
        ruleCSSLint = {
                "display-property-grouping": true,
                "known-properties": true
        },
        ruleJSHint = {
        };
        
    var settings = {
            editorTheme: 'merbivore'
        };

    var editor,
        arrHints = [];
        
    var jHintState = $('#hint-state'),
        jButtonArea = $('#button-area'),
        jShowLast = $('#show-last'),
        jShowNext = $('#show-next');
        
    loadSettings();
    loadRules();
    initEditor();
    initOptions();
    updateHTMLHint();

    function loadSettings(){
        var saveSettings = $.cookie('htmlhintSettings');
        if(saveSettings){
            settings = saveSettings;
        }
    }
    
    function saveSettings(){
        $.cookie('htmlhintSettings', settings, { expires: 365 });
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
    
    function initEditor(){
        var jEditorTheme = $('#editor-theme');
        
        jEditorTheme.val(settings.editorTheme);
        jEditorTheme.change(function(){
            settings.editorTheme = jEditorTheme.val();
            editor.setTheme("ace/theme/"+settings.editorTheme);
            saveSettings();
        });
        var upTimer;
        editor = ace.edit("editor")
        editor.setShowPrintMargin(false);
        editor.setTheme("ace/theme/"+settings.editorTheme);
        editor.getSession().setMode("ace/mode/html");
        editor.on('change', function(e){
            clearTimeout(upTimer);
            upTimer = setTimeout(updateHTMLHint, 500);
        });
        editor.commands.addCommand({
            name: 'left',
            bindKey: {win: 'Ctrl-Left',  mac: 'Command-Left'},
            exec: showLastHint,
            readOnly: true // false if this command should not apply in readOnly mode
        });
        editor.commands.addCommand({
            name: 'up',
            bindKey: {win: 'Ctrl-Up',  mac: 'Command-Up'},
            exec: showLastHint,
            readOnly: true // false if this command should not apply in readOnly mode
        });
        editor.commands.addCommand({
            name: 'right',
            bindKey: {win: 'Ctrl-Right',  mac: 'Command-Right'},
            exec: showNextHint,
            readOnly: true // false if this command should not apply in readOnly mode
        });
        editor.commands.addCommand({
            name: 'down',
            bindKey: {win: 'Ctrl-Down',  mac: 'Command-Down'},
            exec: showNextHint,
            readOnly: true // false if this command should not apply in readOnly mode
        });
        jShowLast.mousedown(showLastHint);
        jShowNext.mousedown(showNextHint);
    }

    function updateHTMLHint(){
        if(ruleSets['csslint'] === true){
            ruleSets['csslint'] = ruleCSSLint;
        }
        if(ruleSets['jshint'] === true){
            ruleSets['jshint'] = ruleJSHint;
        }
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
        arrHints = errors;
        editor.getSession().setAnnotations(errors);
        var errorCount = errors.length;
        jHintState.html('Find Hints: <strong>'+errorCount+'</strong>');
        if(errorCount>0){
            jButtonArea.show();
        }
        else{
            jButtonArea.hide();
        }
    }
    
    function showLastHint(){
        if(arrHints.length>0){
            var cursor = editor.selection.getCursor(),
                curRow = cursor.row,
                curColumn = cursor.column;
            var hint, hintRow, hintCol;
            for(var i=arrHints.length-1;i>=0;i--){
                hint = arrHints[i];
                hintRow = hint.row;
                hintCol = hint.column;
                if(hintRow < curRow || (hintRow === curRow && hintCol < curColumn)){
                    editor.moveCursorTo(hintRow, hintCol)
                    editor.selection.clearSelection();
                    break;
                }
            }
        }
        return false;
    }
    
    function showNextHint(){
        if(arrHints.length>0){
            var cursor = editor.selection.getCursor(),
                curRow = cursor.row,
                curColumn = cursor.column;
            var hint, hintRow, hintCol;
            for(var i=0;i<arrHints.length;i++){
                hint = arrHints[i];
                hintRow = hint.row;
                hintCol = hint.column;
                if(hintRow > curRow || (hintRow === curRow && hintCol > curColumn)){
                    editor.moveCursorTo(hintRow, hintCol)
                    editor.selection.clearSelection();
                    break;
                }
            }
        }
        return false;
    }
    
    function initOptions(){
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
    }
})();
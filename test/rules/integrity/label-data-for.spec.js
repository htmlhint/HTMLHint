var expect  = require("expect.js");

var HTMLHint  = require("../../../index").HTMLHint;

var ruldId = 'label-data-for',
    ruleOptions = {};

ruleOptions[ruldId] = true;

describe('Rules: '+ruldId, function(){

    it('label in a dynamic table without data-for attribute should result in an error', function(){
        var code = `<table tfsdata>
                       <thead></thead>
                       <tbody>
                        <tr>
                            <td>
                                <label for="firstName">First Name</label>
                                <input id="firstName"/>
                            <td>
                        </tr>
                       <tbody>
                    </table>`;
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(6);
        expect(messages[0].col).to.be(33);   
    });

     it('label in a dynamic table with data-for attribute should not result in an error', function(){
         var code = `<table tfsdata>
                       <thead></thead>
                       <tbody>
                        <tr>
                            <td>
                                <label data-for="firstName">First Name</label>
                                <input id="firstName"/>
                            <td>
                        </tr>
                       <tbody>
                    </table>`;
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);
    });

    it('label outside of  a dynamic table without data-for attribute should not result in an error', function(){
        var code = `<table tfsdata>
                       <thead></thead>
                       <tbody>
                        <tr>
                            <td>
                                <label data-for="firstName">First Name</label>
                                <input id="firstName"/>
                            <td>
                        </tr>
                       <tbody>
                    </table>
                    <label for="lastName"></span>
                    <input id="lastName"/>`;
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);        
    });
    it('label in a nested dynamic table without data-for attribute should result in an error', function(){
        var code = `<table tfsdata>
                       <thead></thead>
                       <tbody>
                        <tr>
                            <td>
                                <label data-for="firstName">First Name</label>
                                <input id="firstName"/>
                            <td>
                            <td>
                              <div>
                                 <table tfsnestedtable>
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <label for="street">Street</label>
                                                <input id="street"/>
                                            <td>
                                        </tr>
                                    <tbody>
                                  </table>
                              <div>
                            <td>
                        </tr>
                       <tbody>
                    </table>`;
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);
        expect(messages[0].line).to.be(16);
        expect(messages[0].col).to.be(49);   
    });

    it('label in a nested dynamic table with data-for attribute should not result in an error', function(){
        var code = `<table tfsdata>
                       <thead></thead>
                       <tbody>
                        <tr>
                            <td>
                                <label data-for="firstName">First Name</label>
                                <input id="firstName"/>
                            <td>
                            <td>
                              <div>
                                 <table tfsnestedtable>
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <label data-for="street">Street</label>
                                                <input id="street"/>
                                            <td>
                                        </tr>
                                    <tbody>
                                  </table>
                              <div>
                            <td>
                        </tr>
                       <tbody>
                    </table>`;
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(0);           
    });

     it('label in a parent dynamic table without data-for attribute should  result in an error', function(){
        var code = `<table tfsdata>
                       <thead></thead>
                       <tbody>
                        <tr>
                            <td>
                                <label for="firstName">First Name</label>
                                <input id="firstName"/>
                            <td>
                            <td>
                              <div>
                                 <table tfsnestedtable>
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <label data-for="street">Street</label>
                                                <input id="street"/>
                                            <td>
                                        </tr>
                                    <tbody>
                                  </table>
                              <div>
                            <td>
                        </tr>
                       <tbody>
                    </table>`;
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(1);
        expect(messages[0].rule.id).to.be(ruldId);       
    });
      it('label in a parent dynamic table and in nested table without data-for attribute should  result in an error', function(){
        var code = `<table tfsdata>
                       <thead></thead>
                       <tbody>
                        <tr>                            
                            <td>
                              <div>
                                 <table tfsnestedtable>
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <label for="street">Street</label>
                                                <input id="street"/>
                                            <td>
                                        </tr>
                                    <tbody>
                                  </table>
                              <div>
                            <td>
                            <td>
                                <label for="firstName">First Name</label>
                                <input id="firstName"/>
                            <td>
                        </tr>
                       <tbody>
                    </table>`;
        var messages = HTMLHint.verify(code, ruleOptions);
        expect(messages.length).to.be(2);
        expect(messages[0].rule.id).to.be(ruldId); 
        expect(messages[1].rule.id).to.be(ruldId);       
    });
});
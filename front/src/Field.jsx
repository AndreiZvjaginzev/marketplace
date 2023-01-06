import React from 'react';
import checks from './Checks.js';
import InputField from './Components/UI/InputField/InputField.jsx';
import TextareaField from './Components/UI/TextareaField/TextareaField.jsx';
import {onChangeFieldValidator} from './Validators/FormValidator/FormValidator';

export default class Field extends React.Component{
    name = '';
    placeholder= '';
    touch = false;
    valid = false;
    value = "";
    msg = "";
    checks =[];
   
    constructor(name, placeholder,touch, valid, value, props){
        super(props);
        if(
            name.length > 0 && typeof(name) == 'string'
            && placeholder.length > 0 && typeof(placeholder) == 'string'
            && typeof(touch) == 'boolean'
            && typeof(valid) == 'boolean'
            // && component !==null
          ){
            this.name = name;
            this.placeholder = placeholder;
            this.touch = touch;
            this.valid = valid;
            this.value = value;
            // this.component = component;
        }
       
        this.checksForInput(checks);
        
    }
    
    checksForInput(checks) {
        for(let check of checks){
            // console.log(check)
            for(let trigger of check.triggers){
                if(trigger == this.name){
                    this.checks.push(check);
                }
            }
        }
    }
    
    render(){
        // console.log(el)
        if(this.name == "email" || this.name == "name"){
            return (
                
                    <InputField
                        // refer={el.name}
                        placeholder={this.placeholder} 
                        type="text"
                        validator={onChangeFieldValidator}
                        fieldType={this.name}
                        // stateApp={props.stateApp}
                        // setStateApp={props.setStateApp}
                        // errorMessage={props.stateApp.validateInput.fields.fieldEmail.message}
                        // error={!props.stateApp.validateInput.fields.fieldEmail.valid && props.stateApp.validateInput.fields.fieldEmail.touch ? true : false}
                        // valid={!props.stateApp.validateInput.fields.fieldEmail.valid && props.stateApp.validateInput.fields.fieldEmail.touch ? true : false}
                    />
                
            )
        }

        if(this.name == "theme"){
            return (
                
                    <InputField
                        // refer={theme}
                        placeholder={this.placeholder}
                        type="text"
                        validator={onChangeFieldValidator}
                        fieldType={this.name}
                        // stateApp={props.stateApp}
                        // setStateApp={props.setStateApp}
                        // errorMessage={props.stateApp.validateInput.fields.fieldTheme.message}
                        // error={!props.stateApp.validateInput.fields.fieldTheme.valid && props.stateApp.validateInput.fields.fieldTheme.touch ? true : false}
                        // valid={!props.stateApp.validateInput.fields.fieldTheme.valid && props.stateApp.validateInput.fields.fieldTheme.touch ? true : false}
                    />
                
            )
        }
        if(this.name == "text"){
            return (
                
                    <TextareaField
                        // refer={text}
                        placeholder={this.placeholder}
                        validator={onChangeFieldValidator}
                        fieldType={this.name}
                        // stateApp={props.stateApp}
                        // setStateApp={props.setStateApp}
                        // errorMessage={props.stateApp.validateInput.fields.fieldTextarea.message}
                        // error={!props.stateApp.validateInput.fields.fieldTextarea.valid && props.stateApp.validateInput.fields.fieldTextarea.touch ? true : false}
                        // valid={!props.stateApp.validateInput.fields.fieldTextarea.valid && props.stateApp.validateInput.fields.fieldTextarea.touch ? true : false}
                        rows={5}
                    >
                    </TextareaField>
                
            )
        }
    } 
    
}
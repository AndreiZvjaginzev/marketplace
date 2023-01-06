import { useEffect } from "react";
import { onChangeFieldValidator } from "../../../Validators/FormValidator/FormValidator";
import Requests from "../../Requests";
import Button from "../../UI/Button/Button";
import InputField from "../../UI/InputField/InputField";
import InputFile from "../../UI/InputFile/InputFile";
import TextareaField from "../../UI/TextareaField/TextareaField";
import Styles from "./SendContactMessage.module.scss";
import React from 'react';
import FormPreloader from "../../UI/FormPreloader/FormPreloader";
import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";



function SendContactMessage(props){
    let name = React.createRef();
    let email = React.createRef();
    let theme = React.createRef();
    let text = React.createRef();
    let file = React.createRef();
    
    useEffect(()=>{
        let copy = Object.assign([], props.stateApp);
        
        copy.validateInput.fields = null;
        copy.validateInput.fields = [
                                    
                                    {id:1, name:"name", placeholder:"Ваше имя", type: "text", touch:false, valid: false, value: "", msg: "", checks: [], refer: name},
                                    {id:2, name:"email", placeholder:"Ваша почта", type: "text", touch:false, valid: false, value: "", msg: "", checks: [], refer: email },
                                    {id:3, name:"theme", placeholder:"Тема сообщения", type: "text", touch:false, valid: true, value: "", msg: "", checks: [], refer: theme },
                                    {id:4, name:"text", placeholder:"Ваше сообщение" , type: "text", touch:false, valid: false, value: "", msg: "", checks: [], refer: text, },
                                    {id:5, name:"file", placeholder:"", type: "file", touch:false, valid: true, value: null, msg: "", checks: [], refer: file },
                                    
                                ];
        
        props.setStateApp(copy);
        (async ()=>{
            try{
                await Auth();
            }
            catch(error){
                console.log(error);
            }
        })(); 
    }, []);

    function Auth() {
        Requests({
            method: 'post',
            url: '/user',
            data: {"token": (localStorage.getItem('token'))?localStorage.getItem('token'):null},
            callback: userStatus
        });
        
    }


    function userStatus(serverRequest){      
        if(serverRequest.code !== 401){
            if(serverRequest.name !== null){
                let responseName = serverRequest.name;
                let responseEmail = serverRequest.email;
                let copy = Object.assign([], props.stateApp)
                copy.auth.name = responseName;
                copy.auth.email = responseEmail;
                for(let field of copy.validateInput.fields){
                    if(field.name === "name"){
                        field.value = responseName;
                        field.refer.current.value = responseName;
                        field.valid = true;
                        field.touch = true;
                    }
                    if(field.name === "email"){
                        field.value = responseEmail;
                        field.refer.current.value = responseEmail;
                        field.valid = true;
                        field.touch = true;
                    }
                }
                props.setStateApp(copy);
                console.log(copy)
            }
        }
        
    }


    async function sendMsg() {
        let copy = Object.assign([], props.stateApp)
        copy.preloader.isFetch = true;
        props.setStateApp(copy)
        let sendObj = {email:"", name:"", theme:"", text:"", file:null};  
        for(let field of props.stateApp.validateInput.fields){
            if(field.name === "name"){
                sendObj.name = field.value;
            }
            if(field.name === "email"){
                sendObj.email = field.value;
            }
            if(field.name === "theme"){
                sendObj.theme = field.value;
            }
            if(field.name === "text"){
                sendObj.text = field.value;
            }
            if(field.name === "file"){
                sendObj.file = field.value;
            }
        }
        console.log(sendObj)
        Requests({
            method: 'postfile',
            url: '/send-message',
            data: {
                email: sendObj.email,
                name: sendObj.name,
                theme: sendObj.theme,
                text: sendObj.text,
                file: sendObj.file, 
            },
            callback: await sendStatus
        });
    }
    function sendStatus(serverRequest){
        console.log(serverRequest)
        let copy = Object.assign([], props.stateApp)
        if(serverRequest.response !== undefined){
            if(serverRequest.response.status === 422){
                console.log("error")
                copy.msg = serverRequest.response.data.message;
            }
            if(serverRequest.response.status === 500){
                copy.msg = "Упс у нас проблема на сервере, но мы уже исправляем ее";
            } 
        } 
        else{
            copy.msg = serverRequest.msg; 
            if(serverRequest.code === '200'){
                copy.appeal.success = true;
                copy.appeal.data = serverRequest.data;
                
            }
        }
        for(let field of copy.validateInput.fields){
            field.value = "";
            field.touch = false;
            if(field.name === "name" || field.name === "email" || field.name === "text"){
                field.valid = false;
            }
            if(field.name === "file"){
                field.value = null;
            }
            field.refer.current.value = "";
        }
        copy.validateInput.formButton = false;
        copy.preloader.isFetch = false;
        props.setStateApp(copy);
        console.log(copy)  
        
    }
    
    function renderInput(el){
        if(el.name == "email" || el.name == "name"){
            return (
                <div className={Styles.SendContactMessageEmail} key={el.id}>
                    <InputField
                        refer={el.refer}
                        placeholder={el.placeholder} 
                        type={el.type}
                        validator={onChangeFieldValidator}
                        fieldType={el}
                        stateApp={props.stateApp}
                        setStateApp={props.setStateApp}
                    />
                </div>
            )
        }

        if(el.name == "theme"){
            return (
                <div className={Styles.SendContactMessageInput} key={el.id}>
                    <InputField
                        refer={el.refer}
                        placeholder={el.placeholder}
                        type={el.type}
                        validator={onChangeFieldValidator}
                        fieldType={el}
                        stateApp={props.stateApp}
                        setStateApp={props.setStateApp}
                    />
                </div>
            )
        }
        if(el.name == "text"){
            return (
                <div className={Styles.SendContactMessageInput} key={el.id}>
                    <TextareaField
                        refer={el.refer}
                        placeholder={el.placeholder}
                        validator={onChangeFieldValidator}
                        fieldType={el}
                        stateApp={props.stateApp}
                        setStateApp={props.setStateApp}
                        rows={5}
                    >
                    </TextareaField>
                </div>
            )
        }
        if(el.name == "file"){
            return (
                <div className={Styles.SendContactMessageInput} key={el.id}>
                    <InputFile
                        refer={el.refer}
                        type={el.type}
                        id="file_input"
                        accept="image/*"
                        validator={onChangeFieldValidator}
                        fieldType={el}
                        stateApp={props.stateApp}
                        setStateApp={props.setStateApp}
                    />
                </div> 
            )
        }
    } 

    function dragStartHandler(evt){
        evt.preventDefault();
        let copy = Object.assign([], props.stateApp);
        copy.drag = true;
        props.setStateApp(copy);
    }
    function dragLeaveHandler(evt){
        evt.preventDefault();
        let copy = Object.assign([], props.stateApp);
        copy.drag = false;
        props.setStateApp(copy);
    }
    function onDropHandler(evt){
        evt.preventDefault();
        let file = evt.dataTransfer.files;
        console.log(file)
        let copy = Object.assign([], props.stateApp);
        copy.drag = null;
        props.setStateApp(copy);
    }

    function renderResponseMessage(){
        if(props.stateApp.msg != null){
            return (
                        <div className={Styles.responeGroup}>
                            <p className={Styles.errorAuth}>{props.stateApp.msg}</p>
                            {
                                (props.stateApp.appeal.success)
                                    ?<div className={Styles.Chatredirect}>
                                        {
                                            props.stateApp.appeal.data.user_email  + ' на этот адрес мы вышлем ответ'
                                        }
                                        <NavLink className={Styles.chatLink} to={`../appeal/${props.stateApp.appeal.data.id}`}>Перейти в чат</NavLink>
                                    </div>
                                    
                                    // (props.stateApp.appeal.data.user_email !== null) 
                                    //     ?<NavLink className={Styles.chatLink} to={`../appeal/${props.stateApp.appeal.data.id}`}>Перейти в чат</NavLink>
                                    //     :<NavLink onClick={(evt)=>registerAppealUser(evt, props.stateApp.appeal.data)} className={Styles.chatLink} to={`../appeal/${props.stateApp.appeal.data.id}`}>Зарегистрироваться и перейти в чат</NavLink>
                                    :''       
                            }
                            
                        </div>
                    )
        }          
    }

    async function registerAppealUser(evt, appeal){
        evt.preventDefault();
        Requests({
            method: 'post',
            url: '/register-appeal-user',
            data: {
                email: appeal.email,
                name: appeal.name,
            },
            callback: await sendUser
        });
    }

    function sendUser(serverRequest){
        console.log(serverRequest);
    }


    return (
        
        <div className={Styles.SendContactMessage}>
            <div className={Styles.SendContactMessageWrap}>
                <h2 className={Styles.SendContactMessageHeader}>Связаться с технической поддержкой</h2>
                <div className={Styles.SendContactMessageInputGroup}>
                    {
                        props.stateApp.validateInput.fields.map((el)=>{
                            if(el.name == "name" || el.name == "email"){
                                return (
                                    renderInput(el)
                                )
                            }
                        })
                    }
                </div>
                {
                    props.stateApp.validateInput.fields.map((el, index)=>{
                        if(el.name == "theme" || el.name == "text" || el.name == "file"){

                            return (
                                renderInput(el)
                            )
                        }
                    })
                }
                {
                    // (props.stateApp.drag)
                    // ? <div className={Styles.droparea}
                    //         onDragStart={(evt)=>dragStartHandler(evt)}
                    //         onDragLeave={(evt)=>dragLeaveHandler(evt)}
                    //         onDragOver={(evt)=>dragStartHandler(evt)}
                    //         onDrop={(evt)=>onDropHandler(evt)}
                    //   >
                    //     Отпустите файл
                    //   </div>
                    // : <div className={Styles.droparea}
                    //     onDragStart={(evt)=>dragStartHandler(evt)}
                    //     onDragLeave={(evt)=>dragLeaveHandler(evt)}
                    //     onDragOver={(evt)=>dragStartHandler(evt)}
                    //   >
                    //     Перетащите файл
                    //   </div>
                }
                {
                    // if(props.stateApp.msg != null || props.stateApp.appeal.success)
                    //  {   
                        renderResponseMessage()   
                    //   }
                    // <div className={Styles.responeGroup}>
                    //     <p className={Styles.errorAuth}>{props.stateApp.msg}</p>
                    //     {
                    //     (props.stateApp.auth.name !== null && props.stateApp.auth.email !== null) 
                    //     ?<NavLink className={Styles.chatLink} to={`../appeal/${props.stateApp.appeal.data}`}>Перейти в чат</NavLink>
                    //     :<NavLink className={Styles.chatLink} to={`../appeal/${props.stateApp.appeal.data}`}>Зарегистрироваться и перейти в чат</NavLink>
                    //     }
                        
                    //   </div>
                    // : ''
                }
                <div onClick={ sendMsg } className={Styles.SendBtn}>
                    <FormPreloader stateApp={props.stateApp} setStateApp={props.setStateApp}/>
                    <Button myClass='ButtonLogin' isValidated={props.stateApp.validateInput.formButton}>Отправить сообщение</Button>
                </div>
            </div>
        </div>
    );
}

export default SendContactMessage;
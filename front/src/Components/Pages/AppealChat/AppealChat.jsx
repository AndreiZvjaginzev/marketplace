import Styles from './AppealChat.module.scss';
import InputField from '../../UI/InputField/InputField';
import InputFile from '../../UI/InputFile/InputFile';
import Button from '../../UI/Button/Button';
import Requests from '../../Requests';
import { onChangeFieldValidator } from './../../../Validators/FormValidator/FormValidator';
import { useEffect } from "react";
import React from 'react';
import Preloader from "../../UI/Preloader/Preloader"
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Echo from 'laravel-echo'
import Pusher from 'pusher-js';

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: '686ae50f3d45a0c7441e',
  cluster: 'eu',
  forceTLS: true, 
  encrypted: true,
  wsHost: window.location.hostname,
  wsPort: 6001,
  authEndpoint: "/broadcasting/auth",
});


 
window.Pusher = Pusher;
 
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });

// var channel = Echo.channel('appeal.{appealId}');
// channel.listen('.my-event', function(data) {
//   alert(JSON.stringify(data));
// });


function AppealChat(props) {
    let text = React.createRef();
    let file = React.createRef();
    window.Echo.private('appeal.' + props.stateApp.appeal.data.id).listen('.chat', function(data) {
        console.log(data);
    });
    console.log(props.stateApp)
    useEffect(()=>{
        let copy = Object.assign([], props.stateApp);
        copy.appeal.data = props.stateApp.appeal.data;
        copy.validateInput.fields = null;
        copy.validateInput.fields = [
                                    {id:1, name:"text", placeholder:"Введите сообщение", type: "text", touch:false, valid: false, value: "", msg: "", checks: [], refer: text,},                                    
                                    {id:2, name:"file", placeholder:"", type: "file", touch:false, valid: true, value: null, msg: "", checks: [] , refer: file,},
                                    
                                ];
        
        props.setStateApp(copy);
    }, [])
    
    console.log(window.Echo);
    // console.log(window.Pusher);

  

    function renderInput(el){
       if(el.name == 'text'){
        return (
                <div key={el.id}>
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
       if(el.name == 'file'){
        return (
            <div key={el.id}>
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

    async function sendMsg() {
        let copy = Object.assign([], props.stateApp)
        copy.preloader.isFetch = true;
        props.setStateApp(copy)
        let sendObj = { parent_id: null, text:"", file:null, author: null};  
        for(let field of props.stateApp.validateInput.fields){
            if(field.name === "text"){
                sendObj.text = field.value;
            }
            if(field.name === "file"){
                sendObj.file = field.value;
            }
        }
        for(let message of props.stateApp.appeal.data.messages){
            sendObj.parent_id = message.id;
        }
        if(props.stateApp.auth.email !==null){
            sendObj.author = props.stateApp.auth.email;
        }
        else{
            sendObj.author = props.stateApp.appeal.data.user_email;
        }
        console.log(sendObj)
        try{
            Requests({
                method: 'postfile',
                url: '/answer-message',
                data: {
                    appeal_id: props.stateApp.appeal.data.id,
                    parent_id: sendObj.parent_id,
                    author: sendObj.author,
                    text: sendObj.text,
                    file: sendObj.file,
                },
                callback: await sendStatus
            });
        }
        catch(error){
            console.log(error)
        }

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
                copy.appeal.data.messages.push(serverRequest.data);
                
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
            console.log(field.refer.current)
            field.refer.current.value = "";
        }
        copy.validateInput.formButton = false;
        copy.preloader.isFetch = false;
        props.setStateApp(copy);
        console.log(copy)  
        
    }

    return (
        <div className={Styles.AppealChat}>
            {
                (props.stateApp.appeal.data != null)
                ?
                <div className={Styles.ChatWrap}>
                    <div className={Styles.ChatHeader}>
                        <span className={Styles.ChatHeaderAppel}>Обращение от</span>
                        <span className={Styles.ChatHeaderFrom}>{` ${props.stateApp.appeal.data.user_email}`}</span>
                    </div>
                    <div className={Styles.ChatMessages}>
                        {
                            props.stateApp.appeal.data.messages.map((message)=>{
                                return (
                                  
                                    <span key={message.id} className={
                                        (message.autor_email == props.stateApp.appeal.data.user_email)
                                                            ?Styles.ChatMessage
                                                            :Styles.ChatMessageAnswer
                                        }>
                                        <div>{message.autor_email}</div>    
                                        <div className={Styles.Message}>{message.text}</div>    
                                    </span>
                                )
                            })
                        }
                        
                    </div>
                    {
                        props.stateApp.validateInput.fields.map((input)=>{
                            return renderInput(input)
                        })
                    }
                    <div onClick={ sendMsg } className={Styles.SendBtn}>
                        <Button myClass='ButtonLogin' isValidated={props.stateApp.validateInput.formButton}>Ответить</Button>
                    </div>
                </div>
                :<NavLink to='/'>Упс что-то пошло не так вернуться на главную</NavLink>
            }
        </div>
    );
}

export default AppealChat;
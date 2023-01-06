import Styles from './Auth.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import logo_form from '../../.././images/logo-form.svg';
import InputField from '../../UI/InputField/InputField';
import Button from '../../UI/Button/Button';
import Checkbox from '../../UI/Checkbox/Checkbox';
import FooterMenu from '../../UI/FooterMenu/FooterMenu';
import Requests from '../../Requests';
import Community from '../../Pages/Community/Community';
import { onChangeFieldValidator } from './../../../Validators/FormValidator/FormValidator';
import { useEffect } from "react";
import Preloader from "../../UI/Preloader/Preloader"

function Auth(props) {
    let stateApp = props.stateApp;
    let setStateApp = props.setStateApp;
    let validateInput = stateApp.validateInput;
    
    useEffect(()=>{
        let copy = Object.assign([], stateApp);
        copy.msg = '';
        copy.validateInput.fields = null;
        copy.validateInput.fields = [
                                    {id:2, name:"email", placeholder:"Ваша почта", type: "text", touch:false, valid: false, value: "", msg: "", checks: [], icon: faUser},                                    
                                    {id:1, name:"password", placeholder:"Введите пароль", type: "password", touch:false, valid: false, value: "", msg: "", checks: [], icon: faKey},
                                    
                                ];
        
        setStateApp(copy);
    }, [])
    function onAuth() {
        let sendObj = {email:"", password:""};  
        for(let field of props.stateApp.validateInput.fields){
            if(field.name === "password"){
                sendObj.password = field.value;
            }
            if(field.name === "email"){
                sendObj.email = field.value;
            }
        }
        Requests({
            method: 'post',
            url: '/login',
            data: {
                email: sendObj.email,
                password: sendObj.password
            },
            callback: authStatus
        });
    }

    function authStatus(serverRequest){
        if(serverRequest.data.token){
            localStorage.setItem('token', serverRequest.data.token);
            let copy = Object.assign([], stateApp);

            copy.auth.token = serverRequest.data.token;
            setStateApp(copy);
            console.log(copy);
        }
        if(serverRequest.msg){
            let copy = Object.assign([], stateApp);
            copy.msg = serverRequest.msg;
            setStateApp(copy);
            console.log(copy)

        }
    }

    function renderInput(el){
       
            return (
                <div key={el.id}>
                    <div className={Styles.icon}>
                        <FontAwesomeIcon icon={el.icon} />
                    </div>
                    <InputField
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

    return (
        <div className={Styles.Auth}>
            <div className={Styles.AuthWrap}>
                <div className={Styles.info}>
                    <Community/>

                </div>
                <div className={Styles.AuthFormWrap}>
                    <img className={Styles.logo} src={logo_form} />
                    <h3>Welcome</h3>
                    <p>Join gazillions of people online</p>

                    <div className={Styles.AuthForm}>
                        <Preloader stateApp={stateApp} setStateApp={setStateApp}/>
                        {
                            stateApp.validateInput.fields.map((el)=>{
                                    return (
                                        renderInput(el)
                                    )
                            })
                        }
                            {/* <div className={Styles.icon}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <InputField 
                                placeholder="email"
                                type="text"
                                validator={onChangeFieldValidator}
                                fieldType={'fieldEmail'}
                                stateApp={stateApp}
                                setStateApp={setStateApp}
                                errorMessage={validateInput.fields.fieldEmail.message}
                                error={!validateInput.fields.fieldEmail.valid && validateInput.fields.fieldEmail.touch ? true : false}
                                valid={!validateInput.fields.fieldEmail.valid && validateInput.fields.fieldEmail.touch ? true : false}
                            />
                       
                            <div className={Styles.icon}>
                                <FontAwesomeIcon icon={faKey} />
                            </div>
                            <InputField 
                                placeholder="password" 
                                type="password"
                                validator={onChangeFieldValidator}
                                fieldType={'fieldPassword'}
                                stateApp={stateApp}
                                setStateApp={setStateApp}
                                errorMessage={validateInput.fields.fieldPassword.message}
                                error={!validateInput.fields.fieldPassword.valid && validateInput.fields.fieldPassword.touch ? true : false}
                                valid={!validateInput.fields.fieldPassword.valid && validateInput.fields.fieldPassword.touch ? true : false}
                            /> */}
                            {stateApp.msg != null ? <p className={Styles.errorAuth}>{stateApp.msg}</p> : ''}

                        <div className={Styles.checkBlock}>
                            <Checkbox />
                            <p>Lost Password?</p>
                        </div>
                        <div onClick={ onAuth } className={Styles.AuthBtn}>
                            <Button myClass='ButtonLogin' isValidated={validateInput.formButton}>Log into your account</Button>
                        </div>
                        
                        <p className={Styles.registration}>Registration</p>
                    </div>
                </div>
            </div>

            <FooterMenu />
        </div>
    );
}

export default Auth;
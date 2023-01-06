import '../../../App.css';
import Auth from '../Auth/Auth';
import { useState } from 'react';
import MainLayout from '../../Layouts/MainLayout/MainLayout';
import Styles from './Login.module.scss';
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Preloader from '../../UI/Preloader/Preloader';


function Login(props) {
    const navigate = useNavigate();
    let stateApp = props.stateApp;
    let setStateApp = props.setStateApp;

    return (
        <div className={Styles.Login}>

            <Preloader stateApp={stateApp} setStateApp={setStateApp}/>
            <MainLayout>

                {
                    (/*!switchLoginStatus() || */stateApp.auth.token == null) ? <Auth stateApp={stateApp} setStateApp={setStateApp} /> : <Navigate to="admin"/>
                }

            </MainLayout>
         </div>
    );
}
export default Login;
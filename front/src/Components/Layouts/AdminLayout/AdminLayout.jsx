import { useEffect } from "react";
import Requests from "../../Requests";
import { Navigate, useNavigate } from "react-router-dom";

import Styles from './AdminLayout.module.scss'
import { useState } from "react";
import Preloader from "../../UI/Preloader/Preloader";





function AdminLayout(props){
    // const navigate = useNavigate();

    // function userStatus(serverRequest){
    //     console.log(serverRequest.token)
        
    //     if(serverRequest.code == 401){
    //         navigate('/');
    //     }

    // }
    
    // useEffect(()=>{
        
    //     Requests({
    //         method: 'post',
    //         url: '/user',
    //         data: {"token": (localStorage.getItem('token'))?localStorage.getItem('token'):null},
    //         callback: userStatus
    //     });
    // }, []);

    return (

        <div className={Styles.AdminLayout}>
            {/* админка */}
            
            <div className={Styles.GridWrap}>
                {
                props.children.map((el, index)=>{
                    // console.log(el.props.gridClass)
                    return(
                        <div key={index} className={Styles[el.key]}>{el}</div>     
                        )
                })
                }

            </div>
            
        </div>
    );
}

export default AdminLayout;
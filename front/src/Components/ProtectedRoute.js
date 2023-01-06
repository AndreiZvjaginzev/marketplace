import {
    Navigate,
    Outlet,
  } from 'react-router-dom';

import Requests from "./Requests";
import React, { useEffect, useState } from 'react';
import Preloader from './UI/Preloader/Preloader';



  const ProtectedRoute  = ({ stateApp, setStateApp })=> {
    let [loadState, setLoadstate] = useState('loading');
    let [auth, setauth] = useState();
    useEffect(()=>{
      let copy = Object.assign([], stateApp);
      copy.preloader.isFetch = true;
      setStateApp(copy);
      (async ()=>{
        setLoadstate('loading');
        
        try{
          await Auth();
          if(auth){
            copy.preloader.isFetch = false;
            setStateApp(copy);
            setLoadstate('success');
          }
          if(!auth){
            copy.preloader.isFetch = false;
            setStateApp(copy);
            setLoadstate('nonauth');
          }
          if(auth == undefined){
            copy.preloader.isFetch = true;
            setStateApp(copy);
            setLoadstate('loading');
          }
        }
        catch(error){
          setLoadstate('error');
          // console.log(loadState)
        }
      })();
      
    }, [loadState, auth]);
    function Auth() {
      Requests({
          method: 'post',
          url: '/user',
          data: {"token": (localStorage.getItem('token'))?localStorage.getItem('token'):null},
          callback: userStatus
      });
  
      function userStatus(serverRequest){
        // console.log(serverRequest)
        if(serverRequest.code === 401){
          setauth(false);
        }
        else{
          setauth(true);
          let copy = Object.assign([], stateApp);
          if(serverRequest.name !== null){
            copy.auth.name = serverRequest.name;
          }
          if(serverRequest.image_path !== null){
            copy.auth.image_path = serverRequest.image_path;
          }
          if(serverRequest.roles !== null){
            copy.auth.roles = serverRequest.roles;
          }
          copy.auth.email = serverRequest.email;
          setStateApp(copy);
        }
      }
    };
    return(
      <div>
      {
      
      (loadState === 'success')?
        <Outlet />
      :
      (loadState === 'nonauth')?
        <Navigate to='/' />
        :
        <Preloader stateApp={stateApp} setStateApp={setStateApp}/>
      }
    </div>
    );
    
    

  };

  export default ProtectedRoute;
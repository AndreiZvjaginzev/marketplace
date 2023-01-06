import { useState } from 'react';
import Requests from "../../../Requests";
import AdminLayout from "../../../Layouts/AdminLayout/AdminLayout";
import ShopCard from "../../../Widgets/ShopCard/ShopCard";
import ShopNavigateWidgets from "../../../Widgets/ShopNavigateWidgets/ShopNavigateWidgets";
import UserCardLittleWidget from "../../../Widgets/UserCardLittleWidget/UserCardLittleWidget";
import Styles from './Dashboard.module.scss';
import WidgetsLayout from "../../../Layouts/WidgetsLayout/WidgetsLayout";
import state from './../../../../State';
import { useEffect } from 'react';
import AppealControlWidjet from '../../../Widgets/AppealControlWidjet/AppealControlWidjet';

function Dashboard(props){
    const [widgets, setWidgets] = useState(
        {id:1, name: 'leftasideinfo', childwidgets:[
            {}
        ]},
        {id:2, name: 'leftasidenavigate', childwidgets:[]},
        {id:3, name: 'headersearch', childwidgets:[]},
        {id:4, name: 'headersocial', childwidgets:[]},
        {id:5, name: 'main', childwidgets:[]},
        {id:6, name: 'banner', childwidgets:[]},
        {id:7, name: 'chat', childwidgets:[]},
    );
        
    const [userInfo, setUserInfo] = useState({});
    // useEffect(() => {
        // Requests({
        //     method: 'post',
        //     url: '/user',
        //     data: {"token": (localStorage.getItem('token'))?localStorage.getItem('token'):null},
        //     callback: userStatus
        // });
    
        // function userStatus(serverRequest){
        //   if(serverRequest.code === 401){
          
        //   }
        //   else{
            
        //     let copy = Object.assign([], props.stateApp);
        //     copy.auth.name = serverRequest.name;
        //     copy.auth.email = serverRequest.email;
        //     props.setStateApp(copy);
        //     console.log(copy)
        //   }
        // }
    // }, []);

            // console.log(props.stateApp)
    
    return (
        
        <AdminLayout stateApp={props.stateApp} setStateApp={props.setStateApp}>
            {
                [
                    <WidgetsLayout key='leftasideinfo'>
                        {
                            [//массив для размещения виджетов в левой верхней ячейке
                               <UserCardLittleWidget key='UserCardLittleWidget' stateApp={props.stateApp} setStateApp={props.setStateApp}/> 
                            ]
                            
                        } 
                    </WidgetsLayout>,
                    <WidgetsLayout key='leftasidenavigate'>
                        {
                            [//массив для размещения виджетов в левой нижней ячейке
                                <ShopNavigateWidgets key='ShopNavigateWidgets'/> 
                            ]
                           
                        }
                        
                    </WidgetsLayout>,
                    
                    <WidgetsLayout key='headersearch'>
                        {
                            [

                            ]
                        }
                    </WidgetsLayout>,
                    <WidgetsLayout key='headersocial'>
                        {
                            [

                            ]
                        }
                    </WidgetsLayout>,
                    <WidgetsLayout key='main'>
                        {
                            [
                                <ShopCard key='ShopCard'/>  
                            ]
                           
                        } 
                    </WidgetsLayout>,
                    <WidgetsLayout key='banner'>
                        {
                            [
                                <AppealControlWidjet key='AppealControlWidjet' stateApp={props.stateApp} setStateApp={props.setStateApp}/>
                            ]
                        }
                    </WidgetsLayout>,
                    <WidgetsLayout key='chat'>
                        {
                            [

                            ]
                        }
                    </WidgetsLayout>,
                    // <UserCardLittleWidget gridclass='leftasideinfo'/>,
                    
                    // <ShopNavigateWidgets gridclass='leftasidenavigate'/>,
                    // <ShopCard gridclass='main'/>,
                    // <div gridclass='headersearch'></div>,
                    // <div gridclass='headersocial'></div>,
                    // <div gridclass='banner'></div>,
                    // <div gridclass='chat'></div>,  
                ]
            }
                

        </AdminLayout>

    );
}

export default Dashboard;
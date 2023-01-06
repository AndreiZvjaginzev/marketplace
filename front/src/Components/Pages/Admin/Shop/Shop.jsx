import UserCardLittleWidget from "../../../Widgets/UserCardLittleWidget/UserCardLittleWidget";
import GraphOrders from "../../../Widgets/GraphOrdersWidget/GraphOrdersWidget";
import UrlShopWidgets from "../../../Widgets/UrlShopWidgets/UrlShopWidgets";
import ShopWidgets from '../../../Widgets/ShopWidgets/ShopWidgets';

import Requests from "../../../Requests";

import Styles from './Shop.module.scss';
import { useState, useEffect } from "react";

function Shop(props){
    const [authUser, setAuthUser] = useState(null)
    useEffect(() => {
        Requests({
            method: 'get',
            url: '/get-auth-user',
            callback: getUser
        })
    }, [])

    const getUser = (response) => {
        setAuthUser(response)
    }
    return (

        // <AdminLayout stateApp={props.stateApp} setStateApp={props.setStateApp}>
        //     {
        //         [
        //             <WidgetsLayout key='leftasideinfo'>
        //                 {
        //                     [//массив для размещения виджетов в левой верхней ячейке
        //                        <UserCardLittleWidget key='UserCardLittleWidget'/> 
        //                     ]
                            
        //                 } 
        //             </WidgetsLayout>,
        //             <WidgetsLayout key='leftasidenavigate'>
        //                 {
        //                     [//массив для размещения виджетов в левой нижней ячейке
        //                         <ShopNavigateWidgets shopId={params.shopId} key='ShopNavigateWidgets'/>, 
        //                     ]
                           
        //                 }
                        
        //             </WidgetsLayout>,
                    
        //             <WidgetsLayout key='headersearch'>
        //                 {
        //                     [

        //                     ]
        //                 }
        //             </WidgetsLayout>,
        //             <WidgetsLayout key='headersocial'>
        //                 {
        //                     [

        //                     ]
        //                 }
        //             </WidgetsLayout>,
        //             <WidgetsLayout key='main'>
        //                 {
        //                     [
        //                         <UrlShopWidgets  key='UrlShopWidgets'/>,

        //                         <GraphOrders key='GraphOrders'/>,   
        //                     ]
                           
        //                 } 
        //             </WidgetsLayout>,
        //             <WidgetsLayout key='banner'>
        //                 {
        //                     [

        //                     ]
        //                 }
        //             </WidgetsLayout>,
        //             <WidgetsLayout key='chat'>
        //                 {
        //                     [

        //                     ]
        //                 }
        //             </WidgetsLayout>,

        //         ]
        //     }
            
        // </AdminLayout>

        <div className={Styles.Shop}>
            <UserCardLittleWidget key='UserCardLittleWidget' stateApp={props.stateApp} setStateApp={props.setStateApp}/> 
            {/* <ShopNavigateWidgets shopId={shopId} key='ShopNavigateWidgets'/> */}
            <UrlShopWidgets />
            {authUser ? <ShopWidgets user={authUser} /> : null}
            
        </div>

    );
}

export default Shop;
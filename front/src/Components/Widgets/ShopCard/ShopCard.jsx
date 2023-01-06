import React, { useState, useEffect } from 'react';
import Requests from '../../Requests';
import Styles from './ShopCard.module.scss';
import img from '../../../images/gum.jpg';
import { NavLink } from 'react-router-dom';

function ShopCard(){
    
    useEffect(
        () => {
          Requests({
            method: 'get',
            url: '/shops',
            callback: getShops
          })}
        ,[]
    );

    let [shopsInfo, shopsInfoSetstate] = useState([]); 
    function getShops(serverRequest){
        if(serverRequest){
            let copy = [];
            copy = serverRequest.data;
            let copyShops =[];
            copy.map((el)=>{
                copyShops.push(el);
            })
            shopsInfoSetstate(copyShops);
           
        }
        
    }

    function rendershops(shops){
        return(
            <li className={Styles.card} key={shops.id}>
                <div className={Styles.itemAvatar}>
                    <a href="#">
                        <img className={Styles.avatar} src={require('../../../images/' + shops.img)}/>
                    </a>
                </div>
                <div className={Styles.item}>
                    <div className={Styles.itemBlock}>
                        <h4 className={Styles.title}>
                            <NavLink to={"/admin/shop/"+ shops.id}>{shops.name}</NavLink>
                        </h4>
                        <p className={Styles.description}>{shops.description}</p>
                        <div className={Styles.shopBtn}>
                            <NavLink to={"/admin/shop/"+ shops.id} className={Styles.shopLink}>Shop</NavLink>
                        </div>
                        
                    </div>
                </div>
            </li>
        );
    }

    return (
        <div className={Styles.ShopCard}> 
            <ul className={Styles.cardItem}>
            {
                shopsInfo.map((shop)=>{ 
                    return( 
                        rendershops(shop)
                    )
                })
            }
                <li className={Styles.card}>
                    <div className={Styles.add}></div>
                </li>
            </ul>
        </div>
    );
}

export default ShopCard;
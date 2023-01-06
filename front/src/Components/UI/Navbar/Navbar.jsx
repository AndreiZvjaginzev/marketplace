import Styles from './Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Requests from '../../Requests';
import menulinks from './Menulinks';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo/Logo';




function Navbar(props) {

  // useEffect(
  //   () => {
  //     Requests({
  //       method: 'get',
  //       url: '/get-menu-links',
  //       callback: getlinks
  //     })}
  //   ,[]
  // );

  let [menuLinks, menuLinksSetstate] = useState(menulinks);

  // function getlinks(serverRequest){

  //   if(serverRequest){
  //     // let copy = Object.assign([], menuLinks);
  //     let copy=[];
  //     copy = serverRequest.data;
  //     let copyMainLinks =[];
  //     copy.map((el)=>{
  //       el.status = false;
  //       el.children =[];
        
  //       copy.map((childelem, index)=>{
  //         if(childelem.parent_id !== null && childelem.parent_id === el.id){
  //           el.children.push(childelem);
  //         }
  //       })
        
  //       if(el.parent_id === null){
  //           copyMainLinks.push(el);
  //         } 
  //     })
  //     console.log(copyMainLinks)
  //     menuLinksSetstate(copyMainLinks);
      
  //   }
  // }


  function renderlinks(link){

    return(
          
          <li key={link.id} className={Styles.NavbarWrap_menulist_item} onClick={()=>toggleNavbarlist(link.id)}>
              <NavLink to={link.route} className={(link.children.length > 0)
                ?Styles.NavbarWrap_menulist_item_link + " " + Styles.ShowSubcategoruCross
                :Styles.NavbarWrap_menulist_item_link
              }>
                {link.name}
              </NavLink>
            {
              (link.children.length > 0)
              ?<ul className={
                    (link.status)
                      ?Styles.NavbarWrap_menulist_item_dropdown + ' ' + Styles.show
                      :Styles.NavbarWrap_menulist_item_dropdown
                }>
                    {
                      link.children.map((childlink) => {
                          return (
                            renderlinks(childlink)
                          )
                      })
                    }
                </ul>
              :
              ""
            }
          </li>
    )

    
  }
  //функция для закрытия бокового меню 
  function hideNavbar(){
    props.active[1](false);
  }

  //функция для показа\скрытия вложенных элементо меню
  function toggleNavbarlist(id){
    let copy = Object.assign([], menuLinks);
    copy.map((el)=>{
      if(el.id == id && el.status == false){
        el.status = true;
      }
      else{
        el.status = false;
      }
    })
    menuLinksSetstate(copy);
    
  }

  return (
    <div className={
        (props.active[0])
          ?Styles[props.myClass] + ' ' + Styles.active
          :Styles[props.myClass]
    }>
      <div className={Styles.Navbutton} onClick={()=>{hideNavbar()}}>
        <Button>
          <FontAwesomeIcon icon={faXmark} /> 
        </Button>
      </div>
      <div className={Styles.NavbarWrap}>
        <h5 className={Styles.NavbarWrap_Header}>Main Menu</h5>
        <Logo logo={props.logo} 
          stateApp={props.stateApp} setStateApp={props.setStateApp}
          myClass={
            (props.myClass == "Navbar")
              ? "hide"
              : "Logo"
          }
        />
        <ul className={Styles.NavbarWrap_menulist}>

        {
          menuLinks.map((link)=>{ 
              return( 
                renderlinks(link)
              )
          })
        }
        </ul>

        <div className={Styles.login}>
          <NavLink to="" className={Styles.cabinet}>
            <FontAwesomeIcon icon={faBagShopping} className={Styles.cart}/>
          </NavLink>
          <NavLink to="/admin" className={Styles.cabinet}>Login</NavLink>
        </div>
      </div>
        
    </div>
  );
}

export default Navbar;

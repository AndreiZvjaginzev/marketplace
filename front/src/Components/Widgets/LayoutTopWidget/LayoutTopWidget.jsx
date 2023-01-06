import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faBell, faEnvelope, faCartShopping } from '@fortawesome/free-solid-svg-icons';

import SearchField from './../../UI/SearchField/SearchField';
import Requests from './../../Requests';
import state from './../../../State';

import Styles from './LayoutTopWidget.module.scss';
import Preloader from '../../UI/Preloader/Preloader';


const LayoutTopWidget = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [stateApp, setStateApp] = useState(state);
  let onClicked = () => isClicked ? setIsClicked(false) : setIsClicked(true);

  useEffect(
    () => {
      Requests({
        method: 'get',
        url: '/get-auth-user',
        callback: getUser
      })
    }, []
  );

  function getUser(response) {
    let copy = [];
    copy = response;
    setUserInfo(copy);
  }

  function renderUlList(userInfo) {

    if(userInfo != 0) {
      return (
        <ul>
          <li><a href="#"><FontAwesomeIcon icon={faUserPlus} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faBell} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faEnvelope} /></a></li>
          <li><a href="#"><FontAwesomeIcon icon={faCartShopping} /></a></li>
          <li className={Styles.dropDown}>
            <a href="#" onClick={onClicked}><img src={userInfo.image_path} alt="user" /> <span>@ user</span></a>
            <ul className={`${Styles.dropDown__items} ${isClicked ? Styles.show : ''}`}>
              <li className={Styles.dropDown__item}><a href="#">Shop</a></li>
              <li className={Styles.dropDown__item}><a href="#">Profile</a></li>
              <li className={Styles.dropDown__item}><a href="#">Friends</a></li>
              <li className={Styles.dropDown__item}><a href="#">Groups</a></li>
              <li className={Styles.dropDown__item}><a href="#">Forums</a></li>
            </ul>
            </li>
        </ul>
      );
    } else {
      return <Preloader stateApp={stateApp} setStateApp={setStateApp}/>
    }
  }

  return (
    <div className={Styles.LayoutTopWidget}>
      <SearchField />
      {renderUlList(userInfo)}
    </div>
  )
};

export default LayoutTopWidget;
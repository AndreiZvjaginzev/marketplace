import { useState, useEffect } from 'react';

import Requests from './../../../Requests';
import state from './../../../../State';
import Preloader from './../../../UI/Preloader/Preloader';

import AdminLayout from '../../../Layouts/AdminLayout/AdminLayout';
import ProfileTopWidget from '../../../Widgets/ProfileTopWidget/ProfileTopWidget';
import UserCardLittleWidget from '../../../Widgets/UserCardLittleWidget/UserCardLittleWidget';
import LayoutTopWidget from '../../../Widgets/LayoutTopWidget/LayoutTopWidget';
import ProfileNavigateWidget from '../../../Widgets/ProfileNavigateWidget/ProfileNavigateWidget';

import Styles from './Profile.module.scss';

import profileBg from './../../../../images/profile-bg.jpg';

const Profile = () => {

  const [stateApp, setStateApp] = useState(state);

  const [userInfo, setUserInfo] = useState([]);

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
    let copy = {};
    copy = response;
    setUserInfo(copy);
  }

  function renderProfile(userInfo) {
    
    if (userInfo != 0) {
      return (
        <div className={Styles.Profile}>
          <div className={Styles.container}>
            <ProfileTopWidget userInfo={userInfo} />
            <ProfileNavigateWidget />
          </div>
        </div>
      );
    }
  }
  return (
    <div>
      <LayoutTopWidget />
      {renderProfile(userInfo)}
    </div>
  );
};

export default Profile;
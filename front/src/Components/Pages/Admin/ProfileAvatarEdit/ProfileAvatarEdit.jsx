import { useState, useEffect } from 'react';
import AvatarEditor from './../../../Widgets/AvatarEditorWidget/AvatarEditorWidget';

import Requests from './../../../Requests';
import state from '../../../../State';
import LayoutTopWidget from '../../../Widgets/LayoutTopWidget/LayoutTopWidget';

import Styles from './ProfileAvatarEdit.module.scss';

const ProfileAvatarEdit = () => {

  const [stateApp, setStateApp] = useState(state);
  const [userInfo, setUserInfo] = useState({});

  useEffect(
    () => {
      Requests({
        method: 'get',
        url: '/get-auth-user',
        callback: getUser
      });
    }, []
  );

  function getUser(response) {
    let copy = [];
    copy = response;
    setUserInfo(copy);
  }

  function renderProfileAvatarEdit(user) {

    if(Object.entries(user).length !== 0) {

      return (
        <div className={Styles.ProfileAvatarEdit}>
          <div className={Styles.container}>
            <AvatarEditor image_path={userInfo.image_path}/>
          </div>
        </div>
      );
    }

  }

  return (
      <div>
        <LayoutTopWidget />
        {renderProfileAvatarEdit(userInfo)}
      </div>
  );
};

export default ProfileAvatarEdit;
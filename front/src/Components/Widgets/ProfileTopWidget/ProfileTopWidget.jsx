import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faUpload } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import profileBg from './../../../images/profile-bg.jpg';



import Styles from "./ProfileTopWidget.module.scss";

const ProfileTopWidget = ({userInfo}) => {
  return (
    <div className={Styles.images}>
      <div className={Styles.bgImg}>
        <img src={profileBg} alt="profileBg" />
      </div>
      <div className={Styles.avatar}>
        <a href="/">
          <img src={userInfo.image_path} alt="avatar" />
          <h3>Kurupt</h3>
        </a>
      </div>
      <div className={Styles.managment}>
        <div className={Styles.activitesInfo}>
          <h2>@user</h2>
          <span>Active 2 minutes ago</span>
        </div>
        <ul className={Styles.btns}>
          <li className={Styles.btn}>
            <NavLink to="/admin/profile/avatar-edit">
              <FontAwesomeIcon icon={faPenToSquare} fontSize="20px" />
              <span>Edit avatar</span>
            </NavLink>
          </li>
          <li className={Styles.btnLine}></li>
          <li className={Styles.btn}>
            <FontAwesomeIcon icon={faUpload} fontSize="20px" />
            <span>Update Cover</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileTopWidget;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faAddressCard, faChartLine, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import Styles from './ProfileNavigateWidget.module.scss';


const ProfileNavigateWidget = () => {
  return (
    <div className={Styles.ProfileNavigateWidget}>
      <ul className={Styles.ProfileNavigateWidget__items}>
        <li className={Styles.ProfileNavigateWidget__item}>
          <FontAwesomeIcon icon={faChartLine}/>
          <p>Activity</p>
        </li>
        <li className={Styles.ProfileNavigateWidget__item + ' ' + Styles.active}>
          <FontAwesomeIcon icon={faAddressCard}/>
          <p>Profile</p>
        </li>
        <li className={Styles.ProfileNavigateWidget__item}>
          <FontAwesomeIcon icon={faPenToSquare}/>
          <p>Edit</p>
        </li>
        <li className={Styles.ProfileNavigateWidget__item}>
          <FontAwesomeIcon icon={faShop}/>
          <p>Shop</p>
        </li>
      </ul>
    </div>
  );
};

export default ProfileNavigateWidget;
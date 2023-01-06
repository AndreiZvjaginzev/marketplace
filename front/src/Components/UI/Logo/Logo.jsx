
import { NavLink } from 'react-router-dom';
import Styles from './Logo.module.scss';




function Logo(props) {
  
  return (
    <div className={Styles[props.myClass]}>
        <NavLink to="/">
            <img src={props.logo} alt="логотип" />
        </NavLink>
        
    </div>
  );
}

export default Logo;
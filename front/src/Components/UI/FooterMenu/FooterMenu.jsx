import { NavLink } from 'react-router-dom';
import Styles from './FooterMenu.module.scss';

function FooterMenu(props) {
  return (
    <div className={Styles.FooterMenu}>
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><a href='#'>About Us</a></li>
            <li><a href='#'>FAQs</a></li>
            <li><a href='#'>Blog</a></li>
            <li><NavLink to="contact">Contact</NavLink></li>
        </ul>
    </div>
  );
}

export default FooterMenu;
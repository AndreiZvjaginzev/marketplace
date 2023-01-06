import Styles from './MainLayout.module.scss';

import logo from '../../../images/logo.svg';
import bg_video from '../../../images/bg.mp4';
import '../../../App.css';


import Navbar from '../../UI/Navbar/Navbar.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Button from '../../UI/Button/Button';
import { useState } from 'react';




function MainLayout(props) {

    const [buttonState, setbuttonState] = useState(false);

    function showNavbar() {
      
        if (!buttonState) {
            setbuttonState(true);
        }
        else {
            setbuttonState(false);
        }
    }

    return (
        <div className={Styles.App}>

            <div className={Styles.MainLayout}>
                <div className={Styles.ContentWrap}>
                    <video className={Styles.bg_video} width="100%" autoPlay muted loop>
                        <source src={bg_video} type="video/mp4" />
                    </video>

                    <div className={Styles.content}>
                        <header className={Styles.Appheader}>

                            <img src={logo} className="App-logo" alt="logo" />
                            <div className={Styles.Navbutton} onClick={()=>{showNavbar()}}>
                                <Button>
                                    <FontAwesomeIcon icon={faBars} />
                                </Button>
                            </div>
                        </header>
                        {props.children}
                    </div>
                </div>

                <Navbar active={[buttonState, setbuttonState]} myClass="Navbar" />
            </div>
        </div>
    );
}

export default MainLayout;

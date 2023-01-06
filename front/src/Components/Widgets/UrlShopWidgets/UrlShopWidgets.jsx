import { NavLink } from "react-router-dom";

import Styles from './UrlShowWidget.module.scss';

function UrlShopWidgets(){

    let hash = "13123";

    return (
        <div className={Styles.btn}>
            {/* <input type="text" value={hash}/> */}

            <NavLink to="/shop/6c8beaf7a3a5">Open store</NavLink>
        </div>
    );
}

export default UrlShopWidgets;
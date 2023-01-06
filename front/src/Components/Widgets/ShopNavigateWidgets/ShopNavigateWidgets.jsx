import Styles from './ShopNavigateWidgets.module.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

function ShopNavigateWidgets(props){
    let shopId = props.shopId;
    
    let links = [
        {name: "Категории", url :"/category", icon: <FontAwesomeIcon icon={faFolderOpen} />},
        {name: "Товары", url: "/product", icon: <FontAwesomeIcon icon={faShoppingBag} />},
        {name: "Заказы", url: "/order", icon: <FontAwesomeIcon icon={faFolderPlus} />},
        {name: "Покупатель", url: "/buyer", icon: <FontAwesomeIcon icon={faUser} />},
        {name: "Статистика", url: "/statistic", icon: <FontAwesomeIcon icon={faThList} />},
        {name: "Уведомления", url: "/notification", icon: <FontAwesomeIcon icon={faExclamation} />},
    ];

    return  (
        <div className={Styles.ShopNavigateWidget}>       
            <div className={Styles.links_wrap}>
                {
                    (shopId != undefined)?
                        links.map((link, index)=>
                            <ul className={Styles.link_list}>
                                <NavLink 
                                    className={Styles.nav_link} 
                                    to={"/admin/shop/"+shopId+link.url} 
                                    key={index}
                                >
                                    <li className={Styles.link_icon}>
                                        {link.icon}
                                    </li>
                                    <li className={Styles.link_text}>
                                        {link.name}
                                    </li>
                                </NavLink> 
                            </ul>                 
                        )
                    :
                    ''   
                }    
            </div>   
        </div>
    );
}

export default ShopNavigateWidgets;
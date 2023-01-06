import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import Request from './../../Requests';

import Styles from './UserCardLittleWidget.module.scss';
import logoVertical from '../../../images/logo-vertical.svg';
import logoForm from '../../../images/logo-form.svg';
import Avatar from '../../../images/user_test_ava.jpg';





function UserCardLittleWidget(props){
    const [userInfo, setUserInfo] = useState({});
console.log(props.stateApp)
    return (
        <div className={Styles.UserCardLittle}>
            <div className={Styles.backgroundDark}>
                <img src={logoVertical} className={Styles.logoVertical} alt="logo" />
                <img src={logoForm} className={Styles.logoForm} alt="logo" />
            </div>
            <div className={Styles.user_card}>
                <div className={Styles.profile_info}>
                    <NavLink to={'/admin/profile'} className={Styles.profile_link}>
                        <div className={Styles.avatar_wrap}>
                            <img src={props.stateApp.auth.image_path} className={Styles.profile_avatar} alt="avatar" />
                        </div>
                        <p className={Styles.profile_name}>{props.stateApp.auth.name}</p>
                    </NavLink>
                    {
                        props.stateApp.auth.roles.map((role)=>{
                            return(
                              <p className={Styles.profile_role} key={role.id}>{role.name}</p>  
                            )
                        })
                    }
                    
                </div>
                <div className={Styles.profile_status}>
                    <ul className={Styles.info_list}>
                        <li className={Styles.info_list_count}>0</li>
                        <li className={Styles.info_list_desc}>Tasks</li>
                    </ul>
                    <ul className={Styles.info_list}>
                        <li className={Styles.info_list_count}>4</li>
                        <li className={Styles.info_list_desc}>Shops</li>
                    </ul>
                </div>   
            </div>

            <div className={Styles.cardBackground}></div>
            
        </div>
        
    );
}

export default UserCardLittleWidget;
// import { useEffect, useState } from 'react';
// import { NavLink } from "react-router-dom";
// import Request from './../../Requests';

// import Styles from './UserCardLittleWidget.module.scss';
// import logoVertical from '../../../images/logo-vertical.svg';
// import logoForm from '../../../images/logo-form.svg';
// import Avatar from '../../../images/user_test_ava.jpg';


// function UserCardLittleWidget(){
//     const [userInfo, setUserInfo] = useState({});
//     useEffect(() => {
//         Request({
//             url: '/get-auth-user',
//             method: 'get',
//             callback: getAuthUser
//         });
//     }, []);

//     function getAuthUser(request) {
//         if(request) {
//             setUserInfo(request);
//         }
//     }

//     return (
//         <div className={Styles.UserCardLittle}>
//             <div className={Styles.backgroundDark}>
//                 <img src={logoVertical} className={Styles.logoVertical} alt="logo" />
//                 <img src={logoForm} className={Styles.logoForm} alt="logo" />
//             </div>
//             <div className={Styles.user_card}>
//                 <div className={Styles.profile_info}>
//                     <NavLink to={'/admin/profile'} className={Styles.profile_link}>
//                         <div className={Styles.avatar_wrap}>
//                             <img src={userInfo.image_path} className={Styles.profile_avatar} alt="avatar" />
//                         </div>
//                         <p className={Styles.profile_name}>{userInfo.name}</p>
//                     </NavLink>
//                     <p className={Styles.profile_role}>Admin</p>
//                 </div>
//                 <div className={Styles.profile_status}>
//                     <ul className={Styles.info_list}>
//                         <li className={Styles.info_list_count}>0</li>
//                         <li className={Styles.info_list_desc}>Tasks</li>
//                     </ul>
//                     <ul className={Styles.info_list}>
//                         <li className={Styles.info_list_count}>4</li>
//                         <li className={Styles.info_list_desc}>Shops</li>
//                     </ul>
//                 </div>   
//             </div>

//             <div className={Styles.cardBackground}></div>
            
//         </div>
        
//     );
// }

// export default UserCardLittleWidget;
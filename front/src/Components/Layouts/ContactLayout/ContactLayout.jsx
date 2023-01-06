import { useEffect } from "react";
import Requests from "../../Requests";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Styles from './ContactLayout.module.scss';
import Navbar from '../../UI/Navbar/Navbar';






function ContactLayout(props){

    return (

        <div className={Styles.ContactLayout}>
            {/* контакты */}
            <Navbar active={true} myClass="contactsHeader" logo={props.logo}/>
            {
                props.children
            }
            {/* место для футера */}
        </div>
    );
}

export default ContactLayout;
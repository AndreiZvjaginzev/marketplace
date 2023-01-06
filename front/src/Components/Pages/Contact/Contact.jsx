import ContactLayout from "../../Layouts/ContactLayout/ContactLayout";
import SendContactMessage from "../SendContactMessage/SendContactMessage";

function Contact(props){
    

    return (
        
        <ContactLayout logo={props.logo} stateApp={props.stateApp} setStateApp={props.setStateApp}>
            {
                <SendContactMessage stateApp={props.stateApp} setStateApp={props.setStateApp} field={props.field}/>
            }  
        </ContactLayout>
    );
}

export default Contact;
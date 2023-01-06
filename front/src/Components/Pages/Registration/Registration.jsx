import Styles from './Registration.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import logo_form from '../../.././images/logo-form.svg'
import InputField from '../../UI/InputField/InputField';
import Button from '../../UI/Button/Button';
import MainLayout from '../../Layouts/MainLayout/MainLayout';


function Registration() {
    return (
        <div>

            <MainLayout>

                <div className={Styles.Registration}>
                    <div className={Styles.RegistrationWrap}>
                        <div className={Styles.RegistrationFormWrap}>
                            <img src={logo_form} />
                            <h3>Registration</h3>
                            <div className={Styles.RegistrationForm}>
                                {/* <InputField placeholder="Name" type="text" />
                                <InputField placeholder="email" type="text" />
                                <InputField placeholder="password" type="password" />

                                <Button>Register account</Button> */}

                                <a href="#">Sig in</a>
                            </div>

                        </div>
                    </div>
                </div>
                
            </MainLayout>


        </div>

    );
}

export default Registration;
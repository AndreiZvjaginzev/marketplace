import Styles from './Community.module.scss';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComputer} from '@fortawesome/free-solid-svg-icons';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import {faBriefcase} from '@fortawesome/free-solid-svg-icons';



function Community(){
  return(
  <div className={Styles.info}>
                
                <div className={Styles.Community_wrap}>
                <h3>Вступайте в Клуб</h3>
                <p className={Styles.Community_description}>Мировые лидеры торговли</p>
                  <div className={Styles.Community_main}>
                  <div className={Styles.Icon_wrapper}>
                      <FontAwesomeIcon icon={faComputer} />
                  </div>
                       <div className={Styles.Icon_box_info}>
                       <h4>Гениально и просто</h4>
                       <p className={Styles.Description}>Ведущие технологии планеты</p>
                           
                       </div>

                       
                  </div>

                  
                  
                </div>
                <div className={Styles.Community_wrap}>
                
                  <div className={Styles.Community_main}>
                  <div className={Styles.Icon_wrapper}>
                      <FontAwesomeIcon icon={faBasketShopping} />
                  </div>
                       <div className={Styles.Icon_box_info}>
                       <h4>Маркеты в сети</h4>
                       <p className={Styles.Description}>Лучшие предложения для Вас</p>
                           
                       </div>

                       
                  </div>
                  
                  
                  
                </div>

                <div className={Styles.Community_wrap}>
                
                  <div className={Styles.Community_main}>
                  <div className={Styles.Icon_wrapper}>
                      <FontAwesomeIcon icon={faBriefcase} />
                  </div>
                       <div className={Styles.Icon_box_info}>
                       <h4>Мировые бренды</h4>
                       <p className={Styles.Description}>Найдите свою историю</p>
                           
                       </div>

                       
                 </div>
                 </div>
                 </div>
                  
                  
                  
                


    )
}

export default Community;


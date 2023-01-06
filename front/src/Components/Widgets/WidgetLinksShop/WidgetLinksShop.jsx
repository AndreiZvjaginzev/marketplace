import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faPaperclip, faUser } from '@fortawesome/free-solid-svg-icons';

import Styles from './WidgetLinksShop.module.scss';


function WidgetLinksShop({place}) {
  const bindDisplaySetting = () => {
    let setting = null
    place.content.settings.map(item => {
      if(item.title === 'Display') {
        if(item.currentValue === 'Rows') {
          setting = ''
        }
        if(item.currentValue === 'Grids') {
          setting = Styles.widgetLinks__grid
        }
      }
    })

    return setting
  }

  return (
    <div className={`${Styles.widgetLinks} ${bindDisplaySetting()}`}>
      <ul className={Styles.widgetLinks__list}>
        <li className={Styles.widgetLinks__list_item}>
          <a href="/shop/6c8beaf7a3a5">
            <FontAwesomeIcon icon={faShop} />
            <p>Open store</p>
          </a>
        </li>
        <li className={Styles.widgetLinks__list_item}>
          <a href="#">
            <FontAwesomeIcon icon={faPaperclip} />
            <p>Open products</p>
          </a>
        </li>
        <li className={Styles.widgetLinks__list_item}>
          <a href="/admin/profile">
            <FontAwesomeIcon icon={faUser} />
            <p>Open profile</p>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default WidgetLinksShop;
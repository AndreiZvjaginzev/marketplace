import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import Styles from './SearchField.module.scss';

const SearchField = () => {

  return (
    <div className={Styles.SearchField}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input type="text" placeholder='Search...' />
    </div>
  );
};

export default SearchField;
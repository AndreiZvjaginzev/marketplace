
import Styles from './Checkbox.module.scss';


function Checkbox(props) {
  return (
    <div className={Styles.Checkbox}>
        <label>
            <input type="checkbox" />
            Remember
        </label>
    </div>
  );
}

export default Checkbox;

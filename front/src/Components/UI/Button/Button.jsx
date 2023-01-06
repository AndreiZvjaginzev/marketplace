
import Styles from './Button.module.scss';




function Button({children, buttonfunc, myClass, isValidated}) {

  return (
    <div className={Styles.Button}>
        <button disabled={!isValidated} className={`${Styles[myClass]} ${(!isValidated && isValidated!=null) ? Styles.disabled : null}`}>{children}</button>

    </div>
  );
}

export default Button;

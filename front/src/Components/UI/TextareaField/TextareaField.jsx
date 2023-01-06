import Styles from './TextareaField.module.scss';
import checks from '../../../Checks';


const TextareaField = ({placeholder, validator, fieldType, setStateApp, stateApp, rows, refer, cols}, ...props) => {
    
    fieldType.checks = checksForInput(checks);
    function checksForInput(checks) {
        let myChecks = [];
        for(let check of checks){
            // console.log(check)
            for(let trigger of check.triggers){
                
                if(trigger == fieldType.name){
                    myChecks.push(check);
                }
            }
        }
        return myChecks;
    }
    return (
        <div className={Styles.TextareaField}>
            <textarea 
                ref={refer}
                placeholder={placeholder}
                className={(!fieldType.valid && fieldType.touch) ? Styles.errorBorder : ''}
                rows={rows}
                wrap='soft'
                onChange={(event) => {
                        validator(stateApp, setStateApp, fieldType, event.target.value);
                    }
                }
            >
                {
                    props.children
                }
            </textarea>
            {(!fieldType.valid && fieldType.touch) ? <p className={Styles.error}>{fieldType.msg}</p> : null}
        </div>
    );
}

export default TextareaField;
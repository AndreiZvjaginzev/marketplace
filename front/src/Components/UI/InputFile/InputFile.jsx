import Styles from './InputFile.module.scss';
import checks from '../../../Checks';


const InputFile = ({type, validator, fieldType, setStateApp, stateApp, refer, id, accept}, ...props) => {
    fieldType.checks = checksForInput(checks);
    function checksForInput(checks) {
        let myChecks = [];
        for(let check of checks){
            for(let trigger of check.triggers){
                
                if(trigger == fieldType.name){
                    myChecks.push(check);
                }
            }
        }
        return myChecks;
    }
    return (
        <div className={Styles.InputFile}>
            <label htmlFor="file_input">Загрузить картинку: {
                (fieldType.value !== null)
                ?fieldType.value.name
                :" тип .jpeg, размер до 20Мб"
            }</label>
            <input 
                type={type} 
                className={(!fieldType.valid && fieldType.touch)  ? Styles.errorBorder : ''}
                onChange={(event) => {
                        validator(stateApp, setStateApp, fieldType, event.target.files[0])
 
                    }
                }
                {...(id !== undefined)?id={id}:""}
                {...(accept !== undefined)?accept={accept}:""}
                ref = {refer}
            />
            {(!fieldType.valid && fieldType.touch)  ? <p className={Styles.error}>{fieldType.msg}</p> : null}
        </div>
    );
}

export default InputFile;

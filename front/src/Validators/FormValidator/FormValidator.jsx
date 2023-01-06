export function onChangeFieldValidator(stateApp, setStateApp, fieldName, value) {
  let copy = Object.assign({}, stateApp);
  copy.msg = "";
  for(let input of copy.validateInput.fields){
    
    if(input.name === fieldName.name){
      input.touch = true;
      input.value = value;
      for(let field of input.checks){
        // console.log(field.f(input.value).result)
        // console.log(input.value)

          if(!field.f(input.value).result){
              input.msg = field.msg;
              input.valid = false;
              break;
          }
          else{
              input.msg = "";
              input.valid = true;
          }
      }

    }
  }
  let flag = true;
// console.log(copy)
  for(let field of copy.validateInput.fields){
      
      if(!field.valid){
          flag = false;
          break;
      }
  }

  copy.validateInput.formButton = (flag)? true: false;

  setStateApp(copy);
  // copy.validateInput.fields[fieldName].touch = true;
  // copy.validateInput.fields[fieldName].value = value;
  // console.log(copy.validateInput.fields[fieldName])
  // for(let field of copy.validateInput.fields[fieldName].checks) {

  //   if(!field.f(copy.validateInput.fields[fieldName].value).result) {
  //     copy.validateInput.fields[fieldName].message = field.message;
  //     copy.validateInput.fields[fieldName].valid = false;

  //     break;
  //   } else {
  //     copy.validateInput.fields[fieldName].valid = true;
  //   }
  // }

  // let flag = true;
  // for(let field in copy.validateInput.fields) {
  //   if(!copy.validateInput.fields[field].valid) {
  //     flag = false;
  //     break;
  //   }
  // }

  // copy.validateInput.formButton = flag ? true : false;

  // setStateApp(copy);

}


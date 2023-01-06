import Styles from './WidgetsLayout.module.scss'
import { useState } from "react";



function WidgetsLayout(props){
   
    return (

        <div className={Styles.WidgetsLayout}>
            {/* админка */}
                {
                props.children.map((el, index)=>{
                    // console.log(el.props.gridClass)
                    return(el)
                })
                }
 
        </div>
    );
}

export default WidgetsLayout;
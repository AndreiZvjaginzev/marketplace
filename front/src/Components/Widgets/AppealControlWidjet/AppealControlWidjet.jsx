import { useEffect } from 'react';
import Styles from './AppealControlWidjet.module.scss';
import Requests from '../../Requests';
import { useState } from 'react';
import Preloader from '../../UI/Preloader/Preloader';
import FormPreloader from '../../UI/FormPreloader/FormPreloader';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

function AppealControlWidjet(props){
    let [appeals, setAppeals] = useState(null);
    let [statuses, setStatuses] = useState(null);
    let [active, setActive] = useState(1);
    const navigate = useNavigate();
    
    useEffect(() => {
        (
            async()=>{
                try{
                   await getAppealsInfo();
                   await getStatusInfo();
                }
                catch(error){
                    console.log(error)
                }   
            } 
        )()
        
        
    }, []);

    function getAppealsInfo(){
        Requests({
            method: 'get',
            url: '/appeals',
            responseType: 'json',
            callback: appealsSet
        });
    }

    function appealsSet(serverRequest){
        // console.log(serverRequest)
      if(serverRequest.code === '200'){
        setAppeals(serverRequest.data)
      }
    }
    function getStatusInfo(){
        Requests({
            method: 'get',
            url: '/statuses',
            responseType: 'json',
            callback: statusSet
        });
    }

    function statusSet(serverRequest){
        console.log(serverRequest)
        if(serverRequest.code === '200'){
            setStatuses(serverRequest.data)
        }
    }
    function countStatusAppealsAmount(id){
        
        // let copy = Object.assign([], appeals);
        // copy.map((el, index)=>{
        //     if(el.status_id == id){
        //         copy.splice(el, 1)
        //         console.log(copy.slice(index, 1))
        //     }
        // })
        let copy = [];
        for(let appeal of appeals){
            if(id === appeal.status_id){
                copy.push(appeal)
            }
        }
        console.log(copy)
        return copy.length;
    }

    function activeStatus(id){
        setActive(id);
    }

    function changeStatus(id){
        appeals.map((appeal)=>{
            if(appeal.id == id){                
                if(appeal.status_id < 3){
                    let status_id = appeal.status_id;
                    status_id = ++status_id;
                    appeal.status_id = ++appeal.status_id;
                    console.log(props.stateApp);
                    (async ()=>{
                        try{
                            Requests({
                                method: 'post',
                                url: '/update-appeal',
                                data: {
                                    appeal_id: appeal.id,
                                    status: status_id,
                                },
                                callback:  await sendAppeal
                            })
                        }
                        catch(error){
                            console.log(error);
                        }
                        let copyState = Object.assign([], props.stateApp);
                        copyState.preloader.isFetch = true;
                        props.setStateApp(copyState);
                    })()
                }
                
                function sendAppeal(serverRequest){
                    let copyState = Object.assign([], props.stateApp);
                        copyState.preloader.isFetch = false;
                        props.setStateApp(copyState);
                    if(serverRequest.code == 200){
                        let copyAppeal = Object.assign([], appeals);
                        copyAppeal.map((el)=>{
                            if(el.id == serverRequest.data.id){
                                el = serverRequest.data;
                            }
                        })
                        setAppeals(copyAppeal);
                        console.log(copyAppeal)
                    }
                }
            }
        })
    }
    function appealChatProvider(appeal){
        let copyState = Object.assign([], props.stateApp);
        copyState.appeal.data = appeal;
        props.setStateApp(copyState);
        console.log(copyState)
        return navigate(`../appeal/${appeal.id}`);
    }
    // console.log(appeals)
    // console.log(statuses)
    return  (
        <div className={Styles.AppealControlWidjet}>
            {/* <FormPreloader stateApp={props.stateApp} setStateApp={props.setStateApp}/> */}
            <h4 className={Styles.Header}>Обращения</h4>
            <ul className={Styles.TabsWrap}>
               {
                (statuses !== null)
                    ?statuses.map((status)=>{
                        return(
                            
                            <li key={status.id} className={
                                (active == status.id)
                                ?`${Styles.TabsItem} ${Styles.active}`
                                :Styles.TabsItem} 
                                onClick={()=>{activeStatus(status.id)}}>
                                {`${status.name} `} 
                                <span>{`(${countStatusAppealsAmount(status.id)})`}</span>
                            </li>
                            
                        )
                    })
                    :''
                } 
            </ul>
            

            <ul>
                {
                    (appeals !== null && appeals.length > 0)
                    ?appeals.map((appeal, index)=>{
                        return(
                            (active == appeal.status_id)
                            ?<li key={appeal.id} className={Styles.AppealWrap}>
                                <span className={Styles.AppealCount}>{appeal.id}</span>
                                
                                <span className={Styles.AppealEmail}>{appeal.user_email}</span>
                                {
                                    (appeal.theme !== null)
                                        ?<span>{appeal.theme}</span>
                                        :''
                                }
                                {
                                    (appeal.messages !== null && appeal.messages.length >0)
                                        ?appeal.messages.map((message)=>{
                                            return(
                                               <span key={message.id} className={Styles.AppealMessage}>{message.text.substr(0, 30)}</span> 
                                            )
                                        })
                                        :''
                                }
                                <span className={Styles.AppealChat} onClick={()=>appealChatProvider(appeal)}>Читать</span>
                                
                                {/* <NavLink className={Styles.AppealChat} to={`../appeal/${appeal.id}`}>Читать</NavLink> */}
                                <span className={Styles.AppealStatusChange} onClick={()=>{changeStatus(appeal.id)}}>
                                    {
                                        (appeal.status_id == 3)
                                            ?'Завершено'
                                            :'Продвинуть статус'
                                    }
                                </span>
                             </li>
                            :""
                        )
                    })
                    :'Извините у нас пока нет обращений' 
                }
            </ul>
            
            
           
        </div>
    );
}

export default AppealControlWidjet;
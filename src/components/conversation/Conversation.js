
import style from './Conversation.module.css';
import { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { chatActions, chatReducer,chatSelector } from '../../redux/reducers/chatReducer';

import LogoImg from '../LogoImg';

function Conversation(){

    const {conversation,users,currUserId,currentConversationId} = useSelector(chatSelector);
    const [changedCurrentConversationIdState,setchangedCurrentConversationIdState]=useState(false)
    const dispatch = useDispatch();

   
    
    let userconversation = [];
    conversation.forEach(con => {
        if(con.users.some(user => user.id === currUserId)){
            if(userconversation.length==0 && !changedCurrentConversationIdState){
                dispatch(chatActions.setConversationId(con.id));
                setchangedCurrentConversationIdState(true);
            }
            userconversation.push(con);
           
        }});

    //filter userconversation  
    
    

    

    return(

        <div className={style.conversationContainer}>

            {/* Searchbox  */}
            <div className={style.searchBox}>              
                <input style={{flexGrow:1,paddingBottom:'4px',fontSize:'0.9em',display:'flex',alignItems:'center',borderRadius:'8px 0px 0px 8px', border:'1px solid lightgray', borderRight:'none'
                }} placeholder='Search for conversation'></input>
                <button style={{borderRadius:'0px 8px 8px 0px',paddingBottom:'1px', border:'1px solid lightgray', borderLeft:'none'}}>S</button>
            </div>
            
            {/* midHeader */}
            <div className={style.midHeader}>
                <p style={{fontSize:'0.65em',fontWeight:700}}>CONVERSATIONS</p>
                <button style={{display:'flex',paddingBottom:'4px',justifyContent:'center', alignItems:'center'}}>+</button>
            </div>


            {/* Conversation  */}
            <div className={style.conversationList}>
             {userconversation.map((con)=>{
                
                // Getting Users 
                let conUsers = [];
                
                con.users.map((x)=>{

                     let newuser = users.find(user => user.id === x.id);
                     if(x.id != currUserId){
                      conUsers.push(newuser); 
                     }
                })
            
                return(
                    <div className={style.conListbox} onClick={()=>dispatch(chatActions.setConversationId(con.id))}>
                           <div className={style.conImages}>
                             <LogoImg images={conUsers}/>
                            </div>
                            <div className={style.conNames}>
                            {conUsers.map((u,index)=>(
                                <>
                                <p>{u.name}</p>
                                {index !== conUsers.length - 1 && <span>, </span>}
                                </>
                                ))}
                            </div>
                                 
                    </div>
                );
                 
                 

             })}
            </div>
        </div>
    );
}

export default Conversation;
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { chatActions,chatReducer,chatSelector } from "../../redux/reducers/chatReducer";
import style from "./Message.module.css";
import LogoImg from "../LogoImg";


function Message(){

   
  

    const dispatch = useDispatch();
     
    const {conversation,users,currentConversationId,currUserId} = useSelector(chatSelector);
 
    let populatedUsers = []

    let name;

  
   

    let currentConversation= conversation.find(con => con.id === currentConversationId);
    
    if(currentConversation==null){
        return(<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:'90vh'}}>
                  <h3>You dont have any currentConversation</h3>
            </div>);
    }
   

     let functn=currentConversation.users.forEach((concur)=>{
       
        users.forEach((user)=>{
            if(user.id===concur.id){
                populatedUsers.push(user);
            }
        })

    });

  
  
    
   


    const handleSendMessage = () => {
        
        dispatch(chatActions.addmessage());
   
    };

    const handleTypedMessage = (e) => {
        dispatch(chatActions.setTextMessage(e.target.value));
    };


    return(
          
         <div className={style.messageContainer}>

            {/* Header  */}
            <div className={style.messageHeader}>
                           <div className={style.conMesImages}>
                             <LogoImg images={populatedUsers}/>
                            </div>
                            <div className={style.conMesNames}>
                            {populatedUsers.map((u,index)=>(
                                <>
                                <p key={index}>{u.name}</p>
                                {index !== populatedUsers.length - 1 && <span>, </span>}
                                </>
                                ))}
                            </div>
            </div>


            {/* Messagebox  */}
            <div className={style.messageBox} >
               
               {currentConversation.messages.map((mes)=>{
                   
                 
                
                  let sender = users.find(user => user.id === mes.id);
                  let image=sender.imageUrl;

                        if(mes.id!=currUserId){                    
                            name=sender.name;                     
                        }else{                 
                            name="You";                
                        }
                  
                   return(
                   
                    <div className={`${style.smallMessageBox} ${name === "You" && style.moveRight}`}>
                  
                    <p className={`${style.textmsg} ${name === "You" && style.changebgtext}`}>{mes.data}</p>
                     <div className={style.msgDetail}>
                        <div className={style.msgImage}>
                         <img  style={{height:'20px', width:'auto'}}  src={image} />
                        </div>
                        <p className={style.name}>{name}</p>
                        
                    </div>

                    </div>
                   )
                })}


            </div>


            {/* TypingBox  */}
            <div className={style.typingBox}>
                     
                <textarea style={{height:50,flexGrow:0.7,padding:'8px 12px 8px 12px',fontSize:'0.8em',borderRadius:'8px', border:'1px solid lightgray',
                }} placeholder='Type your message'
                  onChange={(e)=>handleTypedMessage(e)}></textarea>
                <button style={{borderRadius:'8px',padding:'4px 8px', border:'1px solid lightgray'}}
                 onClick={()=>handleSendMessage()}>Send</button>
            </div>
        </div>
    );
}


export default Message;
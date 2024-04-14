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

    const messageEnd = useRef(null);

    // handles when message to scroll down
  
    useEffect( () => {
        if(conversation && conversation.length>0){
          messageEnd.current?.scrollIntoView();
        }
  
      },[conversation]);
   
    // current Conversation contain that conversation whose messages is to be shown in message box
    let currentConversation= conversation.find(con => con.id === currentConversationId);
    
    // if no conversation then show the Welcome message
    if(currentConversation==null){
        return(<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:'90vh'}}>
                  <h3>Welcome to Redux Chat</h3>
            </div>);
    }
   
    // loads full user details of users in currentconversation through id's; 
     let functn=currentConversation.users.forEach((concur)=>{
       
        users.forEach((user)=>{
            if(user.id===concur.id){
                populatedUsers.push(user);  // saving in populateduser
            }
        })

    });

  
  
    
   

   // handles when send button is clicked
    const handleSendMessage = () => {
        
        dispatch(chatActions.addmessage());
   
    };

  // handles when someting is typed in the typing box (i.e. message)
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
               {/* mapping currentconversation messages  */}
               {currentConversation.messages.map((mes)=>{
                //    finding messege sender details i.e. for getting sender user image                  
                  let sender = users.find(user => user.id === mes.id);
                  let image=sender.imageUrl;

                        if(mes.id!=currUserId){                    
                            name=sender.name;                     
                        }else{                 
                            name="You";      // if current user then use 'You' as name         
                        }
                  
                   return(
                   // Each message div  (if current user then move right and change background)
                    <div className={`${style.smallMessageBox} ${name === "You" && style.moveRight}`}>
                     {/* message  */}
                    <p className={`${style.textmsg} ${name === "You" && style.changebgtext}`}>{mes.data}</p>
                     {/* sender detail  */}
                     <div className={style.msgDetail}>
                        <div className={style.msgImage}>  
                         <img  style={{height:'20px', width:'auto'}}  src={image} /> {/* Image */}
                        </div>
                        <p className={style.name}>{name}</p>    {/* Name */}                   
                    </div>

                    </div>
                   )
                })}


            <div ref={messageEnd} className="MessageEnd"></div>
            </div>


            {/* TypingBox  */}
            <div className={style.typingBox}>
                  {/* text area  */}
                <textarea style={{height:50,flexGrow:0.7,padding:'8px 12px 8px 12px',fontSize:'0.8em',borderRadius:'8px', border:'1px solid lightgray',
                }} placeholder='Type your message'
                  onChange={(e)=>handleTypedMessage(e)}></textarea>
                  {/* SEND button */}
                <button style={{borderRadius:'8px',padding:'4px 8px', border:'1px solid lightgray'}}
                 onClick={()=>handleSendMessage()}>Send</button>
            </div>
        </div>
    );
}


export default Message;

import { useSelector,useDispatch } from "react-redux";
import { chatActions,chatReducer,chatSelector } from "../../redux/reducers/chatReducer";
import style from "./Message.module.css";
import LogoImg from "../LogoImg";

function Message(){

    const {conversation,users,currentConversationId,currUserId} = useSelector(chatSelector);

    let currentConversation= conversation.find(con => con.id === currentConversationId);

    let populatedUsers = []

     let functn=currentConversation.users.forEach((concur)=>{
       
        users.forEach((user)=>{
            if(user.id===concur.id){
                populatedUsers.push(user);
            }
        })

    });


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
            <div className={style.messageBox}>
               
               {currentConversation.messages.map((mes)=>{
                   
                  let name;
                
                  let sender = users.find(user => user.id === mes.id);
                  let image=sender.imageUrl;

                        if(mes.id!=currUserId){                    
                            name=sender.name;                     
                        }else{                 
                            name="You";                
                        }
                  
                   return(
                    <div className={style.smallMessageBox}>
                    <p className={style.textmsg}>{mes.data}</p>
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
            <div className={style.typingBox}></div>

         </div>
    );
}


export default Message;
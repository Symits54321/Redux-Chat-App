
import style from "./Chatpage.module.css"
import Conversation from "../components/conversation/Conversation";
import Message from "../components/messages/Message";
function Chatpage(){
   
    return(
        <>
        <div className={style.chatpage}>
            <div className={style.leftSection}>
              <Conversation/>
            </div>
            <div className={style.rightSection}>
              <Message/>  
            </div>
        </div>
        </>
      
    );
}

export default Chatpage;
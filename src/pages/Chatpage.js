
import style from "./Chatpage.module.css"
import Conversation from "../components/conversation/Conversation";
import Message from "../components/messages/Message";
import Contact from "../components/contacts/Contact";

import { useDispatch } from "react-redux";

import { chatReducer,chatActions,chatSelector } from "../redux/reducers/chatReducer";

function Chatpage(){

    const dispatch = useDispatch()
   
    return(
        <>
    
        <div className={style.chatpage}>
        {/* popup button opens contact popup to select users and create new conversation  */}
        <Contact/>
            <div className={style.leftSection}>
              {/* left full column comes under conversation component  */}
              <Conversation/>
            </div>
            <div className={style.rightSection}>
              {/* right section comes under Message  */}
              <Message/>  
            </div>
        </div>
        </>
      
    );
}

export default Chatpage;
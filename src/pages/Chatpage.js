
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
          
        <Contact/>
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
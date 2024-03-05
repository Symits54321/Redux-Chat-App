
import { SHA256 } from 'crypto-js';
import { useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { chatActions,chatReducer,chatSelector } from "../../redux/reducers/chatReducer";

import style from './Contact.module.css'


function Contact(){
    
    const dispatch = useDispatch();
    const{users,popupState,conversation,currUserId} = useSelector(chatSelector);
    const [selectedUser,setSelectedUser] = useState([currUserId]);
    
    
    let Users = users.filter( x => x.id !== currUserId);

    function generateHashId(data) {
        // Generate SHA-256 hash
        const hash = SHA256(data).toString();
    
        // Take the first 6 characters of the hash as the ID
        const hashId = hash.substring(0, 6);
    
        return hashId;
    }

    async function checkAlreadyExists (chatUsers){
        // iterating through each conversation
        conversation.forEach((con)=>{

         let cnt=0;
          ////iterating through the users of the conversation
            con.users.forEach((user)=>{
                // iterating through chatusers if contains user id
                if (chatUsers.some(userId => userId.id === user.id)) {
                    cnt++; // If match found, count++
                }
            });
          
          // if match count length == users.length (that means chat already exists)   
          if(users.length==cnt){
            return true;
          }  

        });

        return false;
    }

    async function toggleSelect(id) {
        // Check if id is not present in selectedUsers, then add
        if (!selectedUser.includes(id)) {
            const updatedUser = [...selectedUser, id];
            setSelectedUser(updatedUser);
        } else {
            // If id is present in selectedUsers, then remove
            const updatedUser = selectedUser.filter(x => x !== id);
            setSelectedUser(updatedUser);
        }
    }
    



    return(
          
        <div className={`${popupState ? style.contactPopupContainer : style.displaynone}`}>
            <div className={style.contactUsers} >
              {Users.map((user)=>{

                let selected = selectedUser.includes(user.id);
                  
                  return(
                          <div className={`${style.contact} ${ selected ? style.selectcontact : ''}`}
                          onClick={() => toggleSelect(user.id)}>
                                 <img className={style.contactImage} src={user.imageUrl} />
                                 <p className={`${style.contactName} ${ selected ? style.textcolor : ''}`} 
                                  >{user.name}</p>
                          </div>
                          
                  );
              })}

          </div>
          <button className={style.createButton}
           onClick={()=>dispatch(chatActions.createConversation(selectedUser))}>Create Conversation</button>
           <button className={style.createButton} onClick={()=>setSelectedUser([currUserId])}>Clear</button>
           <button className={style.cancelButton} onClick={()=>dispatch(chatActions.togglePopupState())}>X</button>
        </div>
    );
}


export default Contact;
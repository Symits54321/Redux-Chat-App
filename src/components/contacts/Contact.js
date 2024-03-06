
import { SHA256 } from 'crypto-js';
import { useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { chatActions,chatReducer,chatSelector } from "../../redux/reducers/chatReducer";

import style from './Contact.module.css'


function Contact(){
    
    const dispatch = useDispatch();
    const{users,popupState,conversation,currUserId} = useSelector(chatSelector);

    // contains the user selected for creating new conversation 
    const [selectedUser,setSelectedUser] = useState([currUserId]);
    
    
    let Users = users.filter( x => x.id !== currUserId);
    
    // hash code needed for id of new conversation created 
    function generateHashId(data) {
        // Generate SHA-256 hash
        const hash = SHA256(data).toString();
    
        // Take the first 6 characters of the hash as the ID
        const hashId = hash.substring(0, 6);
    
        return hashId;
    }

    // checks if chat already exists
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

    // needed to toogle select the users from contacts popup to create new conversation
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
        // All Contact popup (it opens when + button right of conversation header is clicked)
        // if popup state is true then display the contact popup   
        <div className={`${popupState ? style.contactPopupContainer : style.displaynone}`}>
            {/* div containing users  */}
            <div className={style.contactUsers} >
                {/* mapping through each users  */}
              {Users.map((user)=>{
                //  it checks that if you have clicked/selected the user for adding in conversation or not 
                let selected = selectedUser.includes(user.id);
                  
                  return(
                        // Each Contact 
                        //   if user is selected then background will be green 
                          <div className={`${style.contact} ${ selected ? style.selectcontact : ''}`}
                          onClick={() => toggleSelect(user.id)}> {/* onclick toogle the selection of user  */}
                                  {/* image of the user  */}
                                 <img className={style.contactImage} src={user.imageUrl} />
                                 {/* name of the user  */}
                                 <p className={`${style.contactName} ${ selected ? style.textcolor : ''}`} 
                                  >{user.name}</p>
                          </div>
                          
                  );
              })}

          </div>
          {/* three buttons create , clear , exit  */}
          <button className={style.createButton}
           onClick={()=>dispatch(chatActions.createConversation(selectedUser))}>Create Conversation</button>
           <button className={style.createButton} onClick={()=>setSelectedUser([currUserId])}>Clear</button>
           <button className={style.cancelButton} onClick={()=>dispatch(chatActions.togglePopupState())}>X</button>
        </div>
    );
}


export default Contact;
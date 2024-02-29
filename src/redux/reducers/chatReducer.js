


import { createSlice } from "@reduxjs/toolkit";



const initialState={

   

     users : [
        {id:'1234',name:'Robert',imageUrl:'images/users/Robert.jpg'},
        {id:'12345',name:'Stephenie',imageUrl:'images/users/Stephenie.jpg'},
        {id:'8947',name:'Macmohan', imageUrl:'images/users/Macmohan.jpg'},
        {id:'19215',name:'Bill', imageUrl:'images/users/Bill.jpg'},
        {id:'9050',name:'Alice',imageUrl:'images/users/Alice.jpg'},
        {id:'4876',name:'Anna',imageUrl:'images/users/Anna.jpg'},
        {id:'9212',name:'Adelina', imageUrl:'images/users/Adelina.jpg'},
        {id:'1008',name:'Luca', imageUrl:'images/users/Luca.jpg'},
        {id:'4234',name:'Valentina',imageUrl:'images/users/Valentina.jpg'},
        {id:'9724',name:'Oliver',imageUrl:'images/users/Oliver.jpg'},
        {id:'89543',name:'Marco', imageUrl:'images/users/Marco.jpg'},
        {id:'82530',name:'Javier', imageUrl:'images/users/Javier.jpg'},
        {id:'01639',name:'Kai',imageUrl:'images/users/Kai.jpg'},
        {id:'901627',name:'Ethan',imageUrl:'images/users/Ethan.jpg'},
        {id:'910457',name:'Kumi', imageUrl:'images/users/Kumi.jpg'},
        {id:'27814',name:'Yuki', imageUrl:'images/users/Yuki.jpg'},
        {id:'92671',name:'Sophia', imageUrl:'images/users/Sophia.jpg'},
        {id:'83562',name:'Emma', imageUrl:'images/users/Emma.jpg'},
        {id:'38624',name:'Olivia', imageUrl:'images/users/Olivia.jpg'},
        {id:'9876',name:'Dummyman', imageUrl:'images/users/Dummyman.jpg'},

    ],

   
    

     conversation : [
        {
         id:'1917',
         users:[{id:'1234'},{id:'12345'},{id:'8947'},{id:'19215'},{id:'9876'}],

         messages:[
            {id:'1234',data:'There are three ways to ultimate success: The first way is to be kind. The second way is to be kind. The third way is to be kind.'},
            {id:'12345',data:'Wow , I liked it'},
            {id:'8947',data:'Good morning,Success is getting what you want; happiness is wanting what you get'},
            {id:'19215',data:'To know how much there is to know is the beginning of learning to live.'},
            {id:'1234',data:'Goodnight'},
         ]
        }, 
        
        {
            id:'1915',
            users:[{id:'19215'},{id:'9876'}],
  
         messages:[
            {id:'19215',data:'Failure is simply the opportunity to begin again, this time more intelligently.'},
            {id:'9876',data:'If you change the way you look at things, the things you look at change.'},
            {id:'19215',data:'Good morning'},
            {id:'9876',data:'Good evening, Our greatest glory is not in never falling, but in rising every time we fall'},
            {id:'19215',data:'Nature has given us all the pieces required to achieve exceptional wellness and health, but has left it to us to put these pieces together.'},
         ]
        },

        {
            id:'1937',
            users:[{id:'901627'},{id:'9876'}],
     
            messages:[
               {id:'901627',data:'Hi everyone,Courage to continue matters more than success or failure.'},
               {id:'9876',data:'Great'},
               {id:'901627',data:'Good morning,Success requires work, not just words'},
               {id:'9876',data:'Good evening,Success comes to the busy, not the idle.'},
               {id:'901627',data:'Goodnight,Get ahead by taking the first step.'},
            ]
           },
     
    ],

   currUserId:"9876",
 
   currentConversationId:'1917',

  
    isLoading: false,

    error: null,
    
    fetchAgain:1,

    message:"",
}






const chatSlice = createSlice({
    name:'chats',
    initialState:initialState,
    reducers:{


        fetchStart:(state, action)=>{
            state.isLoading=true;
        },

     

        fetchSuccess:(state, action)=>{
            state.message=action.payload;
            state.isLoading=false;
            console.log("Success :___ "+action.payload);
        },

        fetchError:(state, action)=>{
           state.error = action.payload;
           state.isLoading = false ;

           console.log("ERROR :___ "+action.payload);
        },

        setConversationId:(state, action)=>{
            state.currentConversationId = action.payload;
          
        },

        updateConversation:(state,action) => {

            state.conversation= action.payload;
        },
        
        
       


     

    }
})



// export the chats reducer function and action creators here
export const chatReducer=chatSlice.reducer;

export const chatActions = chatSlice.actions;



// export the chats selector function here

export const chatSelector = (state)=>state.chatReducer;



     
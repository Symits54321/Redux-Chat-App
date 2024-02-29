import { configureStore } from "@reduxjs/toolkit";

// import comments reducer function here and include it inside of the store

import { chatReducer } from "./redux/reducers/chatReducer";

export const store = configureStore({
  reducer: {
               chatReducer
  }
});
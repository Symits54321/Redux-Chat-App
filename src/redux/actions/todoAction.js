
// Action constants.

export const ADD_TODO="add todo";
export const DELETE_TODO="delete todo";
export const UPDATE_TODO="update todo";

// Action Creators
export const addTodo = (text)=>({text, type:ADD_TODO});
export const deleteTodo = (index)=>({index, type: DELETE_TODO});
export const updateTodo = (index,text)=>({index,text, type: UPDATE_TODO});
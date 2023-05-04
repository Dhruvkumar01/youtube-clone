import { createSlice } from '@reduxjs/toolkit'

const initialState= {
        currentUser: null,
        isFetching: false,
        err: false
    }

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      loginStart: (state) => {
        state.isFetching= true;
      },
      loginFail: (state) => {
        state.isFetching= false;
        state.err= true;
      },
      loginSuccess: (state, action) => {
        state.isFetching= false;
        state.currentUser= action.payload;
      },
      logout: (state)=> {
        state.currentUser=null;
        state.isFetching= false;
        state.err= false;
      },
      subscribe: (state, action)=>{
        state.currentUser.subscribedChannel.push(action.payload)
      },
      unsubscribe: (state, action)=>{
        state.currentUser.subscribedChannel.splice(state.currentUser.subscribedChannel.indexOf(action.payload), 1);
      } 
    },
  })
  
export const { loginStart, loginFail, loginSuccess, logout, subscribe, unsubscribe } = userSlice.actions
  
export default userSlice.reducer
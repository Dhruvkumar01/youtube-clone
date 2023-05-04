import { createSlice } from '@reduxjs/toolkit'

const initialState= {
        currentVideo: null,
        isFetching: false,
        err: false
    }

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
      fetchStart: (state) => {
        state.isFetching= true;
      },
      fetchFail: (state) => {
        state.isFetching= false;
        state.err= true;
      },
      fetchSuccess: (state, action) => {
        state.isFetching= false;
        state.currentVideo= action.payload;
      },
      like: (state, action) =>{
        if(!state.currentVideo.likes.includes(action.payload)){
          if(state.currentVideo.dislike.includes(action.payload)){
            state.currentVideo.dislike.splice(state.currentVideo.dislike.indexOf(action.payload, 1));
          }
          state.currentVideo.likes.push(action.payload)
        }
      },
      dislike: (state, action) =>{
        if(!state.currentVideo.dislike.includes(action.payload)){
          if(state.currentVideo.likes.includes(action.payload)){
            state.currentVideo.likes.splice(state.currentVideo.likes.indexOf(action.payload, 1));
          }
          state.currentVideo.dislike.push(action.payload)
        }
      },
    },
  })
  
export const { fetchStart, fetchFail, fetchSuccess, like, dislike } = videoSlice.actions
  
export default videoSlice.reducer
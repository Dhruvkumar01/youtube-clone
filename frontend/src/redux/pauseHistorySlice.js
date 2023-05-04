import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pauseHistory: false,
}

export const pauseHistorySlice = createSlice({
    name: 'pauseHistory',
    initialState,
    reducers: {
      changePauseHistoryStatus: (state)=>{
        if(state.pauseHistory===true){
            state.pauseHistory= false;
        } else{
            state.pauseHistory= true
        }
      }
    },
  })
  
// Action creators are generated for each case reducer function
export const { changePauseHistoryStatus } = pauseHistorySlice.actions
  
export default pauseHistorySlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentTheme: "light",
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      changeMode: (state)=> {
        if(state.currentTheme==="light"){
            state.currentTheme= "dark";
        }else{
            state.currentTheme= "light"
        }
      }
    },
  })
  
// Action creators are generated for each case reducer function
export const { changeMode } = themeSlice.actions
  
export default themeSlice.reducer
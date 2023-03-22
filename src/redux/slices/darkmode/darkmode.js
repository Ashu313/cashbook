
import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  darkmode: false,
 
  
}

const themeSlice = createSlice({
  name:"theme",
  initialState,
  reducers: {
    setDarkTheme(state) {
     
      state.darkmode = true;
       
     
    },
    setDefaultTheme(state) {
      state.darkmode = false;
      
     
    },
  },
});

export const { setDarkTheme, setDefaultTheme } = themeSlice.actions;

export default themeSlice.reducer;

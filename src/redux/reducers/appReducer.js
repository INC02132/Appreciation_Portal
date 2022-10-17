import { createSlice } from "@reduxjs/toolkit";
export const appReducer = createSlice({
  name: "appReducer",
  initialState: {
    selectedNavIndex: 0,
    selectedCardIndex: 0,
    templateData: []
  },
  reducers: {
    //Navigation related reducer
    setSelectedNavIndex: (state, action) => {
      state.selectedNavIndex = action.payload || 0;
    },
    setSelectedCardIndex: (state, action) =>{
      state.selectedNavIndex = action.payload || 0;
    },
    setTemplateData: (state, action) => {
      state.templateData = action.payload;
    }
  },
});


export const { setSelectedNavIndex, setSelectedCardIndex, setTemplateData } = appReducer.actions;

export default appReducer.reducer;

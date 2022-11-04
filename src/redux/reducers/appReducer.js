import { createSlice } from "@reduxjs/toolkit";
export const appReducer = createSlice({
  name: "appReducer",
  initialState: {
    selectedNavIndex: 0,
    selectedCardIndex: 0,
    templateData: [],
    leaderBoardData: [],
    userRole: "user",
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
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    setLeaderBoardData: (state, action) => {
      state.leaderBoardData = action.payload;
    }
  },
});


export const { setSelectedNavIndex, setSelectedCardIndex, setTemplateData, setUserRole, setLeaderBoardData } = appReducer.actions;

export default appReducer.reducer;

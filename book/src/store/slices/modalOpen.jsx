import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpenModal:false
  },
  reducers: {
    setOpenModal:(state,action) => {
            state.isOpenModal = action.payload
    }
  },
});

export const { setOpenModal} = modalSlice.actions;
export default modalSlice.reducer;
// extraReducers: {
//   [getHomeData.pending]: (state, action) => {
//       console.log('pending')
//   },
//   [getHomeData.fulfilled]: (state, action) => {
//       console.log('success')
//   },
// },

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser } from "../../services/user";
import { setLogOut } from "./authSlice";
export const fetchCurrentUser = createAsyncThunk(
  "user/fetch",
  async (dispatch) => {
    // const {page,limit,category} = data
    try {
      // console.log(id)
      const res = await getCurrentUser();
      if(res?.data.err === 0){

        return res?.data?.userData;
      }else{
      dispatch(setLogOut())

      }
    } catch (error) {
      console.log(error);
      dispatch(setLogOut())
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser:{}
  },
  reducers: {

    setLogOutCurrentUser:(state,action) => {
        state.currentUser = null
    }
  },
  extraReducers: (builder) => {

    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.currentUser = {};
    });
  },
});

export const { setLogOutCurrentUser} = userSlice.actions;
export default userSlice.reducer;
// extraReducers: {
//   [getHomeData.pending]: (state, action) => {
//       console.log('pending')
//   },
//   [getHomeData.fulfilled]: (state, action) => {
//       console.log('success')
//   },
// },

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginAuth, registerAuth } from "../../services/auth";


export  const registerUser = createAsyncThunk("auth/register",async (payload) => {
  try{

    const res = await registerAuth(payload)
    return res?.data
    
  }catch(error){
    console.log(error)
    throw new Error()
  }
})
export  const loginUser = createAsyncThunk("auth/login",async (payload) => {
  try{

    const res = await loginAuth(payload)
     
    return res?.data

  }catch(error){
    console.log(error)
  }
})
const authReducer = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
    msg: "",
    update: false,
    errCode:null,
    refreshToken:null
  },
  reducers: {
    // setRegisterSuccess: (state, action) => {
    //   return {
    //     ...state,
    //     isLoggedIn: true,
    //     token: action.data,
    //     msg: "",
    //   };
    // },
    // setLoginSuccess: (state, action) => {
    //   return {
    //     ...state,
    //     isLoggedIn: true,
    //     token: action.data,
    //     msg: "",
    //   };
    // },
    // setRegisterFailed: (state, action) => {
    //   return {
    //     ...state,
    //     isLoggedIn: false,
    //     msg: action.data,
    //     token: null,
    //     update: !state.update,
    //   };
    // },
    // setLoginFailed: (state, action) => {
    //   return {
    //     ...state,
    //     isLoggedIn: false,
    //     msg: action.data,
    //     token: null,
    //     update: !state.update,
    //   };
    // },
    setLogOut: (state, action) => {
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        msg: "",
      };
    },
  },
  extraReducers:(builder) => {
    builder.addCase(registerUser.fulfilled,(state,action) => {
      state.msg=action.payload.msg
      state.token=action.payload.accessToken
      state.errCode=action.payload.err
      state.refreshToken=action.payload.refreshToken

      state.isLoggedIn=true
    })
    builder.addCase(registerUser.rejected,(state,action) => {
      state.msg=action.payload.msg
      state.token=null
      state.errCode=action.payload.err
      state.refreshToken=null
      state.isLoggedIn=false
    })
    builder.addCase(loginUser.fulfilled,(state,action) => {
      state.msg=action.payload.msg
      state.token=action.payload.accessToken
      state.refreshToken=action.payload.refreshToken
      state.errCode=action.payload.err
      state.isLoggedIn=true
    })
    builder.addCase(loginUser.rejected,(state,action) => {
      state.msg=action.payload.msg
      state.token=null
      state.errCode=action.payload.err
      state.refreshToken=null

      state.isLoggedIn=false
    })
  }
});

export const {
  setRegisterSuccess,
  setLoginSuccess,
  setRegisterFailed,
  setLoginFailed,
  setLogOut,
} = authReducer.actions;
export default authReducer.reducer;

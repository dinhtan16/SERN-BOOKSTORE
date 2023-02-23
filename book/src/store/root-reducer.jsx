import { combineReducers } from "redux";
import userSlice from "./slices/userSlice";
import authSlice from './slices/authSlice';
import allBookSlice from './slices/bookSlice'
import cartSlice from "./slices/cartSlice";
import {  persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
const persistConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};
const authConfig = {
    ...persistConfig,
    key: 'auth',
    whitelist: ['isLoggedIn', 'token']
}
const userConfig = {
  ...persistConfig,
  key: 'user',
  whitelist: ['currentUser']
}

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authSlice),
    books:allBookSlice,
    user:persistReducer(userConfig, userSlice),
    cart:cartSlice
});
export default rootReducer;

import { combineReducers } from "redux";

import authSlice from './slices/authSlice';
import allBookSlice from './slices/bookSlice'
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


const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authSlice),
    books:allBookSlice
});
export default rootReducer;

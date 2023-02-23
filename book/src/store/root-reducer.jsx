import { combineReducers } from "redux";
import userSlice from "./slices/userSlice";
import authSlice from './slices/authSlice';
import allBookSlice from './slices/bookSlice'
import cartSlice from "./slices/cartSlice";
import {  persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import modalSlice from './slices/modalOpen'
import userOrderSlice from "./slices/orderSlice";
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
const bookSlice = {
  ...persistConfig,
  key: 'book',
  whitelist: ['bookDetail']
}
const userOrderConfig = {
  ...persistConfig,
  key: 'order',
  whitelist: ['userOrders']
}
const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authSlice),
    books:persistReducer(bookSlice,allBookSlice),
    user:persistReducer(userConfig, userSlice),
    cart:cartSlice,
    modal:modalSlice,
    order:(userOrderConfig, userOrderSlice)
});
export default rootReducer;

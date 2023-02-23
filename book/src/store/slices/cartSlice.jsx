import { createSlice } from "@reduxjs/toolkit";

const storeCart = JSON.parse(localStorage.getItem("Cart"));
const storeTotalCart = JSON.parse(localStorage.getItem("total"));
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems:storeCart || [],
    totals:+storeTotalCart || 0,
  },
  reducers: {
    addCart: (state, action) => {
      const newItem = action.payload;
      const existedItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      if (existedItem) {
        existedItem.quantity++;
      } else {
        state.cartItems.push({ ...newItem, quantity: 1 });
      }
      state.totals = state.cartItems.reduce((total, item) => {
        return (+total + +item.price * +item.quantity).toFixed(2);
      },0);
      localStorage.setItem("Cart", JSON.stringify(state.cartItems));
      localStorage.setItem("total", JSON.stringify(state.totals));
    },
    deleteCart: (state, action) => {
      const itemDelete = action.payload;
      const isExistedItem = state.cartItems.find(
        (item) => item.id === itemDelete.id
      );

      if (isExistedItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
            (item) => item.id !== isExistedItem.id
          );
      } else {
        isExistedItem.quantity--;
        state.totals = state.cartItems.reduce((total, item) => {
          return (+total + +item.price * +item.quantity).toFixed(2);
        }, 0);
      }
      state.totals = state.cartItems.reduce((total, item) => {
        return(+total + +item.price * +item.quantity).toFixed(2);
      }, 0);
      localStorage.setItem("total", JSON.stringify(state.totals));
      localStorage.setItem("Cart", JSON.stringify(state.cartItems));
    },
  },
});

export const { addCart,deleteCart } = cartSlice.actions;
export default cartSlice.reducer;
// extraReducers: {
//   [getHomeData.pending]: (state, action) => {
//       console.log('pending')
//   },
//   [getHomeData.fulfilled]: (state, action) => {
//       console.log('success')
//   },
// },

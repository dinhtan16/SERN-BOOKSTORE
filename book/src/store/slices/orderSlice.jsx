import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBooksLimit, getAllBooks } from "../../services/books";
import { getOrderService } from "../../services/cart";
export const getUserOrder = createAsyncThunk("order/fetch", async () => {
  // const {page,limit,category} = data
  try {
    // console.log(id)
    const res = await getOrderService();
    if (res?.status === 200) {
      return res?.data;
    }

    // console.log(res?.data)
  } catch (error) {
    console.log(error);
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    userOrders: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserOrder.fulfilled, (state, action) => {
      state.userOrders = action.payload;
    });
  },
});

// export const { setCurrentPageSize} = allBookSlice.actions;
export default orderSlice.reducer;
// extraReducers: {
//   [getHomeData.pending]: (state, action) => {
//       console.log('pending')
//   },
//   [getHomeData.fulfilled]: (state, action) => {
//       console.log('success')
//   },
// },

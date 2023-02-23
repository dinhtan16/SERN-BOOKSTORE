import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBooksLimit, getAllBooks ,getOneBookService} from "../../services/books";
export const getAllBooksDataLimit = createAsyncThunk(
  "books/fetch",
  async (query) => {
    // const {page,limit,category} = data
    try {
      // console.log(id)
      const res = await getAllBooksLimit(query);

      // console.log(data);
     
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getAllBooksDefault = createAsyncThunk(
  "booksAll/fetch",
  async (data) => {
    // const {page,limit} = data
    try {
      // console.log(id)
      const res = await getAllBooks(data);

      // console.log(res.data);
     
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getOneBook = createAsyncThunk(
  "bookOne/fetch",
  async (id) => {
    // const {page,limit} = data
    try {
      // console.log(id)
      const res = await getOneBookService({id:id});

      // console.log(res.data);
     
      return res?.data.bookData;
    } catch (error) {
      console.log(error);
    }
  }
);
const allBookSlice = createSlice({
  name: "books",
  initialState: {
    allBookLimit: [],
    currentPagesize:10,
    allBook:[],
    bookDetail:null
  },
  reducers: {
    setCurrentPageSize:(state,action) => {
      state.currentPagesize = action.payload
    }

    
  },
  extraReducers: (builder) => {

    builder.addCase(getAllBooksDataLimit.fulfilled, (state, action) => {
      state.allBookLimit = action.payload;
    });
    builder.addCase(getAllBooksDefault.fulfilled, (state, action) => {
      state.allBook = action.payload;
    });
    builder.addCase(getOneBook.fulfilled, (state, action) => {
      state.bookDetail = action.payload;
    });
  },
});

export const { setCurrentPageSize} = allBookSlice.actions;
export default allBookSlice.reducer;
// extraReducers: {
//   [getHomeData.pending]: (state, action) => {
//       console.log('pending')
//   },
//   [getHomeData.fulfilled]: (state, action) => {
//       console.log('success')
//   },
// },

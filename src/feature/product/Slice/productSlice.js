import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as productService from "../../../api/productApi";
const initialState = {
  productModels: [],
  loading: false,
};

export const getProductModelAsync = createAsyncThunk(
  "product/getProductModelAsync",
  async (input, thunkApi) => {
    try {
      const res = await productService.getProductModel();
      console.log("res.data");
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProductModelAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductModelAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.productModels = action.payload;
      })
      .addCase(getProductModelAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;

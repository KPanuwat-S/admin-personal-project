import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as productService from "../../../api/productApi";
const initialState = {
  productModels: [],
  productModel: {},
  productModelItems: [],
  loading: false,
  error: null,
  categories: [],
  isEdit: false,
};

// Create
export const createProductItemAsync = createAsyncThunk(
  "product/createProductItemAsync",
  async (input, thunkApi) => {
    try {
      const res = await productService.createProductItem(input.id, input.data);
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const createProductModelAsync = createAsyncThunk(
  "product/createProductModelAsync",
  async (input, thunkApi) => {
    try {
      const res = await productService.createProductModel(input);
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

// Get
export const getProductModelItemsAsync = createAsyncThunk(
  "product/getProductModelItemsAsync",
  async (input, thunkApi) => {
    try {
      const res = await productService.getProductModelItems(input);
      return res.data.productDetail;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const getProductModelAsync = createAsyncThunk(
  "product/getProductModelAsync",
  async (input, thunkApi) => {
    try {
      const res = await productService.getProductModel();
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const getOneProductModelAsync = createAsyncThunk(
  "product/getOneProductModelAsync",
  async (input, thunkApi) => {
    try {
      const res = await productService.getOneProductModel(input);
      console.log("res", res.data);
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const getProductCategoryAsync = createAsyncThunk(
  "product/getProductCategoryAsync",
  async (input, thunkApi) => {
    try {
      const res = await productService.getProductCategory();
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

// Edit
export const editProductModelAsync = createAsyncThunk(
  "product/editProductModelAsync",
  async (input, thunkApi) => {
    try {
      await productService.editProductModel(input.id, input.data);
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);
//Delete
export const deleteProductModelAsync = createAsyncThunk(
  "product/deleteProductModelAsync",
  async (input, thunkApi) => {
    try {
      const res = await productService.deleteProductModel(input);
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const deleteProductItemAsync = createAsyncThunk(
  "product/deleteProductItemAsync",
  async (input, thunkApi) => {
    try {
      const res = await productService.deleteProductItem(
        input.id,
        input.colorId
      );
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setEditMode: (state, action) => {
      state.isEdit = true;
    },
    setIsNotEditMode: (state, action) => {
      state.isEdit = false;
    },
  },
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
      })
      .addCase(getOneProductModelAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getOneProductModelAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.productModel = action.payload ?? {};
      })
      .addCase(getOneProductModelAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductModelItemsAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductModelItemsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.productModelItems = action.payload ?? [];
      })
      .addCase(getProductModelItemsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProductItemAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createProductItemAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createProductItemAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductCategoryAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(createProductModelAsync.fulfilled, (state, action) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
export const { setEditMode, setIsNotEditMode } = productSlice.actions;

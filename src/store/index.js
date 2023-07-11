import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../feature/product/Slice/productSlice";

export default configureStore({
  reducer: {
    product: productReducer,
  },
});

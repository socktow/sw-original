import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer/dummyReducer";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

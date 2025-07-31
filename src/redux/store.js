import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/languageSlice";
import userReducer from "./slices/userSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ← tắt kiểm tra serialize
    }),
});

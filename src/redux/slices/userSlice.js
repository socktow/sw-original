import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    clearUser(state) {
      state.user = null;
      state.loading = false;
    },
    updateUser(state, action) {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
});

export const { setUser, clearUser , updateUser } = userSlice.actions;
export default userSlice.reducer;

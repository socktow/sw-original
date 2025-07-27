// redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import channel from "@/lib/broadcast"; // 👈 import broadcast

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.items.push(action.payload);

      // 👇 Broadcast cho các tab khác biết
      if (channel) {
        channel.postMessage({ type: "ADD", payload: action.payload });
      }
    },
    syncCart(state, action) {
      state.items.push(action.payload);
    },
    resetCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, syncCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;

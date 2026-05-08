import { createSlice } from "@reduxjs/toolkit";

const cartFromStorage = JSON.parse(localStorage.getItem("cart"));

const initialState = {
  cartItems: cartFromStorage || [],
  
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find(
        (x) => x._id === item._id
      );

      if (existItem) {
        existItem.qty += 1;
      } else {
        state.cartItems.push({ ...item, qty: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x._id !== action.payload
      );

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    // INCREASE QTY
     increaseQty: (state, action) => {
      const item = state.cartItems.find(
        (x) => x._id === action.payload
      );

      if (item) {
        item.qty += 1;
      }
    },

    //  DECREASE QTY
    decreaseQty: (state, action) => {
      const item = state.cartItems.find(
        (x) => x._id === action.payload
      );

      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    },
    

    clearCart: (state) => {
  state.cartItems = [];
}
  },
});

export const { addToCart, increaseQty,
  decreaseQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
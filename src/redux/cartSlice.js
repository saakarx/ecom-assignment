import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartId: '',
  quantity: 0,
  items: []
};

export const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    initCart(state, action) {
      state.cartId = action.payload.id;
      state.quantity = action.payload.quantity;
      state.items = [...action.payload.items];
    },
    addToCart(state, action) {
      const itemInCart = state.items.find(
        item => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity += 1;
      } else {
        const item = { ...action.payload };
        item.quantity += 1;
        state.items.push(item);
      }
      state.quantity += 1;
    },
    incrementQuantity(state, action) {
      const itemToIncrement = state.items.find(
        item => item.id === action.payload
      );
      itemToIncrement.quantity += 1;
      state.quantity += 1;
    },
    decrementQuantity(state, action) {
      const itemToDecrement = state.items.find(
        item => item.id === action.payload
      );
      if (itemToDecrement.quantity <= 1)
        state.items = state.items.filter(item => item.id !== action.payload);
      else itemToDecrement.quantity -= 1;
      state.quantity -= 1;
    },
    removeItem(state, action) {
      const itemIndex = state.items.findIndex(
        item => item.id === action.payload
      );
      if (itemIndex < 0) return;
      const quantity = state.items[itemIndex].quantity;
      state.quantity = state.quantity - quantity;
      state.items.splice(itemIndex, 1);
    }
  }
});

const { actions, reducer } = cartSlice;
export const {
  initCart,
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem
} = actions;
export default reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  error: '',
  products: []
};

export const fetchProducts = createAsyncThunk(
  'Products/fetchProducts',
  async () => {
    const { data } = await axios.get('https://fakestoreapi.com/products');
    const updatedData = data.map(item => {
      item.quantity = 0;
      return item;
    });
    return updatedData;
  }
);

const productsSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    incrementQuantityProduct(state, action) {
      const itemToIncrement = state.products.findIndex(
        item => item.id === action.payload
      );
      state.products[itemToIncrement].quantity += 1;
    },
    decrementQuantityProduct(state, action) {
      const itemToIncrement = state.products.findIndex(
        item => item.id === action.payload
      );
      state.products[itemToIncrement].quantity -= 1;
    },
    removeItemProduct(state, action) {
      const itemIndex = state.products.findIndex(
        item => item.id === action.payload
      );
      state.products[itemIndex].quantity = 0;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = [...action.payload];
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.products = [];
      state.error = action.payload;
    });
  }
});

const { actions, reducer } = productsSlice;
export const {
  incrementQuantityProduct,
  decrementQuantityProduct,
  removeItemProduct
} = actions;
export default reducer;

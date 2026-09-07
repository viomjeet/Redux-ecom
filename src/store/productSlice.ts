import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../Services/productService';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const data = await productService.getProducts(8);
    return data.products;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Kuch gadbad hui!';
      });
  },
});

export default productSlice.reducer;
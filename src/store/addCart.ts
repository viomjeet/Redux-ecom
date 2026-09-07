import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state: any, action: any) => {
      const item = action.payload;
      const existingItem = state.items.find((i: any) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeItem: (state: any, action: any) => {
      state.items = state.items.filter((i: any) => i.id !== action.payload);
    },
    incrementQty: (state: any, action: any) => {
      const item = state.items.find((i: any) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQty: (state: any, action: any) => {
      const item = state.items.find((i: any) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i: any) => i.id !== action.payload);
        }
      }
    },
  },
});

export const { addItem, removeItem, incrementQty, decrementQty } = cartSlice.actions;
export default cartSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  price: number;
  // Add more properties as needed
}

interface SubTotal {
  index: number;
  price: number;
}

interface Discount {
  index: number;
  discount: number;
}

interface CartState {
  cartItems: CartItem[];
  subTotals: number[];
  discounts: number[];
}

const initialState: CartState = {
  cartItems: [],
  subTotals: [],
  discounts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cartItems.push(action.payload);
    },
    addSubTotalsWithoutDiscount: (state, action: PayloadAction<SubTotal>) => {
      const { index, price } = action.payload;
      state.subTotals[index] = price;
    },
    addDiscounts: (state, action: PayloadAction<Discount>) => {
      const { index, discount } = action.payload;
      state.discounts[index] = discount;
    },
    removeCartItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.subTotals = [];
      state.discounts = [];
    },
  },
});

export const {
  addToCart,
  removeCartItem,
  clearCart,
  addSubTotalsWithoutDiscount,
  addDiscounts,
} = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces for cart item, subtotal, and discount
interface CartItem {
  id: number;
  title: string;
  price: number;
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

// Helper function to load cart state from localStorage
const loadCartFromLocalStorage = (): CartState => {
  const savedCart = localStorage.getItem("cartState");
  return savedCart
    ? JSON.parse(savedCart)
    : { cartItems: [], subTotals: [], discounts: [] };
};

// Initial state - load from localStorage if available
const initialState: CartState = loadCartFromLocalStorage();

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cartItems.push(action.payload);
      saveCartToLocalStorage(state); // Save updated state to localStorage
    },
    addSubTotalsWithoutDiscount: (state, action: PayloadAction<SubTotal>) => {
      const { index, price } = action.payload;
      if (index >= 0 && index < state.subTotals.length) {
        state.subTotals[index] = price;
      } else {
        state.subTotals.push(price);
      }
      saveCartToLocalStorage(state); // Save updated state to localStorage
    },
    addDiscounts: (state, action: PayloadAction<Discount>) => {
      const { index, discount } = action.payload;
      if (index >= 0 && index < state.discounts.length) {
        state.discounts[index] = discount;
      } else {
        state.discounts.push(discount);
      }
      saveCartToLocalStorage(state); // Save updated state to localStorage
    },
    removeCartItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state); // Save updated state to localStorage
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.subTotals = [];
      state.discounts = [];
      localStorage.removeItem("cartState"); // Clear cart from localStorage
    },
  },
});

// Helper function to save cart state to localStorage
const saveCartToLocalStorage = (state: CartState) => {
  localStorage.setItem("cartState", JSON.stringify(state));
};

export const {
  addToCart,
  removeCartItem,
  clearCart,
  addSubTotalsWithoutDiscount,
  addDiscounts,
} = cartSlice.actions;

export default cartSlice.reducer;

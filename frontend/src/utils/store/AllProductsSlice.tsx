import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  price: number;
  brands: string[];
  discounts: number[];
  ratings: number[];
}

interface Product {
  id: number;
  price: number;
  title: string;
  images: string[];
  discountPercentage: number;
  brand: string;
  rating: number;
}

interface ProductState {
  dealProducts: Product[];
  categoryProducts: Record<string, Product[]>;
  productInfo: Product | null;
  filteredProducts: Product[];
  filters: FiltersState;
}

const initialState: ProductState = {
  dealProducts: [],
  categoryProducts: {},
  productInfo: null,
  filteredProducts: [],
  filters: {
    price: Infinity,
    brands: [],
    discounts: [],
    ratings: [],
  },
};

export const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    addDealProducts: (state, action: PayloadAction<Product[]>) => {
      state.dealProducts = action.payload;
    },
    addCategoryProducts: (state, action: PayloadAction<Record<string, Product[]>>) => {
      state.categoryProducts = { ...state.categoryProducts, ...action.payload };
    },
    addProductInfo: (state, action: PayloadAction<Product>) => {
      state.productInfo = action.payload;
    },
    addFilteredProducts: (state, action: PayloadAction<Product[]>) => {
      state.filteredProducts = action.payload;
    },
    addPriceFilter: (state, action: PayloadAction<number>) => {
      state.filters.price = action.payload;
    },
    addBrandFilter: (state, action: PayloadAction<string>) => {
      if(action.payload.length===0){
        state.filters.brands=[];
      }else{
        state.filters.brands.push(action.payload);
      }
    },
    removeBrandFilter: (state, action: PayloadAction<string>) => {
      const brands=state.filters.brands;
      state.filters.brands.splice(brands.indexOf(action.payload),1);    //remove element
    },
    
    addDiscountFilter: (state, action: PayloadAction<number>) => {
      if (!state.filters.discounts.includes(action.payload)) {
        state.filters.discounts.push(action.payload);
      }
    },
    removeDiscountFilter: (state, action: PayloadAction<number>) => {
      state.filters.discounts = state.filters.discounts.filter((discount) => discount !== action.payload);
    },
    addRatingFilter: (state, action: PayloadAction<number>) => {
      if (!state.filters.ratings.includes(action.payload)) {
        state.filters.ratings.push(action.payload);
      }
    },
    removeRatingFilter: (state, action: PayloadAction<number>) => {
      state.filters.ratings = state.filters.ratings.filter((rating) => rating !== action.payload);
    },
  },
});

export const {
  addDealProducts,
  addCategoryProducts,
  addProductInfo,
  addFilteredProducts,
  addPriceFilter,
  addBrandFilter,
  removeBrandFilter,
  addDiscountFilter,
  removeDiscountFilter,
  addRatingFilter,
  removeRatingFilter,
} = ProductSlice.actions;

export default ProductSlice.reducer;

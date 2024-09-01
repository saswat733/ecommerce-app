import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
    price: number;
    brands: string[];
    discounts: number[];
    ratings: number[];
}

interface ProductState {
    dealProducts: any[];  // You can replace `any` with a specific product type
    categoryProducts: Record<string, any[]>;  // Keyed by category name, contains arrays of products
    productInfo: any | null;  // Replace `any` with the specific product type or null
    filteredProducts: any[];  // Replace `any` with the specific product type
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
    }
};

export const ProductSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {
        addDealProducts: (state, action: PayloadAction<any[]>) => {
            state.dealProducts = action.payload;
        },
        addCategoryProducts: (state, action: PayloadAction<Record<string, any[]>>) => {
            state.categoryProducts = { ...state.categoryProducts, ...action.payload };
        },
        addProductInfo: (state, action: PayloadAction<any>) => {
            state.productInfo = action.payload;
        },
        addFilteredProducts: (state, action: PayloadAction<any[]>) => {
            state.filteredProducts = action.payload;
        },

        // Filters
        addPriceFilter: (state, action: PayloadAction<number>) => {
            state.filters.price = action.payload;
        },
        addBrandFilter: (state, action: PayloadAction<string>) => {
            if (!state.filters.brands.includes(action.payload)) {
                state.filters.brands.push(action.payload);
            }
        },
        removeBrandFilter: (state, action: PayloadAction<string>) => {
            state.filters.brands = state.filters.brands.filter(brand => brand !== action.payload);
        },
        addDiscountFilter: (state, action: PayloadAction<number>) => {
            if (!state.filters.discounts.includes(action.payload)) {
                state.filters.discounts.push(action.payload);
            }
        },
        removeDiscountFilter: (state, action: PayloadAction<number>) => {
            state.filters.discounts = state.filters.discounts.filter(discount => discount !== action.payload);
        },
        addRatingFilter: (state, action: PayloadAction<number>) => {
            if (!state.filters.ratings.includes(action.payload)) {
                state.filters.ratings.push(action.payload);
            }
        },
        removeRatingFilter: (state, action: PayloadAction<number>) => {
            state.filters.ratings = state.filters.ratings.filter(rating => rating !== action.payload);
        }
    }
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
    removeRatingFilter
} = ProductSlice.actions;

export default ProductSlice.reducer;

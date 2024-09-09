import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchCache {
  [key: string]: string[];
}

interface GeminiFilteredSearch {
  price?: number | null;
  isPriceUnder?: boolean | null;
  brand?: string | null;
  [key: string]: any;
}

interface AppState {
  isSideBar: boolean;
  loginPopUp: boolean;
  searchCache: SearchCache;
  geminiFilteredSearch: GeminiFilteredSearch;
}

const SEARCH_CACHE_LIMIT = 5;

const initialState: AppState = {
  isSideBar: false,
  loginPopUp: false,
  searchCache: {},
  geminiFilteredSearch: {},
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isSideBar = !state.isSideBar;
    },
    toggleLoginPopUp: (state) => {
      state.loginPopUp = !state.loginPopUp;
    },
    addSearchCache: (state, action: PayloadAction<SearchCache>) => {
      if (Object.keys(state.searchCache).length >= SEARCH_CACHE_LIMIT) {
        const firstKey = Object.keys(state.searchCache)[0];
        delete state.searchCache[firstKey];
      }
      state.searchCache = { ...state.searchCache, ...action.payload };
    },
    addGeminiFilteredSearch: (state, action: PayloadAction<GeminiFilteredSearch>) => {
      state.geminiFilteredSearch = { ...state.geminiFilteredSearch, ...action.payload };
    },
    removeGeminiFilter: (state) => {
      state.geminiFilteredSearch = {};
    },
    removeGeminiPriceFilter: (state) => {
      state.geminiFilteredSearch.price = null;
    },
    removeGeminiIsPriceUnder: (state) => {
      state.geminiFilteredSearch.isPriceUnder = null;
    },
    removeGeminiBrandFilter: (state) => {
      state.geminiFilteredSearch.brand = null;
    },
  },
});

export const {
  toggleSideBar,
  toggleLoginPopUp,
  addSearchCache,
  addGeminiFilteredSearch,
  removeGeminiFilter,
  removeGeminiPriceFilter,
  removeGeminiIsPriceUnder,
  removeGeminiBrandFilter,
} = appSlice.actions;

export default appSlice.reducer;

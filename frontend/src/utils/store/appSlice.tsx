import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchCache {
  [key: string]: any;
}

interface AppState {
  isSideBar: boolean;
  loginPopUp: boolean;
  searchCache: SearchCache;
  filteredSearch: SearchCache;
}

const initialState: AppState = {
  isSideBar: false,
  loginPopUp: false,
  searchCache: {},
  filteredSearch: {}
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.isSideBar = !state.isSideBar;
    },
    addLoginPopUp: (state) => {
      state.loginPopUp = !state.loginPopUp;
    },
    addSearchCache: (state, action: PayloadAction<SearchCache>) => {
      if (Object.keys(state.searchCache).length > 5) {
        const firstKey = Object.keys(state.searchCache)[0];
        delete state.searchCache[firstKey];
      }
      state.searchCache = { ...state.searchCache, ...action.payload };
    },
    clearSearchCache: (state) => {
      state.searchCache = {};
    },
    addFilteredSearch: (state, action: PayloadAction<SearchCache>) => {
      state.filteredSearch = { ...state.filteredSearch, ...action.payload };
    }
  }
});

export const { toggleSideBar, addLoginPopUp, addSearchCache, clearSearchCache, addFilteredSearch } = appSlice.actions;
export default appSlice.reducer;

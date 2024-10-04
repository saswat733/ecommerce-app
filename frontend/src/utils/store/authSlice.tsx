import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  id: number | null;
  email: string;
}

interface UserState {
  isAuthenticated: boolean;
  token: string | null;
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  token: localStorage.getItem("authToken"), // Get token from localStorage on init
  userInfo: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string; userInfo: UserInfo }>) => {
      state.loading = false;
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
      state.isAuthenticated = true;

      // Store token in localStorage
      localStorage.setItem("authToken", action.payload.token);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userInfo = null;
      state.loading = false;
      state.error = null;

      // Remove token from localStorage
      localStorage.removeItem("authToken");
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;

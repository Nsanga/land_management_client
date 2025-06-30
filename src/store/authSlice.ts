import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;  // Optional field
  // Add other user properties as needed
  [key: string]: unknown; // For additional dynamic properties
}

export interface User {
  _id: string;
  token: string;
  userInfo: UserInfo;
  // Add other user properties as needed
  [key: string]: unknown; // For additional dynamic properties
}

interface AuthState {
  loading: boolean;
  error: string | null;
  success: boolean;
  user: User | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  success: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    stopLoading: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.success = true;
      state.user = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("authUser", JSON.stringify(action.payload));
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.success = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("authUser");
      }
    },
  },
});

export const {
  startLoading,
  stopLoading,
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginFailure,
  resetAuthState,
  logout,
} = authSlice.actions;
export default authSlice.reducer;

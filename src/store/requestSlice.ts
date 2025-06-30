import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./authSlice";

export interface Request {
  _id: string;
  urgency: string;
  requestNumber: string;
  propertyType: string;
  agent: User;
  createdAt: string;
  status: string;
}

interface RequestState {
  loading: boolean;
  error: string | null;
  success: boolean;
  request: Request[];
}

const initialState: RequestState = {
  loading: false,
  error: null,
  success: false,
  request: [],
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    startLoadingRequests: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    stopLoading: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    fetchRequestSuccess: (state, action: PayloadAction<Request[]>) => {
      state.loading = false;
      state.success = true;
      state.request = action.payload;
    },
    fetchRequestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addRequestSuccess: (state, action: PayloadAction<Request>) => {
      state.loading = false;
      state.success = true;
      state.request = [action.payload, ...state.request];
    },
    addRequestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  startLoadingRequests,
  stopLoading,
  fetchRequestSuccess,
  fetchRequestFailure,
  addRequestSuccess,
  addRequestFailure,
} = requestSlice.actions;
export default requestSlice.reducer;

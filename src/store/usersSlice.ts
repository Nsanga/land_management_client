import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "./authSlice";

interface UsersState {
  agents: UserInfo[];
  loading: boolean;
  success: boolean;
  error: string | null;
  user_agents: UserInfo[];
}

const initialState: UsersState = {
  agents: [],
  loading: false,
  success: false,
  error: null,
  user_agents: []
};

const usersSlice = createSlice({
  name: "user_agents",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    fetchAgentsFonciersSuccess: (state, action: PayloadAction<UserInfo[]>) => {
      state.loading = false;
      state.success = true;
      state.user_agents = action.payload;
    },
    fetchAgentsFonciersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  startLoading,
  fetchAgentsFonciersSuccess,
  fetchAgentsFonciersFailure,
} = usersSlice.actions;
export default usersSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/authSlice";
import usersReducer from "@/store/usersSlice";
import requestReducer from "@/store/requestSlice";
import uiReducer from "@/store/uiSlice";

let preloadedUser = null;
if (typeof window !== 'undefined') {
  const storedUser = localStorage.getItem('authUser');
  if (storedUser) {
    preloadedUser = JSON.parse(storedUser);
  }
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user_agents: usersReducer,
    request: requestReducer,
    ui: uiReducer,
    // tu peux ajouter d'autres reducers ici
  },
  preloadedState: {
    auth: {
      loading: false,
      error: null,
      success: !!preloadedUser,
      user: preloadedUser,
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

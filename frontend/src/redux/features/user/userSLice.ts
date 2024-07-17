import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser, UserState } from "../../../types/userSateData";

const initialState: UserState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ token: string; user: TUser }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout, updateUserFromLocalStorage } =
  userSlice.actions;

export default userSlice.reducer;

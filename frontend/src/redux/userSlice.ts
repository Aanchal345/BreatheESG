import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../interfaces";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    SetCurrentUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { SetCurrentUser } = userSlice.actions;

export default userSlice;

export interface UserState {
  user: UserType | null;
}
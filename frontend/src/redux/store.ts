import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/baseApi";
import userSLice from "./features/user/userSLice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userSLice,
  },

  // TODO : have add middleware for endpoints
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

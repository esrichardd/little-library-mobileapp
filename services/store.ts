import { configureStore } from "@reduxjs/toolkit";
import { authApiService } from "./auth.service";
import { booksApiService } from "./books.service";

export const store = configureStore({
  reducer: {
    [authApiService.reducerPath]: authApiService.reducer,
    [booksApiService.reducerPath]: booksApiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiService.middleware,
      booksApiService.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

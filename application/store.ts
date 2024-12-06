import { configureStore } from "@reduxjs/toolkit";
import {
  authApiService,
  booksApiService,
} from "@/infraestructure/repositories";

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

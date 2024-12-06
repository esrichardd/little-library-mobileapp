import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "@/domain/models/User";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
export const authApiService = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL || "http://localhost:4000" }),
  endpoints: (builder) => ({
    login: builder.mutation<User, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiService;

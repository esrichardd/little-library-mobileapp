import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DetailedBook } from "@/domain/models/Books";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
export const booksApiService = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL || "http://localhost:4000" }),
  endpoints: (builder) => ({
    getBooks: builder.query<DetailedBook[], void>({
      query: () => "/books",
    }),
    getBookById: builder.query<DetailedBook, number>({
      query: (id) => `/books/${id}`,
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery } = booksApiService;

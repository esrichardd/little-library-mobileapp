import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export type CatalogBook = {
  id: number;
  title: string;
  author: string;
  pages: number;
  imageUrl: string;
  description: string;
  averageReadingTimeMs: number;
};

export type DetailedBook = {
  id: number;
  imageUrl: string;
  title: string;
  author: string;
  description: string;
  pages: string[];
};

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

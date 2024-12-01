import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = process.env.BASE_API_URL;

export type CatalogBook = {
  id: number;
  title: string;
  author: string;
  pages: number;
  description: string;
  averageReadingTimeMs: number;
};

export type DetailedBook = {
  id: number;
  title: string;
  author: string;
  pages: string[];
};

export const booksApiService = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL || "http://localhost:4000" }),
  endpoints: (builder) => ({
    getBooks: builder.query<CatalogBook[], void>({
      query: () => "/catalog",
    }),
    getBookById: builder.query<DetailedBook, number>({
      query: (id) => `/books/${id}`,
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery } = booksApiService;

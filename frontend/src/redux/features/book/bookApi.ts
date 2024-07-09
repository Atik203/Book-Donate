import { baseApi } from "../../api/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopularBooks: builder.query({
      query: () => ({
        url: `/book/popular/`,
        method: "GET",
      }),
    }),
    getAllBooks: builder.query({
      query: () => ({
        url: `/book/list/`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPopularBooksQuery, useGetAllBooksQuery } = bookApi;

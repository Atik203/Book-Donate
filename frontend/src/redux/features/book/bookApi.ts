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
      query: ({ page, search }) => ({
        url: `/book/list/`,
        method: "GET",
        params: { page, search },
      }),
    }),
  }),
});

export const { useGetPopularBooksQuery, useGetAllBooksQuery } = bookApi;

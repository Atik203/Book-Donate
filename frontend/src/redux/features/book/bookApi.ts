import { baseApi } from "../../api/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopularBooks: builder.query({
      query: () => ({
        url: `/book/popular/`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPopularBooksQuery } = bookApi;

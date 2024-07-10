import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => "/review/list/",
    }),

    getSingleBookReview: builder.query({
      query: (bookId) => `/review/list/?bookId=${bookId}`,
    }),
  }),
});

export const { useGetAllReviewsQuery, useGetSingleBookReviewQuery } = reviewApi;

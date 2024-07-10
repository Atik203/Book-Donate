import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => "/review/list/",
    }),

    getSingleBookReview: builder.query({
      query: (bookId) => `/review/list/?bookId=${bookId}`,
    }),
    postReview: builder.mutation({
      query: (data) => ({
        url: "/review/review-post/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useGetSingleBookReviewQuery,
  usePostReviewMutation,
} = reviewApi;

import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => "/review/list/",
    }),
  }),
});

export const { useGetAllReviewsQuery } = reviewApi;

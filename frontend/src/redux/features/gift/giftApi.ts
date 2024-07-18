import { baseApi } from "../../api/baseApi";

const giftApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGifts: builder.query({
      query: () => "/gift/list/",
      providesTags: ["Gift"],
    }),
    createGift: builder.mutation({
      query: (gift) => ({
        url: "/gift/add/",
        method: "POST",
        body: gift,
      }),
      invalidatesTags: ["Gift"],
    }),
    deleteGift: builder.mutation({
      query: (data) => ({
        url: `/gift/delete/`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Gift"],
    }),
    buyGift: builder.mutation({
      query: (data) => ({
        url: `/gift/buy/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Gift", "User"],
    }),
    getUserGifts: builder.query({
      query: (userId) => `/gift/user-gift/?id=${userId}`,
      providesTags: ["Gift"],
    }),
    allUserGifts: builder.query({
      query: () => "/gift/user-gift/",
      providesTags: ["Gift"],
    }),
  }),
});

export const {
  useGetAllGiftsQuery,
  useCreateGiftMutation,
  useDeleteGiftMutation,
  useBuyGiftMutation,
  useGetUserGiftsQuery,
  useAllUserGiftsQuery,
} = giftApi;

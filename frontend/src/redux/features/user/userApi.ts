import { TChnagePassword } from "../../../types/userSateData";
import { baseApi } from "../../api/baseApi";

type TUserInfo = {
  username: string;
  password: string;
};

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo: TUserInfo) => ({
        url: "/user/login/",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout/",
        method: "GET",
      }),
    }),
    getSingleUser: builder.query({
      query: (id: number) => ({
        url: `/user/list/?id=${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getClaimedBooks: builder.query({
      query: (id: number) => ({
        url: `/book/user-claimed-book/${id}/`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getDonatedBooks: builder.query({
      query: (id: number) => ({
        url: `/book/user-donated-book/${id}/`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    changePassword: builder.mutation({
      query: (data: TChnagePassword) => ({
        url: "/user/change-password/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetSingleUserQuery,
  useGetClaimedBooksQuery,
  useGetDonatedBooksQuery,
  useChangePasswordMutation,
} = userApi;

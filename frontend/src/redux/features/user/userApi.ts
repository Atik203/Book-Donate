/* eslint-disable @typescript-eslint/no-explicit-any */
import { TChangePassword } from "../../../types/userSateData";
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
      providesTags: ["User", "Book"],
    }),
    getDonatedBooks: builder.query({
      query: (id: number) => ({
        url: `/book/user-donated-book/${id}/`,
        method: "GET",
      }),
      providesTags: ["User", "Book"],
    }),
    changePassword: builder.mutation({
      query: (data: TChangePassword) => ({
        url: "/user/change-password/",
        method: "POST",
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: (data: any) => ({
        url: "/user/update-profile/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    signup: builder.mutation({
      query: (data: any) => ({
        url: "/user/register/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getAllUser: builder.query({
      query: () => ({
        url: "/user/list/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (data) => ({
        url: `/user/delete-user/`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    makeAdmin: builder.mutation({
      query: (data) => ({
        url: `/user/make-admin/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
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
  useUpdateProfileMutation,
  useSignupMutation,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useMakeAdminMutation,
} = userApi;

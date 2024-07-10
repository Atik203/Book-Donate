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
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetSingleUserQuery } =
  userApi;

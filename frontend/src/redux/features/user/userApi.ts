import { baseApi } from "../../api/baseApi";

type TUserInfo = {
  username: string;
  password: string;
};

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo: TUserInfo) => ({
        url: "/patient/login/",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.query({
      query: () => ({
        url: "/patient/logout/",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation } = userApi;

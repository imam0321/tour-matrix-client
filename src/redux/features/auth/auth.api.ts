import { baseApi } from "@/redux/baseApi";
import type {
  ILogin,
  ILoginResponseData,
  IRegister,
  IRegisterResponse,
  IResponse,
  ISendOtp,
  IVerifyOtp,
} from "@/types";
import type { User } from "@/types/auth.type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<ILoginResponseData>, ILogin>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    register: builder.mutation<IResponse<IRegisterResponse>, IRegister>({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    changePassword: builder.mutation<IResponse<null>, { oldPassword: string; newPassword: string }>({
      query: (payload) => ({
        url: "/auth/change-password",
        method: "POST",
        data: payload,
      }),
    }),
    setPassword: builder.mutation<IResponse<null>, { password: string }>({
      query: (password) => ({
        url: "/auth/set-password",
        method: "POST",
        data: password,
      }),
    }),
    sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
    userInfo: builder.query<User, unknown>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      transformResponse: (res: { data: User }) => res.data,
      providesTags: ["USER"]
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useChangePasswordMutation,
  useSetPasswordMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
  useUserInfoQuery,
} = authApi;

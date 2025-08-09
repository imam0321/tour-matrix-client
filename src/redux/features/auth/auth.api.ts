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

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<ILoginResponseData>, ILogin>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    register: builder.mutation<IResponse<IRegisterResponse>, IRegister>({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
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
  }),
});

export const { useLoginMutation, useRegisterMutation, useSendOtpMutation, useVerifyOtpMutation } =
  authApi;

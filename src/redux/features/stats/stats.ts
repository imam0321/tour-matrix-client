import { baseApi } from "@/redux/baseApi";
import type { BookingStats, IResponse, PaymentStats, TourStats, UserStats } from "@/types";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserStat: builder.query<IResponse<UserStats>, undefined>({
      query: () => ({
        url: "/stats/user",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    getTourStat: builder.query<IResponse<TourStats>, undefined>({
      query: () => ({
        url: "/stats/tour",
        method: "GET",
      }),
      providesTags: ["TOUR"],
    }),

    getBookingStat: builder.query<IResponse<BookingStats>, undefined>({
      query: () => ({
        url: "/stats/booking",
        method: "GET",
      }),
      providesTags: ["BOOKING"],
    }),

    getPaymentStat: builder.query<IResponse<PaymentStats>, undefined>({
      query: () => ({
        url: "/stats/payment",
        method: "GET",
      }),
      providesTags: ["PAYMENT"],
    }),

  }),
});

export const {
  useGetUserStatQuery,
  useGetTourStatQuery,
  useGetBookingStatQuery,
  useGetPaymentStatQuery
} = statsApi;

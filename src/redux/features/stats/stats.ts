import { baseApi } from "@/redux/baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserStat: builder.query({
      query: () => ({
        url: "/stats/user",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    getTourStat: builder.query({
      query: () => ({
        url: "/stats/tour",
        method: "GET",
      }),
      providesTags: ["TOUR"],
    }),

    getBookingStat: builder.query({
      query: () => ({
        url: "/stats/booking",
        method: "GET",
      }),
      providesTags: ["BOOKING"],
    }),

    getPaymentStat: builder.query({
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

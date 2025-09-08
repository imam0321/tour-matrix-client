import { baseApi } from "@/redux/baseApi";
import type { IBooking, IBookingResponse, IResponse } from "@/types";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<
      IResponse<IBookingResponse>,
      { tour: string; guestCount: number }
    >({
      query: (bookingData) => ({
        url: "booking",
        method: "POST",
        data: bookingData,
      }),
    }),

    getMyBookings: builder.query<IResponse<IBooking[]>, unknown>({
      query: (params) => ({
        url: `/booking/my-bookings`,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useCreateBookingMutation, useGetMyBookingsQuery } = bookingApi;

import { baseApi } from "@/redux/baseApi";
import type { IBookingResponse, IResponse } from "@/types";

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
  }),
});

export const { useCreateBookingMutation } = bookingApi;

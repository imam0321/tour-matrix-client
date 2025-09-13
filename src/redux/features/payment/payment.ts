import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initPayment: builder.mutation<IResponse<{ paymentUrl: string }>, string>({
      query: (id) => ({
        url: `/payment/init-payment/${id}`,
        method: "POST",
      }),
    }),
    paymentInvoice: builder.query<IResponse<string>, string>({
      query: (id) => ({
        url: `/payment/invoice/${id}`,
        method: "GET",
      }),
    }),




  }),
});

export const { useInitPaymentMutation, useLazyPaymentInvoiceQuery } = paymentApi;

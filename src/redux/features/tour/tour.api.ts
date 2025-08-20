import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourResponse } from "@/types";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTour: builder.mutation({
      query: (tourData) => ({
        url: "/tour/create",
        method: "POST",
        data: tourData,
      }),
      invalidatesTags: ["TOUR"],
    }),
    getTours: builder.query<IResponse<ITourResponse[]>, unknown>({
      query: (params) => ({
        url: `/tour`,
        method: "GET",
        params
      }),
      providesTags: ["TOUR"],
    }),

  }),
});

export const {
  useGetToursQuery,
  useAddTourMutation
} = tourApi;

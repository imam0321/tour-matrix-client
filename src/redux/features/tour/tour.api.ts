import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourResponse } from "@/types";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTour: builder.mutation<IResponse<ITourResponse>, FormData>({
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
    updateTour: builder.mutation<IResponse<ITourResponse>, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/tour/${id}`,
        method: "PATCH",
        data: formData,
      }),
      invalidatesTags: ["TOUR"],
    }),
    deleteTour: builder.mutation<IResponse<null>, string>({
      query: (id) => ({
        url: `/tour/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"],
    })

  }),
});

export const {
  useGetToursQuery,
  useAddTourMutation,
  useUpdateTourMutation,
  useDeleteTourMutation,
} = tourApi;

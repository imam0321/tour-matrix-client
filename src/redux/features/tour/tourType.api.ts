import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourType, ITourTypeResponse } from "@/types";

export const tourTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation<IResponse<ITourTypeResponse>, ITourType>({
      query: (tourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeName,
      }),
      invalidatesTags: ["TOUR_TYPE"],
    }),

    getTourTypes: builder.query<
      IResponse<ITourTypeResponse[]>,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: `/tour/tour-types?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["TOUR_TYPE"],
    }),

    deleteTourType: builder.mutation<IResponse<null>, string>({
      query: (id) => ({
        url: `/tour/tour-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR_TYPE"],
    })
  }),
});

export const { useAddTourTypeMutation, useGetTourTypesQuery, useDeleteTourTypeMutation } = tourTypeApi;

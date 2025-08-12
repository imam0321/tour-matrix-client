import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourTypeResponse } from "@/types";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation({
      query: (tourTypeName) => ({
        url: "/tour/type",
        method: "POST",
        data: tourTypeName,
      }),
    }),
    getTourTypes: builder.query<IResponse<ITourTypeResponse[]>,
      { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: `/tour/tour-types?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      // transformResponse: (res) => res.data,
    }),
  }),
});

export const { useAddTourTypeMutation, useGetTourTypesQuery } = tourApi;

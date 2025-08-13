import { baseApi } from "@/redux/baseApi";
import type { IDivisionResponse, IResponse, ITourType, ITourTypeResponse } from "@/types";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation<IResponse<ITourTypeResponse>, ITourType>({
      query: (tourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeName,
      }),
      invalidatesTags: ["TOUR_TYPE"],
    }),

    getDivisions: builder.query<
      IResponse<IDivisionResponse[]>,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: `/division?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["DIVISION"],
    }),
  }),
});

export const {
  useGetDivisionsQuery
} = divisionApi;

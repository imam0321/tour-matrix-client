import { baseApi } from "@/redux/baseApi";
import type { IDivisionResponse, IResponse} from "@/types";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDivision: builder.mutation<IResponse<IDivisionResponse>, FormData>({
      query: (divisionData) => ({
        url: "/division/create",
        method: "POST",
        data: divisionData,
      }),
      invalidatesTags: ["DIVISION"],
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
  useAddDivisionMutation,
  useGetDivisionsQuery
} = divisionApi;

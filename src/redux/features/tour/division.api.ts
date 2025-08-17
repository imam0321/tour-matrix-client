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

    updateDivision: builder.mutation<IResponse<IDivisionResponse>, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/division/${id}`,
        method: "PATCH",
        data: formData,
      }),
      invalidatesTags: ["DIVISION"],
    }),

    getDivisions: builder.query<
      IResponse<IDivisionResponse[]>,
      unknown
    >({
      query: (params) => ({
        url: `/division`,
        method: "GET",
        params
      }),
      providesTags: ["DIVISION"],
    }),

    deleteDivision: builder.mutation<IResponse<null>, string>({
      query: (id) => ({
        url: `/division/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DIVISION"],
    })
  }),
});

export const {
  useAddDivisionMutation,
  useUpdateDivisionMutation,
  useGetDivisionsQuery,
  useDeleteDivisionMutation
} = divisionApi;

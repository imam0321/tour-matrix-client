import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { IUserUpdate, User } from "@/types/auth.type";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<IResponse<User>, { userId: string; payload: IUserUpdate | FormData }>({
      query: ({ userId, payload }) => ({
        url: `/user/${userId}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["USER"]
    }),
  }),
});

export const { useUpdateUserMutation } = userApi;

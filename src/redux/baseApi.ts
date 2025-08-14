import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "http://localhost:3000",
  //   credentials: "include",
  // }),
  tagTypes: ["USER", "TOUR_TYPE", "DIVISION"],
  endpoints: () => ({}),
});

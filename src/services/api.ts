import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../store";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || "http://localhost:5000",
    prepareHeaders: (headers, { getState }) => {
      // Get token from redux persist
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["attendance", "myAttendance", "myAttendanceToday", "user"], // Tag for invalidate
  endpoints: () => ({}), // Inject on another files
});

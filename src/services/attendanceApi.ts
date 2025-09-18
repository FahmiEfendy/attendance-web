import { api } from "./api";
import { API } from "../constants/api";
import { ApiAttendanceResponse } from "../types/attendance";

export const attendanceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyAttendance: builder.query<ApiAttendanceResponse, void>({
      query: () => API.ATTENDANCE.ME,
    }),
  }),
});

export const { useGetMyAttendanceQuery } = attendanceApi;

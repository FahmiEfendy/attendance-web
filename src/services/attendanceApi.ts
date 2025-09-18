import { api } from "./api";
import { API } from "../constants/api";
import {
  ApiAttendanceResponse,
  ApiMyAttendanceRuquest,
  ApiSubmitAttendanceRequest,
  BasicResponse,
} from "../types/attendance";

export const attendanceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyAttendance: builder.query<ApiAttendanceResponse, void>({
      query: () => API.ATTENDANCE.ME,
      providesTags: ["myAttendance"], // Tag for list
    }),
    getMyAttendanceToday: builder.query<
      ApiAttendanceResponse,
      ApiMyAttendanceRuquest
    >({
      query: ({ date }) => {
        const params = new URLSearchParams();
        if (date) params.append("date", date);

        return `${API.ATTENDANCE.ME}?${params.toString()}`;
      },
      providesTags: ["myAttendanceToday"], // Tag for list
    }),
    submitAttendance: builder.mutation<
      BasicResponse,
      ApiSubmitAttendanceRequest
    >({
      query: (body) => ({
        url: API.ATTENDANCE.ATTENDANCE,
        method: "POST",
        body,
      }),
      invalidatesTags: ["myAttendance", "myAttendanceToday"], // Refresh tag data on mutation
    }),
  }),
});

export const {
  useGetMyAttendanceQuery,
  useGetMyAttendanceTodayQuery,
  useSubmitAttendanceMutation,
} = attendanceApi;

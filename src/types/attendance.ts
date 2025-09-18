import { UserDetail } from "./auth";

export type BasicResponse = {
  message: string;
};

export type UserAttendance = {
  id: string;
  user_id: string;
  date: string;
  time_in: string;
  time_out: string;
  photo_in_url: string;
  photo_out_url: string;
  user: UserDetail;
};

export type ApiAttendanceResponse = {
  message: string;
  userAttendance: UserAttendance[];
};

export type ApiMyAttendanceRuquest = {
  date: string;
};

export type ApiSubmitAttendanceRequest = {
  user_id: string;
  // photo: string;
};

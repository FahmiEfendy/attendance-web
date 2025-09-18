export type UserAttendance = {
  id: string;
  user_id: string;
  date: string;
  time_in: string;
  time_out: string;
  photo_url: string;
};

export type ApiAttendanceResponse = {
  message: string;
  userAttendance: UserAttendance[];
};

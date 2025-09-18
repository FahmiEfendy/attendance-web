import { api } from "./api";
import { API } from "../constants/api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployee: builder.query<any, any>({
      query: () => API.USER.USER,
      providesTags: ["user"],
    }),
    getEmployeeDetail: builder.query<any, any>({
      query: ({ id }) => {
        return `${API.USER.DETAIL.replace(":id", id)}`;
      },
    }),
    updateEmployee: builder.mutation<any, any>({
      query: ({ id, body }) => ({
        url: API.USER.DETAIL.replace(":id", id),
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    deleteEmployee: builder.mutation<any, any>({
      query: ({ id }) => ({
        url: API.USER.DELETE.replace(":id", id),
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllEmployeeQuery,
  useGetEmployeeDetailQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = userApi;

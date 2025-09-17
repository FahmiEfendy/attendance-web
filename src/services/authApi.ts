import { api } from "./api";
import { API } from "../constants/api";
import { setToken } from "../store/authSlice";
import {
  ApiLoginRequest,
  ApiLoginResponse,
  ApiRegisterRequest,
  ApiRegisterResponse,
} from "../types/auth";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiLoginResponse, ApiLoginRequest>({
      query: (body) => ({
        url: API.AUTH.LOGIN,
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.token) {
            dispatch(setToken(data.token));
          }
        } catch (err) {
          console.error("Login failed", err);
        }
      },
    }),
    register: builder.mutation<ApiRegisterResponse, ApiRegisterRequest>({
      query: (body) => ({
        url: API.AUTH.REGISTER,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

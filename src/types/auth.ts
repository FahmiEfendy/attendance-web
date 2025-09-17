export type ApiLoginRequest = {
  username: string;
  password: string;
};

export const formLoginDefaultValue: ApiLoginRequest = {
  username: "",
  password: "",
};

export type ApiLoginResponse = {
  message: string;
  token: string;
};

export type ApiRegisterRequest = {
  username: string;
  password: string;
  role: string;
  full_name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
};

export const formRegisterDefaultValue: ApiRegisterRequest = {
  username: "",
  password: "",
  role: "",
  full_name: "",
  email: "",
  phone: "",
  department: "",
  position: "",
};

export type ApiRegisterResponse = {
  message: string;
  token: string;
};

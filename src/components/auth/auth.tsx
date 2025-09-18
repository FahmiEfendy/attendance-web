import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";

import { PAGES } from "../../constants/page";
import { AuthType } from "../../constants/auth";
import { CustomSelect } from "../form/CustomSelect";
import CustomTextField from "../form/CustomTextField";
import Notification from "../notification/notification";
import { useLoginMutation, useRegisterMutation } from "../../services/authApi";
import {
  DEPARTMENT_ENUM,
  POSITION_ENUM,
  ROLE_ENUM,
} from "../../constants/option";
import {
  ApiLoginRequest,
  ApiRegisterRequest,
  formLoginDefaultValue,
  formRegisterDefaultValue,
} from "../../types/auth";

type AuthElementProps = {
  type: "Login" | "Register";
};

const AuthElement = ({ type }: AuthElementProps) => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<
    ApiLoginRequest | ApiRegisterRequest
  >({
    defaultValues:
      type === AuthType.LOGIN
        ? formLoginDefaultValue
        : formRegisterDefaultValue,
  });

  const [
    login,
    {
      data: loginData,
      isLoading: isLoadingLogin,
      isSuccess: isSuccessLogin,
      isError: isErrorLogin,
      error: errorLogin,
      reset: resetLogin,
    },
  ] = useLoginMutation();

  const [
    register,
    {
      data: registerData,
      isLoading: isLoadingRegister,
      isSuccess: isSuccessRegister,
      isError: isErrorRegister,
      error: errorRegister,
      reset: resetRegister,
    },
  ] = useRegisterMutation();

  const onSubmitLogin = (data: ApiLoginRequest) => {
    const loginPayload: ApiLoginRequest = {
      username: data.username,
      password: data.password,
    };
    login(loginPayload);
  };

  const onSubmitRegister = (data: ApiRegisterRequest) => {
    const registerPayload: ApiRegisterRequest = {
      username: data.username,
      password: data.password,
      role: data.role,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      department: data.department,
      position: data.position,
    };

    register(registerPayload);
  };

  useEffect(() => {
    if (isSuccessLogin && loginData) {
      navigate(PAGES.HOME);
    }
  }, [isSuccessLogin, loginData, navigate]);

  useEffect(() => {
    if (isSuccessRegister) {
      navigate(PAGES.LOGIN);
    }
  }, [isSuccessRegister, navigate]);

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1608370617993-a5c9ee904646?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="background"
        style={{
          position: "absolute",
          backgroundSize: "cover",
          width: "100%",
          height: "100vh",
          backgroundPosition: "center",
        }}
      />
      <Box
        sx={{
          bgcolor: "rgba(0,0,0,0.8)", // Dark overlay
          minHeight: "100vh",
          minWidth: "100%",
          position: "absolute",
        }}
      />
      <Container
        maxWidth="lg"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          component="form"
          onSubmit={handleSubmit((data) => {
            if (type === AuthType.LOGIN) {
              onSubmitLogin(data as ApiLoginRequest);
            } else {
              onSubmitRegister(data as ApiRegisterRequest);
            }
          })}
          elevation={10}
          sx={{
            backgroundColor: "white",
            width: type === AuthType.LOGIN ? "60%" : "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: ".5rem",
            padding: "2rem 1rem",
            gap: "1.5rem",
            zIndex: "10",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
            {`${type} Page`}
          </Typography>

          {type === AuthType.LOGIN && (
            <>
              <CustomTextField
                control={control}
                name="username"
                label="Username"
                placeholder="Enter your username..."
              />
              <CustomTextField
                control={control}
                name="password"
                label="Password"
                placeholder="Enter your passowrd..."
                type="password"
              />
            </>
          )}

          {type === AuthType.REGISTER && (
            <Grid container spacing={2}>
              <Grid size={6}>
                <CustomTextField
                  control={control}
                  name="username"
                  label="Username"
                  placeholder="Enter your username..."
                />
              </Grid>
              <Grid size={6}>
                <CustomTextField
                  control={control}
                  name="password"
                  label="Password"
                  placeholder="Enter your passowrd..."
                  type="password"
                />
              </Grid>
              <Grid size={6}>
                <CustomTextField
                  control={control}
                  name="email"
                  label="Email"
                  placeholder="Enter your email..."
                />
              </Grid>
              <Grid size={6}>
                <CustomTextField
                  control={control}
                  name="full_name"
                  label="Full Name"
                  placeholder="Enter your full name..."
                />
              </Grid>
              <Grid size={6}>
                <CustomTextField
                  control={control}
                  name="phone"
                  label="Phone"
                  placeholder="Enter your phone number..."
                  type="number"
                />
              </Grid>
              <Grid size={6}>
                <CustomSelect
                  control={control}
                  name="role"
                  label="Role"
                  options={ROLE_ENUM}
                />
              </Grid>
              <Grid size={6}>
                <CustomSelect
                  control={control}
                  name="department"
                  label="Deparment"
                  options={DEPARTMENT_ENUM}
                />
              </Grid>
              <Grid size={6}>
                <CustomSelect
                  control={control}
                  name="position"
                  label="Position"
                  options={POSITION_ENUM}
                />
              </Grid>
            </Grid>
          )}

          <Button
            type="submit"
            variant="contained"
            loading={isLoadingLogin || isLoadingRegister}
            sx={{ padding: ".5rem 3rem", marginTop: "1rem" }}
          >
            {type}
          </Button>
          {type === AuthType.LOGIN ? (
            <Typography variant="body2">
              Don't have account? <Link to={PAGES.REGISTER}>Register</Link>{" "}
              instead.
            </Typography>
          ) : (
            <Typography variant="body2">
              Already have account? <Link to={PAGES.LOGIN}>Login</Link> instead.
            </Typography>
          )}
        </Paper>
      </Container>

      <Notification
        isOpen={isSuccessLogin || isErrorLogin}
        severity={isSuccessLogin ? "success" : "error"}
        message={
          isSuccessLogin
            ? loginData?.message
            : (errorLogin as any)?.data?.message
        }
        reset={resetLogin}
        sxProps={{ zIndex: "20" }}
      />

      <Notification
        isOpen={isSuccessRegister || isErrorRegister}
        severity={isSuccessRegister ? "success" : "error"}
        message={
          isSuccessRegister
            ? registerData?.message
            : (errorRegister as any)?.data?.message
        }
        reset={resetRegister}
        sxProps={{ zIndex: "20" }}
      />
    </>
  );
};

export default AuthElement;

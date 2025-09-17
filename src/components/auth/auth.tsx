import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Container, Paper, Typography } from "@mui/material";

import { PAGES } from "../../constants/page";
import { AuthType } from "../../constants/auth";
import CustomTextField from "../form/CustomTextField";
import { useLoginMutation } from "../../services/authApi";
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

  const [login, { isSuccess: isSuccessLogin, data: loginData }] =
    useLoginMutation();

  const onSubmit = (data: ApiLoginRequest | ApiRegisterRequest) => {
    login({ username: data.username, password: data.password });
  };

  useEffect(() => {
    if (isSuccessLogin && loginData) {
      navigate(PAGES.HOME);
    }
  }, [isSuccessLogin, loginData, navigate]);

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
        maxWidth="md"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          elevation={10}
          sx={{
            backgroundColor: "white",
            height: "40%",
            width: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: ".5rem",
            padding: "1rem",
            gap: "1.5rem",
            zIndex: "10",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
            {`${type} Page`}
          </Typography>
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
          <Button
            type="submit"
            variant="contained"
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
    </>
  );
};

export default AuthElement;

import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import backgroundImage from "../images/background.jpg";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/validators";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging In...");
    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem 1rem",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            p: isMobile ? 3 : 4,
            borderRadius: 4,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            border: "1px solid rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#000",
          }}
        >
          <Typography variant="h5" fontWeight={300} mb={2}>
            {isLogin ? "Login - WeTalk" : "Signup - WeTalk"}
          </Typography>

          <form
            style={{ width: "100%" }}
            onSubmit={isLogin ? handleLogin : handleSignUp}
          >
            {!isLogin && (
              <>
                <Stack
                  position="relative"
                  width={120}
                  height={120}
                  mx="auto"
                  mb={2}
                >
                  <Avatar
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      border: "2px solid white",
                      objectFit: "cover",
                    }}
                    src={avatar.preview}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      bgcolor: "rgba(0,0,0,0.7)",
                      color: "#fff",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.9)",
                      },
                    }}
                    component="label"
                  >
                    <CameraAltIcon />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={avatar.changeHandler}
                    />
                  </IconButton>
                </Stack>
                {avatar.error && (
                  <Typography
                    color="error"
                    textAlign="center"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}

                <TextField
                  label="Name"
                  required
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={name.value}
                  onChange={name.changeHandler}
                  sx={{
                   backgroundColor: "#fff",
                   "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
              }}
                />
                <TextField
                  label="Bio"
                  required
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={bio.value}
                  onChange={bio.changeHandler}
                  sx={{
                    backgroundColor: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                   },
                  }}
                />
              </>
            )}

            <TextField
              label="Username"
              required
              fullWidth
              variant="outlined"
              margin="normal"
              value={username.value}
              onChange={username.changeHandler}
              sx={{
              backgroundColor: "#fff",
              "& .MuiOutlinedInput-notchedOutline": {
                 borderColor: "black",
                },
              }}
            />

            {!isLogin && username.error && (
              <Typography color="error" variant="caption">
                {username.error}
              </Typography>
            )}

            <TextField
              label="Password"
              type="password"
              required
              fullWidth
              variant="outlined"
              margin="normal"
              value={password.value}
              onChange={password.changeHandler}
              sx={{
              backgroundColor: "#fff",
              "& .MuiOutlinedInput-notchedOutline": {
                 borderColor: "black",
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 2,
                py: 1.3,
                borderRadius: "25px",
                fontSize: "1rem",
                fontWeight: "bold",
                textTransform: "none",
                backgroundColor: "#1976d2",
                ":hover": {
                  backgroundColor: "#115293",
                },
              }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>

            <Typography textAlign="center" my={2} color="text.secondary">
              OR
            </Typography>

            <Button
              fullWidth
              variant="text"
              onClick={toggleLogin}
              disabled={isLoading}
              sx={{
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "#1976d2",
                ":hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {isLogin ? "Sign Up Instead" : "Login Instead"}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;

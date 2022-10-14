import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import LogoWName from "../../../../assets/logos/LogoWName.svg";
import LoginBackground from "./components/LoginBackground";
import LoginSnackBar from "./components/SnackBars/LoginSnackBar";
import { login, reset } from "../../../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

function AuthLogin(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState({ field: "", message: "" });
  const [payload, setPayload] = React.useState({
    email: "",
    password: "",
  });
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  React.useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      toast.success("🦄 Login Success");
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid()) {
      dispatch(login(payload));
    }
  };
  const isValid = () => {
    if (payload.email === "") {
      setError({ field: "email", message: "Please fill me" });
      return false;
    }
    if (payload.password === "") {
      setError({ field: "password", message: "Please fill me" });
      return false;
    }
    return true;
  };

  const onChangeInput = (e) => {
    setError({ field: "", message: "" });
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}>
          <LoginBackground />
        </Grid>

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              alt="Logo"
              src={LogoWName}
              sx={{
                p: 8,
              }}
            />
            <Typography component="h1" variant="h5">
              SIGN IN
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
              <InputLabel>Email Address</InputLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                error={error.field === "email"}
                helperText={!payload.email && error.message}
                onChange={(e) => onChangeInput(e)}
              />
              <InputLabel>Password</InputLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                error={error.field === "password"}
                helperText={!payload.password && error.message}
                onChange={(e) => onChangeInput(e)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => handleSubmit(e)}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>{" "}
        </Grid>
      </Grid>
    </>
  );
}

export default AuthLogin;

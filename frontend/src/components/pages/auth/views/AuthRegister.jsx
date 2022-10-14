import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../../../features/auth/authSlice";
import RegisterBackground from "./components/RegisterBackground";
import RegisterSnackBar from "./components/SnackBars/RegisterSnackBar";
import CircularProgress from "@mui/material/CircularProgress";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        PrimePsyche
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const AuthRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPsychiatrist, setIsPsychiatrist] = React.useState("false");
  const [open, setOpen] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState({ field: "", message: "" });
  const [payload, setPayload] = React.useState({
    firstName: "",
    lastName: "",
    userName: "",
    role: "user",
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

  const { firstName, lastName, userName, role, email, password } = payload;
  const onClickRegister = (event) => {
    event.preventDefault();
    if (isValid()) {
      dispatch(register(payload));
    }
  };
  const handleRoleChange = (event) => {
    setError({ field: "", message: "" });
    setIsPsychiatrist(event.target.value);
    if (event.target.value) {
      setPayload({ ...payload, role: "psychiatrist" });
    } else {
      setPayload({ ...payload, role: "user" });
    }
  };
  const onChangeInput = (e) => {
    setError({ field: "", message: "" });
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
      userName: firstName.concat(" ", lastName),
    });
  };
  const onChangeConfirmPassword = (e) => {
    setError({ field: "", message: "" });
    setConfirmPassword(e.target.value);
  };
  const isValid = () => {
    if (payload.password !== confirmPassword) {
      setError({
        field: "confirmPassword",
        message: "Please fill me",
      });
      return false;
    } else {
      if (payload.firstName === "") {
        setError({ field: "firstName", message: "Please fill me" });
        return false;
      }
      if (payload.lastName === "") {
        setError({ field: "lastName", message: "Please fill me" });
        return false;
      }
      if (payload.role === "") {
        setError({ field: "role", message: "Please fill me" });
        return false;
      }
      if (payload.email === "") {
        setError({ field: "email", message: "Please fill me" });
        return false;
      }
      if (payload.password === "") {
        setError({ field: "password", message: "Please fill me" });
        return false;
      }
      if (confirmPassword === "") {
        setError({ field: "confirmPassword", message: "Please fill me" });
        return false;
      }
    }
    return true;
  };
  // const onClickRegister = () => {
  //   setOpen(true);
  // };
  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid item xs={false} sm={4} md={7}>
          <RegisterBackground />
        </Grid>

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              px: 3,
            }}
          >
            <RegisterSnackBar open={open} setOpen={setOpen} />
            <Typography component="h1" variant="h5">
              SIGN UP
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputLabel>First Name</InputLabel>
                  <TextField
                    name="firstName"
                    required
                    fullWidth
                    value={firstName}
                    autoFocus
                    onChange={(e) => onChangeInput(e)}
                    error={error.field === "firstName"}
                    helperText={!payload.firstName && error.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel>Last Name</InputLabel>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => onChangeInput(e)}
                    error={error.field === "lastName"}
                    helperText={!payload.lastName && error.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel>Register as a Psychiatrist</InputLabel>
                  <RadioGroup
                    row
                    name="row-radio-buttons-group"
                    value={isPsychiatrist}
                    onChange={(e) => handleRoleChange(e)}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </Grid>
                {isPsychiatrist === "true" && (
                  <Grid item xs={12}>
                    <InputLabel>Doctor License Number</InputLabel>
                    <TextField required fullWidth id="email" name="email" />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <InputLabel>Email Address</InputLabel>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => onChangeInput(e)}
                    error={error.field === "email"}
                    helperText={!payload.email && error.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>Password</InputLabel>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => onChangeInput(e)}
                    error={error.field === "password"}
                    helperText={!payload.password && error.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>Confirm Password</InputLabel>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => onChangeConfirmPassword(e)}
                    error={error.field === "confirmPassword"}
                    helperText={
                      error.field === "confirmPassword" &&
                      "Password does not match"
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => onClickRegister(e)}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {isPsychiatrist === "false" && <Copyright sx={{ mt: 5 }} />}
        </Grid>
      </Grid>
    </>
  );
};

export default AuthRegister;

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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import RegisterBackground from "./components/RegisterBackground";
import { Paper } from "@mui/material";
import RegisterSnackBar from "./components/SnackBars/RegisterSnackBar";

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
  const [isPsychiatrist, setIsPsychiatrist] = React.useState("false");
  const [open, setOpen] = React.useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const handleRoleChange = (event) => {
    setIsPsychiatrist(event.target.value);
  };
  const onClickRegister = () => {
    setOpen(true);
  };
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
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputLabel>First Name</InputLabel>
                  <TextField
                    name="firstName"
                    required
                    fullWidth
                    // id="firstName"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel>Last Name</InputLabel>
                  <TextField required fullWidth id="lastName" name="lastName" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel>Register as a Psychiatrist</InputLabel>
                  <RadioGroup
                    row
                    name="row-radio-buttons-group"
                    value={isPsychiatrist}
                    onChange={handleRoleChange}
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
                  <TextField required fullWidth id="email" name="email" />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>Password</InputLabel>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    type="password"
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
                // type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={onClickRegister}
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

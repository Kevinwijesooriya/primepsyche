import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const LoginSnackBar = (props) => {
  const { open, setOpen, setIsLoggedIn } = props;
  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsLoggedIn(true);
    navigate("/");
    setOpen(false);
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Login Success!
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginSnackBar;

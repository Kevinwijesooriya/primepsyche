import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const AddSnackBar = (props) => {
  const { open, setOpen, success } = props;
  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    navigate("/primepsyche/forum/view");
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
        <Alert
          onClose={handleClose}
          severity={success ? "success" : "error"}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {success
            ? "You added a Post successfully "
            : "Ops! Something went wrong!"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddSnackBar;

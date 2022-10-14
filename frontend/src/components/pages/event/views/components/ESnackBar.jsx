import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// import { useNavigate } from "react-router-dom";

const ESnackBar = (props) => {
    const { snack, open, setOpen, message, severity } = props;
    //   const navigate = useNavigate();
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        window.location.reload(false);
        setOpen({
            ...snack,
            open: false,
        });
    };
    return (
        <>
            <Snackbar
                sx={{ height: "100%" }}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    sx={{ width: "100%" }}
                    variant="filled"
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ESnackBar;

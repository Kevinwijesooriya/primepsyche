import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const EditSnackBar = (props) => {
    const { open, setOpen } = props;
    const navigate = useNavigate();
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        navigate("/primepsyche/events/view");
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
                    Event Edited Successfully!
                </Alert>
            </Snackbar>
        </>
    );
};

export default EditSnackBar;

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { WarningButton, WarningButtonOutlined } from "../../styles";
import ForumPostAPI from "../../../../../core/services/ForumPostAPI";

export default function AlertDialog(props) {
  const { open, setOpen, deleteId, snack, setSnack } = props;

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    try {
      const response = await ForumPostAPI.delete(deleteId);
      console.log("🚀 ~ response", response);
      setOpen(false);
      setSnack({
        ...snack,
        open: true,
        severity: "success",
        message: "delete success !",
      });
    } catch (error) {
      setOpen(false);
      setSnack({
        ...snack,
        open: true,
        severity: "error",
        message: "Failed to delete post ! please try again",
      });
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <>
          <DialogTitle id="alert-dialog-title">{"Delete Post?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this post?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <WarningButtonOutlined onClick={handleClose}>
              no
            </WarningButtonOutlined>
            <WarningButton onClick={handleDelete} autoFocus>
              Yes
            </WarningButton>
          </DialogActions>
        </>
      </Dialog>
    </div>
  );
}

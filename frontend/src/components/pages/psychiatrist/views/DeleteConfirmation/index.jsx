import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { WarningButton, WarningButtonOutlined } from "../../styles";
import { Alert } from "@mui/material";
import HelpPostAPI from "../../../../../core/services/HelpPostAPI";

export default function AlertDialog(props) {
  const { open, setOpen, deleteId } = props;
  const [error, setError] = React.useState(false);
  const [content, setContent] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    try {
      const response = await HelpPostAPI.delete(deleteId);
      console.log("🚀 ~ response", response);
      setContent(false);
      setError(false);
    } catch (error) {
      setContent(false);
      setError(true);
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
        {!content && error && (
          <Alert severity="error">Failed to delete the post!</Alert>
        )}
        {!content && !error && (
          <Alert severity="success">Successfully deleted the post!</Alert>
        )}
        {content && (
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
        )}
      </Dialog>
    </div>
  );
}

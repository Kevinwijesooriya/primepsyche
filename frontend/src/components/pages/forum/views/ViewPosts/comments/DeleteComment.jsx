import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { WarningButton, WarningButtonOutlined } from "../../../styles";
import { Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ForumPostAPI from "../../../../../../core/services/ForumPostAPI";

export default function DeleteComment(props) {
  const { deleteId } = props;
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [content, setContent] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleDelete = async () => {
    try {
      const response = await ForumPostAPI.delete(deleteId);
      console.log("🚀 ~ response", response);
      setContent(false);
      setError(false);
    } catch (error) {
      setContent(false);
      setError(true);
    }
  };

  return (
    <>
      <IconButton edge="end" aria-label="delete" onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {!content && error && (
          <Alert severity="error">Failed to delete the comment!</Alert>
        )}
        {!content && !error && (
          <Alert severity="success">Successfully deleted the comment!</Alert>
        )}
        {content && (
          <>
            <DialogTitle id="alert-dialog-title">
              {"Delete comment?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this comment?
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
    </>
  );
}

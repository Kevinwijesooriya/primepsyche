import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { WarningButton, WarningButtonOutlined } from "../../../styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ForumCommentAPI from "../../../../../../core/services/ForumCommentAPI";

export default function DeleteComment(props) {
  const { data, postId, snack, setSnack } = props;
  const [open, setOpen] = React.useState(false);
  const payload = {
    postId: postId,
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleDelete = async () => {
    try {
      const response = await ForumCommentAPI.delete({
        deleteId: data._id,
        payload,
      });
      console.log("🚀 ~ response", response);
      setSnack({
        ...snack,
        open: true,
        severity: "success",
        message: "delete success !",
      });
      setOpen(false);
    } catch (error) {
      setOpen(false);
      setSnack({
        ...snack,
        open: true,
        severity: "error",
        message: "Failed to delete comment ! please try again",
      });
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
        <>
          <DialogTitle id="alert-dialog-title">{"Delete comment?"}</DialogTitle>
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
      </Dialog>
    </>
  );
}

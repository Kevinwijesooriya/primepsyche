import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import HelpCommentAPI from "../../../../../../core/services/HelpCommentAPI";

export default function EditComment(props) {
  const { data, postId, snack, setSnack } = props;
  const [open, setOpen] = React.useState(false);
  const [payload, setPayload] = React.useState({
    postId: postId,
    comment: data.suggest,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeComment = (e) => {
    setPayload({
      ...payload,
      suggest: e.target.value,
    });
  };

  const onClickSave = async (e) => {
    e.preventDefault();
    if (true) {
      const response = await HelpCommentAPI.update({
        commentId: data._id,
        payload,
      });
      console.log("~ onClickShare ~ response", response);
      if (response.status === 200) {
        setOpen(false);
        setSnack({
          ...snack,
          open: true,
          severity: "success",
          message: "changes saved !",
        });
      } else {
        setOpen(false);
        setSnack({
          ...snack,
          open: true,
          severity: "error",
          message: "Failed to update suggestion ! please try again",
        });
      }
    }
  };

  return (
    <>
      <IconButton edge="end" aria-label="edit" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Change your comment
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can make changes to your suggestion.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            defaultValue={data.suggest}
            onChange={(e) => onChangeComment(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={(e) => onClickSave(e)}>SAVE CHANGES</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

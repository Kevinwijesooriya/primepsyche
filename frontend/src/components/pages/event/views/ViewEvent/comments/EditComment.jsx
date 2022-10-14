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
import EventCommentAPI from "../../../../../../core/services/EventCommentAPI";

export default function EditComment(props) {
    const { data, eventId, snack, setSnack } = props;
    const [open, setOpen] = React.useState(false);
    const [payload, setPayload] = React.useState({
        eventId: eventId,
        comment: data.comment,
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
            comment: e.target.value,
        });
    };

    const onClickSave = async (e) => {
        e.preventDefault();
        if (true) {
            const response = await EventCommentAPI.update({
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
                    message: "Failed to update comment ! please try again",
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
                        You can make changes to your comment.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        type="text"
                        fullWidth
                        defaultValue={data.comment}
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

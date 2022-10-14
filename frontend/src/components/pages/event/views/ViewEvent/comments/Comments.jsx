import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EventCommentAPI from "../../../../../../core/services/EventCommentAPI";
import ESnackBar from "../../components/ESnackBar";
import { useSelector } from "react-redux";

const Comments = (props) => {
    const { event } = props;
    const { user } = useSelector((state) => state.auth);
    const [payload, setPayload] = React.useState({
        eventId: event._id,
        userId: "",
        userName: "",
        comment: "",
    });
    const [snack, setSnack] = React.useState({
        open: false,
        severity: "",
        message: "",
    });
    const commentList = event.comments;

    const onClickAdd = async () => {
        const response = await EventCommentAPI.create(payload);
        if (response.status === 200) {
            setSnack({
                ...snack,
                open: true,
                severity: "success",
                message: "comment added !",
            });
        } else {
            setSnack({
                ...snack,
                open: true,
                severity: "error",
                message: "Failed to add comment ! please try again",
            });
        }
    };

    const onChangeComment = (e) => {
        setPayload({
            ...payload,
            comment: e.target.value,
            userId: user._id,
            userName: user.userName,
        });
    };
    return (
        <>
            <List
                dense={true}
                sx={{
                    background: (theme) =>
                        theme.palette.prime_psycheColors.prime_psyche_mid_green4,
                }}
            >
                {commentList &&
                    commentList.map((comment, i) => (
                        <ListItem
                            key={`commentList-${i}`}
                            secondaryAction={
                                user._id === comment.userId && (
                                <>
                                    <EditComment
                                        data={comment}
                                        eventId={event._id}
                                        snack={snack}
                                        setSnack={setSnack}
                                    />
                                    <DeleteComment
                                        data={comment}
                                        eventId={event._id}
                                        snack={snack}
                                        setSnack={setSnack}
                                    />
                                </>
                                )
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <AccountCircleIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={comment.userName}
                                secondary={comment.comment}
                            />
                        </ListItem>
                    ))}
                <ListItem>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        placeholder="Add your comment"
                        type="text"
                        fullWidth
                        onChange={(e) => onChangeComment(e)}
                        sx={{ mr: "12px" }}
                    />
                    <Button size="large" onClick={() => onClickAdd()}>
                        ADD
                    </Button>
                </ListItem>
            </List>
            <ESnackBar
                open={snack.open}
                snack={snack}
                setOpen={setSnack}
                severity={snack.severity}
                message={snack.message}
            />
        </>
    );
};

export default Comments;

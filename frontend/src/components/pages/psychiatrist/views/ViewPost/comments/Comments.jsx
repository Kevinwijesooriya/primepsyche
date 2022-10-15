import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditComment from "./EditSuggest";
import DeleteComment from "./DeleteSuggest";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import HelpCommentAPI from "../../../../../../core/services/HelpCommentAPI";
import PSnackBar from "../../components/PSnackBar";
import { useSelector } from "react-redux";

const Comments = (props) => {
  const { user } = useSelector((state) => state.auth);
  const { post } = props;
  const [payload, setPayload] = React.useState({
    postId: post._id,
    userId: "",
    userName: "",
    suggest: "",
  });
  const [snack, setSnack] = React.useState({
    open: false,
    severity: "",
    message: "",
  });
  const commentList = post.suggests;

  const onClickAdd = async () => {
    const response = await HelpCommentAPI.create(payload);
    if (response.status === 200) {
      setSnack({
        ...snack,
        open: true,
        severity: "success",
        message: "suggestion added !",
      });
    } else {
      setSnack({
        ...snack,
        open: true,
        severity: "error",
        message: "Failed to add suggestion ! please try again",
      });
    }
  };

  const onChangeComment = (e) => {
    setPayload({
      ...payload,
      suggest: e.target.value,
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
                user.role === "psychiatrist" &&
                user._id === comment.userId && (
                  <>
                    <EditComment
                      data={comment}
                      postId={post._id}
                      snack={snack}
                      setSnack={setSnack}
                    />
                    <DeleteComment
                      data={comment}
                      postId={post._id}
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
                secondary={comment.suggest}
              />
            </ListItem>
          ))}
        {user.role !== "user" && (
          <ListItem>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              placeholder="Add your suggest"
              type="text"
              fullWidth
              onChange={(e) => onChangeComment(e)}
              sx={{ mr: "12px" }}
            />
            <Button size="large" onClick={() => onClickAdd()}>
              ADD
            </Button>
          </ListItem>
        )}
      </List>
      <PSnackBar
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

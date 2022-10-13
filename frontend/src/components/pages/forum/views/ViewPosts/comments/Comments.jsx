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

const Comments = () => {
  const commentList = [
    { comment: "Comment", userName: "John Mayer", id: "23g2323g42h2b4gvgvgjj" },
    {
      comment: "Comment",
      userName: "Shawn Mendes",
      id: "23g2323g42h2b4gvgvyrdj",
    },
    {
      comment: "Comment",
      userName: "Taylor Swift",
      id: "23g2323g42h2b4gvgddjj",
    },
    { comment: "Comment", userName: "Drake", id: "23g2323g42h2b4gvgssjj" },
    { comment: "Comment", userName: "Harry Style", id: "sdsfdfsee334gdr657" },
  ];
  const onClickEdit = (id) => {
    console.log("~ onClickEdit ~ id", id);
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
                <>
                  <EditComment />
                  <DeleteComment />
                </>
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
            sx={{ mr: "12px" }}
          />
          <Button size="large">ADD</Button>
        </ListItem>
      </List>
    </>
  );
};

export default Comments;

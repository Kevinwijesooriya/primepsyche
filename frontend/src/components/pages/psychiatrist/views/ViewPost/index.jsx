import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { Box, Button, Divider, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { PostContainer, StyledLink } from "../../styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import Stack from "@mui/material/Stack";
import moment from "moment";
import AlertDialog from "../DeleteConfirmation";
import BasicPagination from "../components/Pagination";
import { red } from "@mui/material/colors";
import HelpPostAPI from "../../../../../core/services/HelpPostAPI";
import { Link } from "react-router-dom";
import Comments from "./comments/Comments";
import PSnackBar from "../components/PSnackBar";
import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ViewPosts = () => {
  const [open, setOpen] = React.useState(false);
  const [PostList, setPostList] = React.useState([]);
  const [comment, setComment] = React.useState("");
  const [commentsVisible, setCommentsVisible] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const { user } = useSelector((state) => state.auth);
  const [snack, setSnack] = React.useState({
    open: false,
    severity: "",
    message: "",
  });
  const filteredPosts = PostList.filter((PostList) => {
    return (
      PostList.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      PostList.age.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      PostList.disorder
        .toLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      PostList.description
        .toLowerCase()
        .includes(searchTerm.toLocaleLowerCase())
    );
  });
  const onClickDelete = (id) => {
    setDeleteId(id);
    setOpen(true);
  };
  const onClickComment = (id) => {
    setComment(id);
    setCommentsVisible(!commentsVisible);
  };

  async function fetchData() {
    if (user.role === "user") {
      const response = await HelpPostAPI.getMyPost(user._id);
      if (response.status === 200) {
        setPostList(response.data.data);
      }
    } else {
      const response = await HelpPostAPI.getAll();
      if (response.status === 200) {
        setPostList(response.data.data);
      }
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [open]);

  const getDate = (date) => {
    return moment(date).format("LL");
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          pb: 1,
          display: { xs: "none", md: "flex" },
        }}
      >
        <Typography variant="PageHeader" gutterBottom>
          {user.role === "user" ? "My Help Request" : "All Help Request"}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
        <TextField
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {user.role === "user" && (
          <StyledLink to="/primepsyche/help/add">
            <Button>ADD A NEW HELP REQUEST</Button>
          </StyledLink>
        )}
      </Box>

      {filteredPosts &&
        filteredPosts.map((post) => (
          <PostContainer
            item
            xs={12}
            md={6}
            key={`postList${post._id}`}
            sx={{
              background: (theme) =>
                theme.palette.prime_psycheColors.prime_psyche_light_green5,
            }}
          >
            <CardActionArea
              component={Link}
              to={`/primepsyche/help/view/${post._id}`}
              sx={{
                background: (theme) =>
                  theme.palette.prime_psycheColors.prime_psyche_light_green4,
              }}
            >
              <Card
                sx={{
                  display: "flex",
                  background: (theme) =>
                    theme.palette.prime_psycheColors.prime_psyche_light_green4,
                }}
              >
                <CardContent sx={{ flex: 1, p: 2 }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    {getDate(post.updatedAt)} by {post.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Gender : {post.gender}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Age : {post.age}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Disorder Type : {post.disorder}
                  </Typography>
                  <br></br>
                  <Typography variant="subtitle1" paragraph>
                    {post.description}
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
            <Divider></Divider>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Stack direction="row" spacing={1}>
                  <IconButton component={Link} to="skjdbk">
                    <FavoriteIcon sx={{ color: red[900] }} />
                  </IconButton>
                  <IconButton>
                    <CommentIcon onClick={() => onClickComment(post._id)} />
                  </IconButton>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                {user.role === "user" && user._id === post.userID && (
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <StyledLink to={`/primepsyche/help/edit/${post._id}`}>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </StyledLink>
                    <IconButton onClick={() => onClickDelete(post._id)}>
                      <DeleteIcon sx={{ color: red[900] }} />
                    </IconButton>
                  </Stack>
                )}
              </Grid>
            </Grid>
            {commentsVisible && comment === post._id && (
              <Comments post={post} />
            )}
          </PostContainer>
        ))}
      <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
        <BasicPagination count={10} />
      </Box>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        deleteId={deleteId}
        snack={snack}
        setSnack={setSnack}
      />
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

export default ViewPosts;

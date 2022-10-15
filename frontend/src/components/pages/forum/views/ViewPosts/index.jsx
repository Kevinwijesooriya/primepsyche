import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box, Button, Divider, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { PostContainer, StyledLink } from "../../styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import Stack from "@mui/material/Stack";
import AlertDialog from "../DeleteConfirmation";
import BasicPagination from "../components/Pagination";
import moment from "moment";
import { red } from "@mui/material/colors";
import ForumPostAPI from "../../../../../core/services/ForumPostAPI";
import { Link } from "react-router-dom";
import Comments from "./comments/Comments";
import PSnackBar from "../components/PSnackBar";
import { useSelector } from "react-redux";

const ViewPosts = () => {
  const [open, setOpen] = React.useState(false);
  const [postsList, setPostsList] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [commentsVisible, setCommentsVisible] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [snack, setSnack] = React.useState({
    open: false,
    severity: "",
    message: "",
  });

  const filteredPosts = postsList.filter((postsList) => {
    return (
      postsList.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      postsList.userName.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
  });

  async function fetchData() {
    const response = await ForumPostAPI.getAll();
    if (response.status === 200) {
      setPostsList(response.data.data);
    }
  }
  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [open]);

  const onClickDelete = (id) => {
    setDeleteId(id);
    setOpen(true);
  };
  const onClickComment = (id) => {
    setComment(id);
    setCommentsVisible(!commentsVisible);
  };

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
          Welcome To our forum
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
        <TextField
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <StyledLink to="/primepsyche/forum/add">
          <Button>SHARE YOUR EXPERIENCE</Button>
        </StyledLink>
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
              to={`/primepsyche/forum/view/${post._id}`}
              sx={{
                borderRadius: 5,
                background: (theme) =>
                  theme.palette.prime_psycheColors.prime_psyche_mid_green3,
              }}
            >
              <Card
                sx={{
                  display: "flex",
                  background: (theme) =>
                    theme.palette.prime_psycheColors.prime_psyche_mid_green3,
                }}
              >
                <CardContent sx={{ flex: 1, p: 2 }}>
                  <Typography component="h2" variant="button">
                    {post.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {getDate(post.updatedAt)} by {post.userName}
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {post.description}
                  </Typography>
                </CardContent>
                <CardMedia
                  sx={{ width: 160, display: { xs: "none", sm: "block" } }}
                  alt="image"
                  image={post.image}
                />
              </Card>
            </CardActionArea>
            <Divider></Divider>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Stack direction="row" spacing={1}>
                  <IconButton>
                    <FavoriteIcon sx={{ color: red[900] }} />
                  </IconButton>
                  <IconButton>
                    <CommentIcon onClick={() => onClickComment(post._id)} />
                  </IconButton>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                {user._id === post.userId && (
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <StyledLink to={`/primepsyche/forum/edit/${post._id}`}>
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

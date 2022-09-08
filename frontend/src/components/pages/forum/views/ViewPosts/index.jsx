import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box, Button, Divider } from "@mui/material";
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

const ViewPosts = () => {
  const [open, setOpen] = React.useState(false);
  const [postsList, setPostsList] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState("");

  async function fetchData() {
    const response = await ForumPostAPI.getAll();
    setPostsList(response.data.data);
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
      <Box sx={{ display: "flex", justifyContent: "flex-end", py: 2 }}>
        <StyledLink to="/primepsyche/forum/add">
          <Button>SHARE YOUR EXPERIENCE</Button>
        </StyledLink>
      </Box>
      {postsList &&
        postsList.map((post) => (
          <PostContainer item xs={12} md={6} key={`postList${post._id}`}>
            <CardActionArea>
              <Card sx={{ display: "flex" }}>
                <CardContent sx={{ flex: 1, p: 2 }}>
                  <Typography component="h2" variant="h5">
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
                    <CommentIcon />
                  </IconButton>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
            </Grid>
          </PostContainer>
        ))}
      <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
        <BasicPagination count={10} />
      </Box>
      <AlertDialog open={open} setOpen={setOpen} deleteId={deleteId} />
    </>
  );
};

export default ViewPosts;

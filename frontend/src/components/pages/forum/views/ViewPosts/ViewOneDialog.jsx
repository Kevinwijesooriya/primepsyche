import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box, Button, Dialog, Divider } from "@mui/material";
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

const ViewOneDialog = (props) => {
  const [view, setView] = React.useState(false);

  const handleClickView = () => {
    setView(true);
  };

  const handleClose = () => {
    setView(false);
  };
  const { postData } = props;
  const params = useParams();
  const postId = params.id;
  const [open, setOpen] = React.useState(false);
  const [post, setPost] = React.useState({
    title: "",
    description: "",
    image: "",
  });
  const getDate = (date) => {
    return moment(date).format("LL");
  };
  async function fetchData() {
    const response = await ForumPostAPI.getOne(postId);
    setPost(response.data.data);
  }
  React.useEffect(() => {
    fetchData();
  }, []);
  const onClickDelete = (id) => {
    setOpen(true);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
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
          {commentsVisible && comment === post._id && <Comments />}
        </PostContainer>
      </Dialog>
      <AlertDialog open={open} setOpen={setOpen} deleteId={postId} />
    </>
  );
};

export default ViewOneDialog;

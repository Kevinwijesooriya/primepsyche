import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { Box, Button, Divider } from "@mui/material";
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
import { useParams } from "react-router-dom";

const ViewOne = () => {
  const params = useParams();
  const postId = params.id;
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState("");
  const [post, setPost] = React.useState({
    name: "",
    age: "",
    gender: "",
    disorder: "",
    description: "",
  });

  const onClickDelete = (id) => {
    setOpen(true);
  };

  async function fetchData() {
    const response = await HelpPostAPI.getOne(postId);
    setPost(response.data.data);
  }
  const getDate = (date) => {
    return moment(date).format("LL");
  };
  React.useEffect(() => {
    fetchData();
  }, []);

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
              <Typography component="h2" variant="h5"></Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {getDate(post.updatedAt)} by {post.name}
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
            <Stack direction="row" spacing={1}></Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
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
          </Grid>
        </Grid>
      </Box>
      <AlertDialog open={open} setOpen={setOpen} deleteId={deleteId} />
    </>
  );
};

export default ViewOne;

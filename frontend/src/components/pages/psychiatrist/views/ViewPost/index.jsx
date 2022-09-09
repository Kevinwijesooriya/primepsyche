import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box, Button, Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { PostContainer, StyledLink, WarningButtonOutlined } from "../../styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import Stack from "@mui/material/Stack";
import AlertDialog from "../DeleteConfirmation";
import BasicPagination from "../components/Pagination";

const ViewPosts = () => {
  const [open, setOpen] = React.useState(false);

  const onClickDelete = () => {
    setOpen(true);
  };
  const PostList = [
    {
      gender: "Male",
      age: "20",
      disorder: "Depression",
      description:
        "Initially I had this problem. So I used to do this. Then I realized this. So I stated doing this. Thats how I overcome this. You also do this",
    },
    {
      gender: "Male",
      age: "20",
      disorder: "Depression",
      description:
        "Initially I had this problem. So I used to do this. Then I realized this. So I stated doing this. Thats how I overcome this. You also do this",
    },
    {
      gender: "Male",
      age: "20",
      disorder: "Depression",
      description:
        "Initially I had this problem. So I used to do this. Then I realized this. So I stated doing this. Thats how I overcome this. You also do this",
    },
    {
      gender: "Male",
      age: "20",
      disorder: "Depression",
      description:
        "Initially I had this problem. So I used to do this. Then I realized this. So I stated doing this. Thats how I overcome this. You also do this",
    },
    {
      gender: "Male",
      age: "20",
      disorder: "Depression",
      description:
        "Initially I had this problem. So I used to do this. Then I realized this. So I stated doing this. Thats how I overcome this. You also do this",
    },
  ];

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
          <Button>ADD A NEW HELP REQUEST</Button>
        </StyledLink>
      </Box>
      {PostList &&
        PostList.map((post) => (
          <PostContainer item xs={12} md={6}>
            <CardActionArea component="a" href="#">
              <Card sx={{ display: "flex" }}>
                <CardContent sx={{ flex: 0.1, p: 0.1 }}>
                  <Typography component="h2" variant="h5">
                    {post.gender}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {post.age}
                  </Typography>
                </CardContent>

                <CardContent sx={{ flex: 1, p: 2 }}>
                  <Typography variant="subtitle1" paragraph>
                    {post.description}
                  </Typography>
                </CardContent>
              </Card>
              <Divider></Divider>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" spacing={1}>
                    <IconButton>
                      <FavoriteIcon />
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
                    <StyledLink to="/primepsyche/forum/edit">
                      <Button variant="outlined" startIcon={<EditIcon />}>
                        Edit
                      </Button>
                    </StyledLink>
                    <WarningButtonOutlined
                      startIcon={<DeleteIcon />}
                      onClick={onClickDelete}
                    >
                      Delete
                    </WarningButtonOutlined>
                  </Stack>
                </Grid>
              </Grid>
            </CardActionArea>
          </PostContainer>
        ))}
      <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
        <BasicPagination count={10} />
      </Box>
      <AlertDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default ViewPosts;
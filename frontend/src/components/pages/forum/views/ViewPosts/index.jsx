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
import { Colors } from "../../../../../core/styles/theme/PrimePsycheTheme";
import AlertDialog from "../DeleteConfirmation";
import BasicPagination from "../components/Pagination";

const ViewPosts = () => {
  const [open, setOpen] = React.useState(false);

  const onClickDelete = () => {
    setOpen(true);
  };
  const PostList = [
    {
      title: "This is my problem",
      date: "Aug 12, 2022",
      userName: "Vasana Kumara",
      description:
        "Initially I had this problem. So I used to do this. Then I realized this. So I stated doing this. Thats how I overcome this. You also do this",
      image:
        "https://www.pngitem.com/pimgs/m/506-5066994_problem-png-transparent-png.png",
    },
    {
      title: "This is my problem",
      date: "Aug 12, 2022",
      userName: "Vasana Kumara",
      description:
        "Initially I had this problem. So I used to do this. Then I realized this. So I stated doing this. Thats how I overcome this. You also do this",
      image:
        "https://www.pngitem.com/pimgs/m/506-5066994_problem-png-transparent-png.png",
    },
    {
      title: "This is my problem",
      date: "Aug 12, 2022",
      userName: "Vasana Kumara",
      description:
        "Initially I had this problem. So I used to do this. Then I realized this. So I stated doing this. Thats how I overcome this. You also do this",
      image:
        "https://www.pngitem.com/pimgs/m/506-5066994_problem-png-transparent-png.png",
    },
    {
      title: "This is my problem",
      date: "Aug 12, 2022",
      userName: "Vasana Kumara",
      description:
        "Initially I had this problem. So I used to do this. Then I realized this. So I stated doing this. Thats how I overcome this. You also do this",
      image:
        "https://www.pngitem.com/pimgs/m/506-5066994_problem-png-transparent-png.png",
    },
    {
      title: "This is my problem",
      date: "Aug 12, 2022",
      userName: "Vasana Kumara",
      description:
        "Initially I had this problem. So I used to do this. Then I realized this. So I stated doing this. Thats how I overcome this. You also do this",
      image:
        "https://www.pngitem.com/pimgs/m/506-5066994_problem-png-transparent-png.png",
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
          <Button>SHARE YOUR EXPERIENCE</Button>
        </StyledLink>
      </Box>
      {PostList &&
        PostList.map((post) => (
          <PostContainer item xs={12} md={6}>
            <CardActionArea component="a" href="#">
              <Card sx={{ display: "flex" }}>
                <CardContent sx={{ flex: 1, p: 2 }}>
                  <Typography component="h2" variant="h5">
                    {post.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {post.date} by {post.userName}
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {post.description}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 160, display: { xs: "none", sm: "block" } }}
                  alt="image"
                  image={post.image}
                />
              </Card>
              <Divider></Divider>
              <Grid
                container
                spacing={3}
                sx={{ backgroundColor: `${Colors.prime_psyche_gradient}` }}
              >
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

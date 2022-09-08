import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import { ImageUploadButton, StyledLink, WarningButton } from "../../styles";
import { Stack } from "@mui/material";
import ForumPostAPI from "../../../../../core/services/ForumPostAPI";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const [files, setFiles] = React.useState();
  const [postsData, setPostsData] = React.useState({
    title: "",
    description: "",
    image: "",
  });
  const { title, description, image } = postsData;
  const params = useParams();
  const postId = params.id;
  async function fetchData() {
    const response = await ForumPostAPI.getOne(postId);
    setPostsData(response.data.data);
  }
  React.useEffect(() => {
    fetchData();
  }, []);
  function handleChange(e) {
    console.log(e.target.files);
    console.log("postsData", postsData);
    setFiles(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <>
      <Container>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            pb: 1,
            display: { xs: "none", md: "flex" },
          }}
        >
          <Typography variant="PageHeader" gutterBottom>
            Update your post
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <InputLabel>Title</InputLabel>
            <TextField
              required
              id="title"
              name="title"
              fullWidth
              multiline
              defaultValue={title || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Description</InputLabel>
            <TextField
              required
              id="description"
              name="description"
              fullWidth
              multiline
              defaultValue={description || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Enhance your post with an image!</InputLabel>
            <ImageUploadButton component="label">
              <input type="file" hidden onChange={handleChange} />
              {files && (
                <img
                  alt="forum_post"
                  src={files}
                  style={{ minHeight: 600, minWidth: 600 }}
                />
              )}{" "}
              {!image && (
                <ImageOutlinedIcon sx={{ minHeight: 600, minWidth: 600 }} />
              )}
              {image && (
                <img
                  alt="forum_post"
                  src={image}
                  style={{ minHeight: 600, minWidth: 600 }}
                />
              )}
            </ImageUploadButton>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button>save</Button>
              <StyledLink to={"/primepsyche/forum/"}>
                <WarningButton>Cancel</WarningButton>
              </StyledLink>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EditPost;

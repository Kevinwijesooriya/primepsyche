import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import { ImageUploadButton } from "../../styles";
import AddSnackBar from "../components/AddSnackBar";
// import AddPostAlerts from "../ForumAlerts/AddPostAlerts";

const AddPost = () => {
  const [files, setFiles] = React.useState();
  // const [errors, setErrors] = React.useState({
  //   alertType: "",
  //   alertTitle: "",
  //   alertMessage: "",
  // });
  const [open, setOpen] = React.useState(false);
  const onClickShare = () => {
    setOpen(true);
  };
  function handleChange(e) {
    console.log(e.target.files);
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
          {/* <AddPostAlerts
            alertType={"error"}
            alertTitle={"ERROR"}
            alertMessage={"Woops this is an error !"}
          /> */}
          <AddSnackBar open={open} setOpen={setOpen} />
          <Typography variant="PageHeader" gutterBottom>
            Share Your Experience
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <InputLabel>Title</InputLabel>
            <TextField
              required
              id="title"
              name="title"
              // label="Title"
              fullWidth
              multiline
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
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Enhance your post with an image!</InputLabel>
            <ImageUploadButton component="label">
              <input type="file" hidden onChange={handleChange} />
              {files ? (
                <img
                  alt="forum_post"
                  src={files}
                  style={{ minHeight: 600, minWidth: 600 }}
                />
              ) : (
                <ImageOutlinedIcon sx={{ minHeight: 600, minWidth: 600 }} />
              )}
            </ImageUploadButton>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button onClick={onClickShare}>SHARE</Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AddPost;

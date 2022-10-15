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
import ForumPostAPI from "../../../../../core/services/ForumPostAPI";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const AddPost = () => {
  const { user } = useSelector((state) => state.auth);
  const [files, setFiles] = React.useState();
  const [error, setError] = React.useState({ field: "", message: "" });
  const [open, setOpen] = React.useState(false);
  const [createSuccess, setCreateSuccess] = React.useState(false);
  const [postPayload, setPostPayload] = React.useState({
    userId: "",
    userName: "",
    title: "",
    description: "",
    image: "",
  });

  const onClickShare = async (e) => {
    e.preventDefault();
    if (isValid()) {
      const response = await ForumPostAPI.create(postPayload);
      console.log("~ onClickShare ~ response", response);
      if (response.status === 200) {
        setCreateSuccess(true);
        setOpen(true);
      } else {
        setCreateSuccess(false);
      }
    }
  };
  const isValid = () => {
    if (postPayload.description === "") {
      setError({ field: "description", message: "Please fill me" });
      return false;
    }
    if (postPayload.title === "") {
      setError({ field: "title", message: "Please fill me" });
      return false;
    }
    return true;
  };
  function handleChange(e) {
    console.log(e.target.files);
    setFiles(URL.createObjectURL(e.target.files[0]));
    setPostPayload({
      ...postPayload,
      image: URL.createObjectURL(e.target.files[0]),
    });
  }
  const onChangeInput = (e) => {
    setError({ field: "", message: "" });
    setPostPayload({
      ...postPayload,
      [e.target.name]: e.target.value,
      userId: user._id,
      userName: user.userName,
    });
  };

  const handleImageChange = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) return alert("File not exist.");
      if (file.size > 1024 * 1024)
        // 1mb
        return alert("Size too large!");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return alert("File format is incorrect.");
      let formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "http://localhost:5000/api/imageUpload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      setPostPayload({
        ...postPayload,
        image: res.data.url,
      });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
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
          <AddSnackBar open={open} setOpen={setOpen} success={createSuccess} />
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
              error={error.field === "title"}
              helperText={!postPayload.title && error.message}
              onChange={(e) => onChangeInput(e)}
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
              error={error.field === "description"}
              helperText={!postPayload.description && error.message}
              onChange={(e) => onChangeInput(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Enhance your post with an image!</InputLabel>
            <ImageUploadButton component="label">
              <input type="file" hidden onChange={handleImageChange} />
              {postPayload.image ? (
                <img
                  alt="forum_post"
                  src={postPayload.image}
                  style={{ height: 600, width: 600, objectFit: "cover" }}
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
            <Button onClick={(e) => onClickShare(e)}>SHARE</Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AddPost;

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
import EditSnackBar from "../components/EditSnackBar";
import axios from "axios";
import { toast } from "react-toastify";

const EditPost = () => {
  const [files, setFiles] = React.useState();
  const [payload, setPayload] = React.useState({
    title: "",
    description: "",
    image: "",
  });
  const [error, setError] = React.useState({ field: "", message: "" });
  const { title, description, image } = payload;
  const params = useParams();
  const postId = params.id;
  const [open, setOpen] = React.useState(false);
  const [updateSuccess, setUpdateSuccess] = React.useState(false);
  async function fetchData() {
    const response = await ForumPostAPI.getOne(postId);
    setPayload(response.data.data);
  }
  const onClickSave = async (e) => {
    e.preventDefault();
    {
      isValid() && setOpen(true);
    }
    const response = await ForumPostAPI.update({ postId, payload });
    console.log("~ onClickShare ~ response", response);
    if (response.status === 200) {
      setUpdateSuccess(true);
    } else {
      setUpdateSuccess(false);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  function handleChange(e) {
    console.log(e.target.files);
    console.log("payload", payload);
    setFiles(URL.createObjectURL(e.target.files[0]));
  }
  const onChangeInput = (e) => {
    setError({ field: "", message: "" });
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  const isValid = () => {
    if (payload.description === "") {
      setError({ field: "description", message: "Please fill me" });
      return false;
    }
    if (payload.title === "") {
      setError({ field: "title", message: "Please fill me" });
      return false;
    }
    return true;
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
      setPayload({
        ...payload,
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
          <EditSnackBar open={open} setOpen={setOpen} success={updateSuccess} />
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
              onChange={(e) => onChangeInput(e)}
              error={error.field === "title"}
              helperText={!payload.title && error.message}
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
              onChange={(e) => onChangeInput(e)}
              error={error.field === "description"}
              helperText={!payload.description && error.message}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Enhance your post with an image!</InputLabel>
            <ImageUploadButton component="label">
              <input type="file" hidden onChange={handleImageChange} />
              {image && (
                <img
                  alt="forum_post"
                  src={image}
                  style={{ height: 600, width: 600 }}
                />
              )}{" "}
              {!image && (
                <ImageOutlinedIcon sx={{ minHeight: 600, minWidth: 600 }} />
              )}
            </ImageUploadButton>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button onClick={onClickSave}>save</Button>
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

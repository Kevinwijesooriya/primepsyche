import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { InputLabel, TextField, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Box from "@mui/material/Box";
import { ImageUploadButton } from "../../styles";
import AddSnackBar from "../components/AddSnackBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
const AddReadable = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({ message: "" });
  const { user } = useSelector((state) => state.auth);
  const [userId, setUserId] = useState(user._id);
  console.log("🚀 ~ file: index.jsx ~ line 22 ~ AddReadable ~ userId", userId);
  const [title, setTitle] = useState();
  console.log("🚀 ~ file: index.jsx ~ line 25 ~ AddReadable ~ title", title);
  const [author, setAuthor] = useState();
  console.log("🚀 ~ file: index.jsx ~ line 27 ~ AddReadable ~ author", author);
  const [files, setFiles] = useState("123456");
  const [readableFile, setReadableFile] = useState(false);
  console.log(
    "🚀 ~ file: index.jsx ~ line 30 ~ AddReadable ~ readableFile",
    readableFile
  );
  const [image, setImage] = useState(false);
  console.log("🚀 ~ file: index.jsx ~ line 28 ~ AddReadable ~ image", image);

  // const onClickShare = () => {
  //   {
  //     isValid() && setOpen(true);
  //   }
  // };
  const isValid = () => {
    if (title === "") {
      setError({ field: "title", message: "Please fill me" });
      return false;
    }
    return true;
  };

  const onChangeInput = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setError({ message: "" });
    }
    if (e.target.name === "author") {
      setAuthor(e.target.value);
    } else setError({ message: "" });
  };
  // function handleChange(e) {
  //   console.log(e.target.files);
  //   setImage(URL.createObjectURL(e.target.files[0]));
  //   console.log(e.target.readableFile);
  //   setReadableFile(URL.createObjectURL(e.target.files[0]));
  // }
  const handleChange = async (e) => {
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
      setImage(res.data.url);
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.error(err.response.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleFileChange = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) return alert("File not exist.");

      let formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "http://localhost:5000/api/fileUpload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      setReadableFile(res.data.url);
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onClickShare = async (e) => {
    {
      isValid() && setOpen(true);
    }
    e.preventDefault();
    if (title === "" || author === "") {
      alert("Fill all the fields");
    } else {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/readableMaterials/create",
          { userId, title, author, readableFile, image }
        );
        console.log(res);
        // alert(res.data)
        toast.success(res.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        //  window.location.href = '/pharmacist'
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Container>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            pb: 1,
            display: { xs: "none", md: "flex" },
          }}
        >
          <AddSnackBar open={open} setOpen={setOpen} />
          <Typography variant="PageHeader" gutterBottom>
            Add Readable
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12}>
              <InputLabel>Title</InputLabel>
              <TextField
                required
                id="title"
                name="title"
                fullWidth
                multiline
                error={error.field === "title"}
                helperText={error.message}
                onChange={(e) => onChangeInput(e)}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Author</InputLabel>
              <TextField
                required
                id="author"
                name="author"
                fullWidth
                multiline
                onChange={(e) => onChangeInput(e)}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Readable File</InputLabel>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  display: "flex",

                  flexDirection: "row",

                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>
                    Select a readable file from your computer
                  </Typography>
                </Box>
                <Button component="label">
                  <input
                    type="file"
                    id="readableFile"
                    name="readableFile"
                    hidden
                    onChange={handleFileChange}
                  />
                  BROWSE
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Preview Image</InputLabel>
            <ImageUploadButton component="label">
              <input type="file" hidden onChange={handleChange} />
              {image ? (
                <img
                  alt="forum_post"
                  src={image}
                  style={{ minHeight: 400, minWidth: 400 }}
                />
              ) : (
                <ImageOutlinedIcon sx={{ minHeight: 400, minWidth: 400 }} />
              )}
            </ImageUploadButton>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button onClick={onClickShare}>ADD</Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AddReadable;
import React, { useContext, useState } from "react";
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


const AddReadable = () => {
  
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({ message: "" });
  const [userId, setUserId] = useState();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState();
  const [files, setFiles] = useState();
  // const [files, setFiles] = useState();

  // userId, title, author, readableFile, image;
  

  const onClickShare = () => {
    {
      isValid() && setOpen(true);
    }
  };
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
    }
    setError({ message: "" });
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
                  <input type="file" hidden onChange={handleChange} />
                  BROWSE
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Preview Image</InputLabel>
            <ImageUploadButton component="label">
              <input type="file" hidden onChange={handleChange} />
              {files ? (
                <img
                  alt="forum_post"
                  src={files}
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

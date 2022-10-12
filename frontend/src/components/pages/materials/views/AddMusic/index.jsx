import React from "react";
import { InputLabel, TextField, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Box from "@mui/material/Box";
import { ImageUploadButton } from "../../styles";
import AddSnackBar from "../components/AddSnackBar";

const AddMusic = () => {
  const [files, setFiles] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState({ message: "" });
  const [title, setTitle] = React.useState("");

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
            Add Music
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
              <InputLabel>Genre</InputLabel>
              <TextField required id="genre" name="genre" fullWidth multiline />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Album</InputLabel>
              <TextField required id="album" name="album" fullWidth multiline />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Artist</InputLabel>
              <TextField
                required
                id="artist"
                name="artist"
                fullWidth
                multiline
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Audio File</InputLabel>
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
                    Select a music file from your computer
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
            <InputLabel>Album Art</InputLabel>
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

export default AddMusic;

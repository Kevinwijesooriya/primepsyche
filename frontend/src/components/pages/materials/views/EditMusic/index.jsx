import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import { ImageUploadButton, WarningButton } from "../../styles";
import { Stack } from "@mui/material";

const EditMusic = () => {
  const [files, setFiles] = React.useState();
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
          <Typography variant="PageHeader" gutterBottom>
            Edit Your Music
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12}>
              <InputLabel>Title</InputLabel>
              <TextField required id="title" name="title" fullWidth multiline />
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
              <Stack></Stack>
              <Button component="label">
                <input type="file" hidden onChange={handleChange} />
                BROWSE
              </Button>
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
            <Grid item xs={12}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button>save</Button>
                <WarningButton>Cancel</WarningButton>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EditMusic;

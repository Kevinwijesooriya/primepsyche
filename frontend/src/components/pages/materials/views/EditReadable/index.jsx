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

const EditReadable = () => {
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
            Edit Your Readable
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
                defaultValue={"Mindfulness"}
                fullWidth
                multiline
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Author</InputLabel>
              <TextField
                required
                id="author"
                name="author"
                defaultValue={"Joseph Goldstein"}
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
            <Grid item xs={12}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <StyledLink to="/primepsyche/materials/viewReadable">
                  <Button>save</Button>
                </StyledLink>
                <WarningButton>Cancel</WarningButton>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EditReadable;

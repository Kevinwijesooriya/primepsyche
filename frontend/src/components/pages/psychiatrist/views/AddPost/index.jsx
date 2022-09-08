import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import { ImageUploadButton } from "../../styles";
// import AddPostAlerts from "../ForumAlerts/AddPostAlerts";

const HelpHomePage = () => {
  const [files, setFiles] = React.useState();
  // const [errors, setErrors] = React.useState({
  //   alertType: "",
  //   alertTitle: "",
  //   alertMessage: "",
  // });
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
          <Typography variant="PageHeader" gutterBottom>
            Professional Help/request
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <InputLabel>Your Name</InputLabel>
            <TextField
              required
              id="name"
              name="name"
              // label="Title"
              fullWidth
              multiline
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <InputLabel>Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value="gender"
              >
                <MenuItem value="male">male</MenuItem>
                <MenuItem value="female">female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Age</InputLabel>
            <TextField required id="age" name="age" fullWidth multiline />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <InputLabel>
                which of the following topic match with your problem
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value="disorder"
              >
                <MenuItem value="Depression">Depression</MenuItem>
                <MenuItem value="nxiety disorder">
                  generalized anxiety disorders social anxiety disorders panic
                  disorders, and phobias.
                </MenuItem>
                <MenuItem value="OCD">
                  Obsessive-compulsive disorder (OCD)
                </MenuItem>
                <MenuItem value="Bipolar disorder">Bipolar disorder</MenuItem>
                <MenuItem value="PTSD">
                  Post-traumatic stress disorder (PTSD)
                </MenuItem>
                <MenuItem value="Schizophrenia">Schizophrenia</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Describe the problem</InputLabel>
            <TextField
              required
              id="description"
              name="description"
              fullWidth
              multiline
            />
          </Grid>
          {/* <Grid item xs={12}>
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
          </Grid> */}
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button>POST</Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HelpHomePage;

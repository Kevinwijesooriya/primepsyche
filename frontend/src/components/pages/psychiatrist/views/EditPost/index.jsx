import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { StyledLink, WarningButton } from "../../styles";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import { useState } from "react";

const EditPost = () => {
  const [files, setFiles] = React.useState();
  const [gender, setGender] = useState("");
  const [disorder, setDisorder] = useState("");

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
              defaultValue={"Kevin Dilshan Wijesooriya"}
              placeholder="Enter your name"
              // label="Title"
              sx={{ width: "340px" }}
              multiline
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Gender</InputLabel>
            <FormControl>
              <Select
                sx={{ width: "340px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                required
                displayEmpty
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <MenuItem value="">
                  <em>Male</em>
                </MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Age</InputLabel>
            <TextField
              required
              id="age"
              name="age"
              defaultValue={20}
              sx={{ width: "340px" }}
              multiline
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Type of Disorder</InputLabel>
            <FormControl>
              <Select
                sx={{ width: "740px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={disorder}
                required
                displayEmpty
                onChange={(e) => {
                  setDisorder(e.target.value);
                }}
              >
                <MenuItem value="">
                  <em>Depression</em>
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
              sx={{ width: "740px" }}
              required
              id="description"
              name="description"
              defaultValue={
                "Initially I had this problem. So I used to do this. Then I realized this. So I stated doing this. Thats how I overcome this. You also do this"
              }
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
            <StyledLink to={"/primepsyche/help/view"}>
              <Button>POST</Button>
              <WarningButton>Cancel</WarningButton>
            </StyledLink>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EditPost;

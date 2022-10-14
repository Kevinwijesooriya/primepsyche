import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";

import React, { useState } from "react";
import axios from "axios";
import AddSnackBar from "../components/AddSnackBar";

const HelpHomePage = () => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [disorder, setDisorder] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = React.useState({ message: "", field: "" });

  function sendData(e) {
    e.preventDefault();

    const newPost = {
      name,
      age,
      gender,
      disorder,
      description,
    };
    if (name === "" && age === "") {
      setError({ field: "name", message: "Please fill me" });
    } else {
      axios
        .post("http://localhost:5000/api/HelpPost/create", newPost)
        .then((res) => {
          console.log(res);
          setOpen(true);
          setName("");
          setGender("");
          setAge("");
          setDisorder("");
          setDescription("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
              placeholder="Enter your name"
              // label="Title"
              sx={{ width: "340px" }}
              multiline
              onChange={(e) => {
                setName(e.target.value);
              }}
              error={error.field === "name"}
              helperText={error.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Gender</InputLabel>
            <FormControl>
              <Select
                displayEmpty
                sx={{ width: "340px" }}
                labelId="demo-simple-select-label"
                id="gender"
                name="gender"
                value={gender}
                placeholder="Gender"
                required
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                error={error.field === "gender"}
                helperText={error.message}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="male">Male</MenuItem>
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
              placeholder="How old are you?"
              sx={{ width: "340px" }}
              multiline
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Type of Disorder</InputLabel>
            <FormControl>
              <Select
                displayEmpty
                sx={{ width: "740px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={disorder}
                placeholder=" which of the following topic match with your problem"
                required
                onChange={(e) => {
                  setDisorder(e.target.value);
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Depression">Depression</MenuItem>
                <MenuItem value="OCD">
                  Obsessive-compulsive disorder (OCD)
                </MenuItem>
                <MenuItem value="Bipolar disorder">Bipolar disorder</MenuItem>
                <MenuItem value="PTSD">
                  Post-traumatic stress disorder (PTSD)
                </MenuItem>
                <MenuItem value="Schizophrenia">Schizophrenia</MenuItem>
                <MenuItem value="other">Other</MenuItem>
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
              placeholder=" Describe your problem here"
              multiline
              onChange={(e) => {
                setDescription(e.target.value);
              }}
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
            <Button onClick={sendData}>POST</Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HelpHomePage;

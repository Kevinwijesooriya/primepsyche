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
import { useParams } from "react-router-dom";
import EditSnackBar from "../components/EditSnackBar";
import HelpPostAPI from "../../../../../core/services/HelpPostAPI";

const EditPost = () => {
  const [files, setFiles] = React.useState();
  const [payload, setPayload] = React.useState({
    name: "",
    age: "",
    gender: "",
    disorder: "",
    description: "",
  });
  const [error, setError] = React.useState({ field: "", message: "" });
  const { name, age, gender, disorder, description } = payload;
  const params = useParams();
  const postId = params.id;
  const [open, setOpen] = React.useState(false);
  const [updateSuccess, setUpdateSuccess] = React.useState(false);
  async function fetchData() {
    const response = await HelpPostAPI.getOne(postId);
    setPayload(response.data.data);
  }
  const onClickSave = async (e) => {
    e.preventDefault();
    {
      isValid() && setOpen(true);
    }
    const response = await HelpPostAPI.update({ postId, payload });
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
    if (payload.disorder === "") {
      setError({ field: "disorder", message: "Please fill me" });
      return false;
    }
    return true;
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
              defaultValue={name || ""}
              sx={{ width: "340px" }}
              onChange={(e) => onChangeInput(e)}
              multiline
              error={error.field === "name"}
              helperText={!payload.name && error.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Gender</InputLabel>
            <FormControl>
              <Select
                sx={{ width: "340px" }}
                labelId="demo-simple-select-label"
                required
                id="gender"
                name="gender"
                defaultValue={gender || ""}
                displayEmpty
                onChange={(e) => onChangeInput(e)}
                error={error.field === "gender"}
                helperText={!payload.gender && error.message}
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
              sx={{ width: "340px" }}
              multiline
              defaultValue={age || ""}
              onChange={(e) => onChangeInput(e)}
              error={error.field === "age"}
              helperText={!payload.age && error.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Type of Disorder</InputLabel>
            <FormControl>
              <Select
                sx={{ width: "740px" }}
                labelId="demo-simple-select-label"
                id="dissorder"
                name="disorder"
                required
                displayEmpty
                defaultValue={disorder || ""}
                onChange={(e) => onChangeInput(e)}
                error={error.field === "disorder"}
                helperText={!payload.disorder && error.message}
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
              multiline
              defaultValue={description || ""}
              onChange={(e) => onChangeInput(e)}
              error={error.field === "description"}
              helperText={!payload.description && error.message}
            />
          </Grid>
          <Grid
            item
            xs={12}
            direction="row"
            spacing={1}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <StyledLink to={"/primepsyche/help/view"}>
              <Button onClick={onClickSave}>POST</Button>
              <WarningButton>Cancel</WarningButton>
            </StyledLink>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default EditPost;

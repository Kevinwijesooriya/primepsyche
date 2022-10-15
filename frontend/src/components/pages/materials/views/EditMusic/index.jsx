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
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditMusic = () => {
  const params = useParams();
  const id = params.id;
  const [files, setFiles] = React.useState();
  const [payload, setPayload] = React.useState({
    userId: "",
    title: "",
    genre: "",
    album: "",
    artist: "",
    audioFile: "",
    image: "",
  });
  const [error, setError] = React.useState({ field: "", message: "" });
  const { userId, title, genre, album, artist, audioFile, image } = payload;

  async function fetchData() {
    await axios
      .get(`http://localhost:5000/api/audioMaterials/get/${id}`)
      .then((res) => {
        console.log(res);
        setPayload(res.data.data);
      })
      .catch((err) => {
        toast.error(err.massage);
      });
  }
  React.useEffect(() => {
    fetchData();
  }, []);
  const onClickSave = async (e) => {
    e.preventDefault();
    if (isValid()) {
      await axios
        .put(
          `http://localhost:5000/api/audioMaterials/update/${id}`,
          payload
        )
        .then((res) => {
          console.log(res);
          toast.success("Changes Saved");
        })
        .catch((err) => {
          toast.error(err.massage);
        });
    }
  };
  const isValid = () => {
    if (payload.genre === "") {
      setError({ field: "genre", message: "Please fill me" });
      return false;
    }
    if (payload.title === "") {
      setError({ field: "title", message: "Please fill me" });
      return false;
    }
    if (payload.album === "") {
      setError({ field: "album", message: "Please fill me" });
      return false;
    }
    if (payload.artist === "") {
      setError({ field: "artist", message: "Please fill me" });
      return false;
    }
    return true;
  };
  const onChangeInput = (e) => {
    setError({ field: "", message: "" });
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
    console.log(payload);
  };
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
      //  setImage(res.data.url);
      setPayload({
        ...payload,
        image: res.data.url,
      });
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
      // setReadableFile(res.data.url);

      setPayload({
        ...payload,
        audioFile: res.data.url,
      });
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
              <TextField
                required
                id="title"
                name="title"
                defaultValue={"Deep in the Ocean"}
                fullWidth
                multiline
                error={error.field === "title"}
                helperText={!payload.title && error.message}
                onChange={(e) => onChangeInput(e)}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Genre</InputLabel>
              <TextField
                required
                id="genre"
                name="genre"
                defaultValue={"Modern Classical"}
                fullWidth
                multiline
                error={error.field === "genre"}
                helperText={!payload.genre && error.message}
                onChange={(e) => onChangeInput(e)}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Album</InputLabel>
              <TextField
                required
                id="album"
                name="album"
                defaultValue={"NaturesEye"}
                fullWidth
                multiline
                error={error.field === "album"}
                helperText={!payload.album && error.message}
                onChange={(e) => onChangeInput(e)}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Artist</InputLabel>
              <TextField
                required
                id="artist"
                name="artist"
                defaultValue={"Clair de Lune"}
                fullWidth
                multiline
                error={error.field === "artist"}
                helperText={!payload.artist && error.message}
                onChange={(e) => onChangeInput(e)}
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
                  <input
                    type="file"
                    hidden
                    id="audioFile"
                    name="audioFile"
                    onChange={handleChange}
                  />
                  BROWSE
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Album Art</InputLabel>
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
            <Grid item xs={12}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <StyledLink to="/primepsyche/materials/viewMusic">
                  <Button onClick={(e) => onClickSave(e)}>save</Button>
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

export default EditMusic;

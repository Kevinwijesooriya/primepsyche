import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box, Button, Divider, ListItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { PostContainer, StyledLink, WarningButtonOutlined } from "../../styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import Stack from "@mui/material/Stack";
import { Colors } from "../../../../../core/styles/theme/PrimePsycheTheme";
import BasicPagination from "../components/Pagination";
import AlertDialog from "../../../forum/views/DeleteConfirmation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MaterialsAlertDialog from "../materialsDeleteConfirmation";
import TextField from "@mui/material/TextField";
import MusicAlertDialog from "../MusicDeleteConfirmation";

const ViewMusic = () => {
  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState(false);
  const [expandItem, setExpandItem] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [music, setMusic] = useState([]);
  const [userID, setUserID] = useState(user._id);
  const [approve, setApprove] = useState(true);
  const [deleteId, setDeleteId] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const onClickDelete = (mID) => {
    setOpen(true);
    setDeleteId(mID);
  };
  const onClickExpand = (id) => {
    setExpandItem(id);
    setExpand(!expand);
  };
  useEffect(() => {
    const getAllMusic = async () => {
      await axios
        .post(
          `http://localhost:5000/api/audioMaterials/getApproveAudioMaterial`,
          { approve: true }
        )
        .then((res) => {
          console.log(res);
          setMusic(res.data.data);
        })
        .catch((err) => {
          alert(err.massage);
        });
    };

    getAllMusic();
  }, []);
  const handleEditMusic = (MusicID) => {
    navigate(`editReadable/${MusicID}`);
  };
  const filteredCountries = music.filter((music) => {
    return (
      music.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      music.genre.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      music.album.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      music.artist.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
  });
  return (
    <>
      <TextField
        id="outlined-multiline-flexible"
        label="search"
        multiline
        maxRows={4}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          pb: 1,
          display: { xs: "none", md: "flex" },
        }}
      >
        <Typography variant="PageHeader" gutterBottom>
          Music Library
        </Typography>
        <StyledLink to="/primepsyche/materials/viewReadable">
          <Button
            sx={{ position: "absolute", right: "12%" }}
            variant="outlined"
            startIcon={<CollectionsBookmarkIcon />}
          >
            Explore Readable Section
          </Button>
        </StyledLink>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", py: 2 }}>
        <StyledLink to="/primepsyche/materials/addMusic">
          <Button>ADD MUSIC</Button>
        </StyledLink>
      </Box>
      {music &&
        filteredCountries.map((music, index) => (
          <PostContainer item xs={12} md={6}>
            <ListItem sx={{ justifyContent: "space-between" }}>
              <Stack direction="row">
                <IconButton>
                  <PlayArrowIcon />
                </IconButton>
                <CardMedia
                  component="img"
                  sx={{ width: 90, display: { xs: "none", sm: "block" } }}
                  alt="image"
                  image={music.image}
                />

                <Box>
                  <Typography component="h2" variant="h5">
                    {music.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {music.artist}
                  </Typography>
                </Box>
              </Stack>
              <Box>
                <Button href={music.audioFile}>Download</Button>

                <IconButton onClick={() => onClickExpand(music._id)}>
                  <KeyboardArrowDownIcon />
                </IconButton>
              </Box>
            </ListItem>
            {expand && expandItem === music._id && (
              <>
                <CardActionArea component="a" href="#">
                  <Card sx={{ display: "flex" }}>
                    <CardContent sx={{ flex: 1, p: 2 }}>
                      <Typography component="h2" variant="h5">
                        {music.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {music.artist}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {music.genre}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {music.album}
                      </Typography>
                    </CardContent>
                    <CardMedia
                      component="img"
                      sx={{ width: 160, display: { xs: "none", sm: "block" } }}
                      alt="image"
                      image={music.image}
                    />
                  </Card>
                </CardActionArea>
                <Divider></Divider>
                <Grid
                  container
                  spacing={3}
                  sx={{ backgroundColor: `${Colors.prime_psyche_gradient}` }}
                >
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1}>
                      <IconButton>
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton>
                        <CommentIcon />
                      </IconButton>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {userID == music.userId && (
                      <>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                          <StyledLink
                            to={`/primepsyche/materials/editMusic/${music._id}`}
                          >
                            <Button variant="outlined" startIcon={<EditIcon />}>
                              Edit
                            </Button>
                          </StyledLink>
                          <WarningButtonOutlined
                            startIcon={<DeleteIcon />}
                            onClick={() => onClickDelete(music._id)}
                          >
                            Delete
                          </WarningButtonOutlined>
                        </Stack>
                      </>
                    )}
                  </Grid>
                </Grid>
              </>
            )}
          </PostContainer>
        ))}
      <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
        <BasicPagination count={10} />
      </Box>
      <MusicAlertDialog deleteId={deleteId} open={open} setOpen={setOpen} />
    </>
  );
};

export default ViewMusic;

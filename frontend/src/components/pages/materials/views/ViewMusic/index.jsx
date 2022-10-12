import React from "react";
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



const ViewMusic = () => {
  const [open, setOpen] = React.useState(false);
  const [expand, setExpand] = React.useState(false);
  const [expandItem, setExpandItem] = React.useState(false);

  const onClickDelete = () => {
    setOpen(true);
  };
  const onClickExpand = (id) => {
    setExpandItem(id);
    setExpand(!expand);
  };
  const MusicList = [
    {
      _id: "uef-1234",
      title: "Deep in the Ocean",
      artist: "Clair de Lune",
      genre: "Modern Classical",
      album: "NaturesEye",
      image:
        "https://lmg-labmanager.s3.amazonaws.com/assets/articleNo/28124/aImg/50895/deep-ocean-warming-as-climate-changes-l.jpg",
    },
    {
      _id: "uef-12345s",
      title: "Melody of Nature",
      artist: "Chet Baker",
      genre: "Modern Classical",
      album: "Nature",
      image: "https://mereinkling.files.wordpress.com/2012/07/naturemusic.jpg",
    },
  ];

  return (
    <>
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
      {MusicList &&
        MusicList.map((music) => (
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
                <Button>Download</Button>

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
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <StyledLink to="/primepsyche/materials/editMusic">
                        <Button variant="outlined" startIcon={<EditIcon />}>
                          Edit
                        </Button>
                      </StyledLink>
                      <WarningButtonOutlined
                        startIcon={<DeleteIcon />}
                        onClick={onClickDelete}
                      >
                        Delete
                      </WarningButtonOutlined>
                    </Stack>
                  </Grid>
                </Grid>
              </>
            )}
          </PostContainer>
        ))}
      <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
        <BasicPagination count={10} />
      </Box>
      <AlertDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default ViewMusic;

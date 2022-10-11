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
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";



const ViewReadable = () => {
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
  const ReadableList = [
    {
      _id: "uef-1234",
      title: "Mindfulness",
      author: "Joseph Goldstein",
      image: "https://m.media-amazon.com/images/I/41v4ounra+L._AC_SY780_.jpg",
    },
    {
      _id: "uef-12345s",
      title: "How to relax your mind",
      author: "Jim Ryan & Simon Ralph",
      image:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1454016268l/28795314._SY475_.jpg",
    },
    {
      _id: "uef-12346s",
      title: "Instant Calm",
      author: "Karen Salmansohn",
      image:
        "https://www.notsalmon.com/wp-content/uploads/2019/02/instant-calm-book-cover-01-498x730.png",
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
          Readable Materials
        </Typography>
        <StyledLink to="/primepsyche/materials/viewMusic">
          <Button
            sx={{ position: "absolute", right: "12%" }}
            variant="outlined"
            startIcon={<LibraryMusicIcon />}
          >
            Explore Music Library
          </Button>
        </StyledLink>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", py: 2 }}>
        <StyledLink to="/primepsyche/materials/addReadable">
          <Button>ADD READABLE</Button>
        </StyledLink>
      </Box>
      {ReadableList &&
        ReadableList.map((readable) => (
          <PostContainer item xs={12} md={6}>
            <ListItem sx={{ justifyContent: "space-between" }}>
              <Stack direction="row">
                <CardMedia
                  component="img"
                  sx={{ width: 90, display: { xs: "none", sm: "block" } }}
                  alt="image"
                  image={readable.image}
                />

                <Box>
                  <Typography component="h2" variant="h5">
                    {readable.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {readable.author}
                  </Typography>
                </Box>
              </Stack>
              <Box>
                <Button>Download</Button>

                <IconButton onClick={() => onClickExpand(readable._id)}>
                  <KeyboardArrowDownIcon />
                </IconButton>
              </Box>
            </ListItem>
            {expand && expandItem === readable._id && (
              <>
                <CardActionArea component="a" href="#">
                  <Card sx={{ display: "flex" }}>
                    <CardContent sx={{ flex: 1, p: 2 }}>
                      <Typography component="h2" variant="h5">
                        {readable.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {readable.author}
                      </Typography>
                    </CardContent>
                    <CardMedia
                      component="img"
                      sx={{ width: 160, display: { xs: "none", sm: "block" } }}
                      alt="image"
                      image={readable.image}
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
                      <StyledLink to="/primepsyche/materials/editReadable">
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

export default ViewReadable;

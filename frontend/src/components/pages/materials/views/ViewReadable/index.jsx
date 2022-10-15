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
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MaterialsAlertDialog from "../materialsDeleteConfirmation";
import TextField from "@mui/material/TextField";

const ViewReadable = () => {
  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState(false);
  const [expandItem, setExpandItem] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [readable, setReadable] = useState([]);
  const [userID, setUserID] = useState(user._id);
  // console.log("🚀 ~ file: index.jsx ~ line 34 ~ ViewReadable ~ userID", userID)
  const [approve, setApprove] = useState(true);
  const [deleteId, setDeleteId] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  // console.log("🚀 ~ file: index.jsx ~ line 36 ~ ViewReadable ~ deleteId", deleteId)

  // if (userID==readable.userId) {

  // } else {

  // }

  console.log(
    "🚀 ~ file: index.jsx ~ line 29 ~ ViewReadable ~ readable",
    readable
  );
  const onClickDelete = (rID) => {
    setOpen(true);
    setDeleteId(rID);
  };
  const onClickExpand = (id) => {
    setExpandItem(id);
    setExpand(!expand);
  };
  useEffect(() => {
    const getAllReadable = async () => {
      await axios
        .post(
          `http://localhost:5000/api/readableMaterials/getApproveReadableMaterial`,
          { approve: true }
        )
        .then((res) => {
          console.log(res);
          setReadable(res.data.data);
        })
        .catch((err) => {
          alert(err.massage);
        });
    };

    getAllReadable();
  }, []);
  const handleEditReadable = (ReadableID) => {
    console.log(
      "🚀 ~ file: index.jsx ~ line 63 ~ handleEditReadable ~ ReadableID",
      ReadableID
    );
    navigate(`editReadable/${ReadableID}`);
  };
  const filteredCountries = readable.filter((readable) => {
    return (
      readable.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      readable.author.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
  });
  return (
    <>
      {/* <input class=""   type="search"   placeholder="Search"   aria-label="Search"
                            onChange={e => setSearchTerm(e.target.value)}
                        /> */}
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
      {readable &&
        filteredCountries.map((readable, index) => (
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
                <Button href={readable.readableFile}>Download</Button>

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
                    {userID == readable.userId && (
                      <>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                          <StyledLink
                            to={`/primepsyche/materials/editReadable/${readable._id}`}
                          >
                            <Button variant="outlined" startIcon={<EditIcon />}>
                              Edit
                            </Button>
                          </StyledLink>
                          <WarningButtonOutlined
                            startIcon={<DeleteIcon />}
                            onClick={() => onClickDelete(readable._id)}
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
      <MaterialsAlertDialog deleteId={deleteId} open={open} setOpen={setOpen} />
    </>
  );
};

export default ViewReadable;

import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box, Button, Divider, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { PostContainer, StyledLink, WarningButtonOutlined } from "../../styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import Stack from "@mui/material/Stack";
import { Colors } from "../../../../../core/styles/theme/PrimePsycheTheme";
import AlertDialog from "../DeleteConfirmation";
import BasicPagination from "../components/Pagination";
import EventAPI from "../../../../../core/services/EventAPI";
import { Link } from "react-router-dom";
import moment from "moment";
import ESnackBar from "../components/ESnackBar";
import { useSelector } from "react-redux";
// import Comments from "./comments/Comments";
import { red } from "@mui/material/colors";
import Comments from "../ViewEvent/comments/Comments";
import { toast } from "react-toastify";



const CusViewEvents = () => {
    const [open, setOpen] = React.useState(false);
    const { user } = useSelector((state) => state.auth);
    const [eventsList, setEventsList] = React.useState([]);
    const [deleteId, setDeleteId] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [commentsVisible, setCommentsVisible] = React.useState(false);
    const [snack, setSnack] = React.useState({
        open: false,
        severity: "",
        message: "",
    });
    const [searchTerm, setSearchTerm] = React.useState("");
    const fetchData = async () => {
        const response = await EventAPI.getAll(user._id);
        if (response.status === 200) {
            setEventsList(response.data.data);
        }
    }
    React.useEffect(() => {
        fetchData();
    }, []);
    const onClickComment = (id) => {
        setComment(id);
        setCommentsVisible(!commentsVisible);
    };
    const filteredEvents = eventsList.filter((eventsList) => {
        return (
            eventsList.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            eventsList.conducted_by.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
    });

    const onClickJoin = () => { 
        toast.success("We will send the meeting link via email")
     }

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
                   All Events
                </Typography>
            </Box>
            <TextField
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
            /><hr></hr>
            {filteredEvents &&
                filteredEvents.map((event) => (
                    <PostContainer item xs={12} md={6}>
                        <CardActionArea component="a" href="#">
                            <Card component={Link} to={`/primepsyche/events/view/${event._id}`} sx={{ display: "flex", textDecoration: "none" }}>
                                <CardContent sx={{ flex: 1, p: 2 }}>
                                    <Typography component="h2" variant="h6">
                                        Title : <Typography display="inline" >{event.title}</Typography>
                                    </Typography>
                                    <Typography component="h2" variant="h6">
                                        Date : <Typography display="inline"> {moment(event.date).format("MMM Do YYYY")}  </Typography>
                                    </Typography>
                                    <Typography component="h2" variant="h6">
                                        Time : <Typography display="inline"> {moment(event.time).format("h:mm a")}  </Typography>
                                    </Typography>
                                    <Typography component="h2" variant="h6">
                                        Conducted By : <Typography display="inline"> {event.conducted_by}  </Typography>
                                    </Typography>
                                </CardContent>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 160, display: { xs: "none", sm: "block" } }}
                                    alt="image"
                                    image={event.image}
                                />
                            </Card>
                            <Divider></Divider>
                            <Grid
                                container
                                spacing={3}
                                sx={{ backgroundColor: `${Colors.prime_psyche_gradient}` }}
                            >
                                <Grid item xs={12} sm={6}>
                                    <Stack direction="row" spacing={1}>
                                        <IconButton>
                                            <FavoriteIcon sx={{ color: red[900] }} />
                                        </IconButton>
                                        <IconButton>
                                            <CommentIcon onClick={() => onClickComment(event._id)} />
                                        </IconButton>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{ display: "flex", justifyContent: "flex-end" }}
                                    >   
                                        <Button sx={{ marginTop: 0.3 , marginRight: 1}} variant="contained"onClick={onClickJoin}>Join</Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                            {commentsVisible && comment === event._id && (
                                <Comments event={event} />
                            )}
                        </CardActionArea>
                    </PostContainer>
                ))}
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                <BasicPagination count={10} />
            </Box>
            <AlertDialog
                open={open}
                setOpen={setOpen}
                deleteId={deleteId}
                snack={snack}
                setSnack={setSnack}
            />
            <ESnackBar
                open={snack.open}
                snack={snack}
                setOpen={setSnack}
                severity={snack.severity}
                message={snack.message}
            />
        </>
    );
};

export default CusViewEvents;

import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box, Button, Divider, TextField } from "@mui/material";
import { PostContainer, StyledLink, WarningButtonOutlined } from "../../styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import { Colors } from "../../../../../core/styles/theme/PrimePsycheTheme";
import BasicPagination from "../components/Pagination";
import AlertDialog from "../DeleteConfirmation/index";
import EventAPI from "../../../../../core/services/EventAPI";
import { Link } from "react-router-dom";
import moment from "moment";
import ESnackBar from "../components/ESnackBar";
import { useSelector } from "react-redux";

const EventHomePage = () => {
    const [open, setOpen] = React.useState(false);
    const { user } = useSelector((state) => state.auth);
    const [eventsList, setEventsList] = React.useState([]);
    const [deleteId, setDeleteId] = React.useState("");
    const [searchTerm, setSearchTerm] = React.useState("");
    const [snack, setSnack] = React.useState({
        open: false,
        severity: "",
        message: "",
    });

    const fetchData = async ()=> {
        const response = await EventAPI.getMyEvents(user._id);
        if (response.status === 200) {
        setEventsList(response.data.data);
        }
    }
    React.useEffect(() => {
        fetchData();
    }, []);

    // React.useEffect(() => {
    //     fetchData();
    // }, [open]);

    const onClickDelete = (id) => {
        setDeleteId(id);
        setOpen(true);
    };
    const filteredEvents = eventsList.filter((eventsList) => {
        return (
            eventsList.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            eventsList.conducted_by.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
    });

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
                    MY EVENTS
                </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
                <TextField
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <StyledLink to="/primepsyche/events/add">
                    <Button>ADD NEW EVENT</Button>
                </StyledLink>
            </Box>
            {filteredEvents &&
                filteredEvents.map((event) => (
                    <PostContainer item xs={12} md={6}>
                        <CardActionArea component="a" href="#">
                            <Card component={Link} to={`/primepsyche/events/view/${event._id}`} sx={{ display: "flex",textDecoration:"none" }}>
                                <CardContent sx={{ flex: 1, p: 2 }}>
                                    <Typography component="h2" variant="h6">
                                        TITLE : <Typography display="inline" >{event.title}</Typography>
                                        </Typography>
                                    <Typography component="h2" variant="h6">
                                        DATE : <Typography display="inline"> {moment(event.date).format("MMM Do YYYY")}  </Typography>
                                    </Typography>
                                    <Typography component="h2" variant="h6">
                                        TIME : <Typography display="inline"> {moment(event.time).format("h:mm a")}  </Typography>
                                    </Typography>
                                    <Typography component="h2" variant="h6">
                                        CONDUCTED BY : <Typography display="inline"> {event.conducted_by}  </Typography>                      
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
                                        {/* <IconButton>
                                            <FavoriteIcon />
                                        </IconButton>
                                        <IconButton>
                                            <CommentIcon />
                                        </IconButton> */}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {user._id === event.userId && (
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{ display: "flex", justifyContent: "flex-end" }}
                                    >
                                        <StyledLink to={`/primepsyche/events/edit/${event._id}`}>
                                            <Button variant="outlined" startIcon={<EditIcon />}>
                                                Edit
                                            </Button>
                                        </StyledLink>
                                        <WarningButtonOutlined
                                            startIcon={<DeleteIcon />}
                                            onClick={() => onClickDelete(event._id)}
                                        >
                                            Delete
                                        </WarningButtonOutlined>
                                    </Stack>
                                    )}
                                </Grid>
                            </Grid>
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

export default EventHomePage;

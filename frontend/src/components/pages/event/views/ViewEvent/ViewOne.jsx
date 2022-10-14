import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {  Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { PostContainer, StyledLink } from "../../styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import Stack from "@mui/material/Stack";
import AlertDialog from "../DeleteConfirmation";
import moment from "moment";
import { red } from "@mui/material/colors";
import EventAPI from "../../../../../core/services/EventAPI";
import { useParams } from "react-router-dom";
import Comments from "./comments/Comments";
import { useSelector } from "react-redux";

function ViewOne() {
    const { user } = useSelector((state) => state.auth);
    const params = useParams();
    const eventId = params.id;
    const [open, setOpen] = React.useState(false);
    const [comment, setComment] = React.useState("");
    const [commentsVisible, setCommentsVisible] = React.useState(false);
    const [event, setEvent] = React.useState({
        title: "",
        conducted_by: "",
        description: "",
        image: "",
    });

    const onClickComment = (id) => {
        setComment(id);
        setCommentsVisible(!commentsVisible);
    };

    // const getDate = (date) => {
    //     return moment(date).format("LL");
    // };
    async function fetchData() {
        const response = await EventAPI.getOne(eventId);
        setEvent(response.data.data);
    }
    React.useEffect(() => {
        fetchData();
    }, []);
    const onClickDelete = (id) => {
        setOpen(true);
    };
    return (
        <>
            <PostContainer
                item
                xs={12}
                md={6}
                key={`eventList${event._id}`}
                sx={{
                    background: (theme) =>
                        theme.palette.prime_psycheColors.prime_psyche_light_green5,
                }}
            >
                <CardActionArea
                    sx={{
                        background: (theme) =>
                            theme.palette.prime_psycheColors.prime_psyche_light_green4,
                    }}
                >
                    <Card
                        sx={{
                            display: "flex",
                            background: (theme) =>
                                theme.palette.prime_psycheColors.prime_psyche_light_green4,
                        }}
                    >
                        <CardContent sx={{ flex: 1, p: 2 }}>
                            <Typography component="h2" variant="h5"> 
                                {event.title}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {event.conducted_by}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {event.description}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {moment(event.date).format("MMM Do YY")}
                                <Typography fontWeight={700}  fontSize="20px" display="inline">{"  "}at{"  "}</Typography>
                                {moment(event.time).format("h:mm a")}
                            </Typography>
                        </CardContent>
                        <CardMedia
                            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
                            alt="image"
                            image={event.image}
                        />
                    </Card>
                </CardActionArea>
                <Divider></Divider>
                <Grid container spacing={3}>
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
                        {user._id === event.userId && (
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                            <StyledLink to={`/primepsyche/events/edit/${event._id}`}>
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                            </StyledLink>
                            <IconButton onClick={() => onClickDelete(event._id)}>
                                <DeleteIcon sx={{ color: red[900] }} />
                            </IconButton>
                        </Stack>
                        )}
                    </Grid>
                </Grid>
                {commentsVisible && comment === event._id && (
                    <Comments event={event} />
                )}
            </PostContainer>
            <AlertDialog open={open} setOpen={setOpen} deleteId={eventId} />
        </>
    );
}

export default ViewOne;

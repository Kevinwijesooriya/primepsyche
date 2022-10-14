import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box, Button, Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { PostContainer, StyledLink, WarningButtonOutlined } from "../../styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import Stack from "@mui/material/Stack";
import { Colors } from "../../../../../core/styles/theme/PrimePsycheTheme";
import AlertDialog from "../DeleteConfirmation";
import BasicPagination from "../components/Pagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";



const CusViewEvents = () => {
    const [open, setOpen] = React.useState(false);

    const onClickDelete = () => {
        setOpen(true);
    };
    const PostList = [
        {
            title: "The light programme - Mental health awareness session",
            date: "08/09/2022",
            time: "08:00 PM",
            conducted: "Dr. Pushpakumara",
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7AfPcJcDM3HsTHJevFnRVDDSMcLPnVbX16A&usqp=CAU",
        },
        {
            title: "The light programme - Mental health awareness session",
            date: "09/10/2022",
            time: "09:00 PM",
            conducted: "Dr. Pushpakumara",
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7AfPcJcDM3HsTHJevFnRVDDSMcLPnVbX16A&usqp=CAU",
        },
        {
            title: "The light programme - Mental health awareness session",
            date: "11/12/2022",
            time: "09:30 PM",
            conducted: "Dr. Pushpakumara",
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7AfPcJcDM3HsTHJevFnRVDDSMcLPnVbX16A&usqp=CAU",
        },
        {
            title: "The light programme - Mental health awareness session",
            date: "12/12/2022",
            time: "08:30 PM",
            conducted: "Dr. Pushpakumara",
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7AfPcJcDM3HsTHJevFnRVDDSMcLPnVbX16A&usqp=CAU",
        },
        {
            title: "The light programme - Mental health awareness session",
            date: "Aug 12, 2022",
            time: "09:00 PM",
            conducted: "Dr. Pushpakumara",
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7AfPcJcDM3HsTHJevFnRVDDSMcLPnVbX16A&usqp=CAU",
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
                    Events
                </Typography>
            </Box>
            
            {PostList &&
                PostList.map((post) => (
                    <PostContainer item xs={12} md={6}>
                        <CardActionArea component="a" href="#">
                            <Card sx={{ display: "flex" }}>
                                <CardContent sx={{ flex: 1, p: 2 }}>
                                    <Typography component="h2" variant="h6">
                                        Title : <Typography display="inline" >{post.title}</Typography>
                                    </Typography>
                                    <Typography component="h2" variant="h6">
                                        Date : <Typography display="inline"> {post.date}  </Typography>
                                    </Typography>
                                    <Typography component="h2" variant="h6">
                                        Time : <Typography display="inline"> {post.time}  </Typography>
                                    </Typography>
                                    <Typography component="h2" variant="h6">
                                        Conducted By : <Typography display="inline"> {post.conducted}  </Typography>
                                    </Typography>
                                </CardContent>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 160, display: { xs: "none", sm: "block" } }}
                                    alt="image"
                                    image={post.image}
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
                                        <Button sx={{ marginTop: 0.3 , marginRight: 1}} variant="contained">Join</Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CardActionArea>
                    </PostContainer>
                ))}
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                <BasicPagination count={10} />
            </Box>
            <AlertDialog open={open} setOpen={setOpen} />
        </>
    );
};

export default CusViewEvents;

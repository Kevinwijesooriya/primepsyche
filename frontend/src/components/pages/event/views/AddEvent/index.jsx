import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import { ImageUploadButton } from "../../styles";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from "moment";
import AddSnackBar from "../components/AddSnackBar";
import EventAPI from "../../../../../core/services/EventAPI";



const AddEvent = () => {
    const [value, setValue] = React.useState(moment('2014-08-18T21:11:54'));
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState({ message: "" });
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [createSuccess, setCreateSuccess] = React.useState(false);
    const [postPayload, setPostPayload] = React.useState({
        title: "",
        date: "",
        time: "",
        conducted_by: "",
        description: "",
        image: "",
    });


    const [files, setFiles] = React.useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFiles(URL.createObjectURL(e.target.files[0]));
    };
    const onClickAdd = async(e) => {
        e.preventDefault();
        {
            isValid() && setOpen(true);
        }
        const response = await EventAPI.create(postPayload);
        console.log("~ onClickAdd ~ response", response);
        if (response.status === 200) {
            setCreateSuccess(true);
        } else {
            setCreateSuccess(false);
        }
    };
    const isValid = () => {
        if (postPayload.description === "") {
            setError({ field: "description", message: "Please fill me" });
            return false;
        }
        if (postPayload.title === "") {
            setError({ field: "title", message: "Please fill me" });
            return false;
        }
        return true;
    };
    const onChangeInput = (e) => {
        setError({ field: "", message: "" });
        setPostPayload({
            ...postPayload,
            [e.target.name]: e.target.value,
        });
        console.log("postPayload",postPayload)
    };
    function handleChange(e) {
        console.log(e.target.files);
        setFiles(URL.createObjectURL(e.target.files[0]));
        setPostPayload({
            ...postPayload,
            image: URL.createObjectURL(e.target.files[0]),
        });
    }


    const handleChangeDate = (newValue) => {
        setPostPayload({
            ...postPayload,
            date: newValue,
        });
    };

    const handleChangeTime = (newValue) => {
        setPostPayload({
            ...postPayload,
            time: newValue,
        });
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
                    <AddSnackBar open={open} setOpen={setOpen} success={createSuccess} />
                    <Typography variant="PageHeader" gutterBottom>
                        Add Event
                    </Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Title</InputLabel>
                        <TextField
                            required
                            id="title"
                            name="title"
                            // label="Title"
                            fullWidth
                            multiline
                            error={error.field === "title"}
                            helperText={!postPayload.title && error.message}
                            onChange={(e) => onChangeInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}></Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Date</InputLabel>
                        <DesktopDatePicker
                            inputFormat="MM/DD/YYYY"
                            value={postPayload.date}
                            onChange={handleChangeDate}
                            renderInput={(params) => <TextField {...params} />}
                        /></Grid>
                    <Grid item xs={12} sm={6}></Grid>            
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Time</InputLabel>
                        <TimePicker
                            value={postPayload.time}
                        onChange={handleChangeTime}
                        renderInput={(params) => <TextField {...params} />}
                    /> </Grid>
                    <Grid item xs={12} sm={6}></Grid> 
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Conducted By</InputLabel>
                        <TextField
                            required
                            id="conducted_by"
                            name="conducted_by"
                            fullWidth
                            multiline
                            error={error.field === "conducted_by"}
                            helperText={!postPayload.conducted_by && error.message}
                            onChange={(e) => onChangeInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}></Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Description</InputLabel>
                        <TextField
                            required
                            id="description"
                            name="description"
                            fullWidth
                            multiline
                            error={error.field === "description"}
                            helperText={!postPayload.description && error.message}
                            onChange={(e) => onChangeInput(e)}
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <InputLabel>Image</InputLabel>
                        <ImageUploadButton component="label">
                            <input type="file" hidden onChange={handleChange} />
                            {files ? (
                                <img
                                    alt="forum_post"
                                    src={files}
                                    style={{ minHeight: 600, minWidth: 600 }}
                                />
                            ) : (
                                <ImageOutlinedIcon sx={{ minHeight: 600, minWidth: 600 }} />
                            )}
                        </ImageUploadButton>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <Button onClick={(e) => onClickAdd(e)}>ADD</Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default AddEvent;

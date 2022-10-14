import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import { ImageUploadButton, WarningButton, StyledLink } from "../../styles";
import { Stack } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import EditSnackBar from "../components/EditSnackBar";
import { useParams } from "react-router-dom";
import EventAPI from "../../../../../core/services/EventAPI";

const EditEvent = () => {
    const [files, setFiles] = React.useState();
    const [open, setOpen] = React.useState(false);
    const params = useParams();
    const eventId = params.id;
    const [error, setError] = React.useState({ message: "" });
    const [updateSuccess, setUpdateSuccess] = React.useState(false);
    const { title, date, time, conducted_by, description, image } = payload;
    const [payload, setPayload] = React.useState({
        title: "",
        date:"",
        time:"",
        conducted_by:"",
        description: "",
        image: "",
    });
    async function fetchData() {
        const response = await EventAPI.getOne(eventId);
        setPayload(response.data.data);
    }
    const onClickSave = async (e) => {
        e.preventDefault();
        {
            isValid() && setOpen(true);
        }
        const response = await EventAPI.update({ eventId, payload });
        console.log("~ onClickAdd ~ response", response);
        if (response.status === 200) {
            setUpdateSuccess(true);
        } else {
            setUpdateSuccess(false);
        }
    };
    React.useEffect(() => {
        fetchData();
    }, []);

    function handleChange(e) {
        console.log(e.target.files);
        console.log("payload", payload);
        setFiles(URL.createObjectURL(e.target.files[0]));
    }
    const onChangeInput = (e) => {
        setError({ field: "", message: "" });
        setPayload({
            ...payload,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeDate = (newValue) => {
        {
            setPayload({
                ...payload,
                date: newValue,
            });
        };
    };

    const handleChangeTime = (newValue) => {
        setPayload({
            ...payload,
            time: newValue,
        });
    };
    // const onChangeInput = (e) => {
    //     if (e.target.name === "description") {
    //         setDescription(e.target.value);
    //     }
    //     if (e.target.name === "title") {
    //         setTitle(e.target.value);
    //     }
    //     setError({ message: "" });
    // };

    const isValid = () => {
        if (description === "") {
            setError({ field: "description", message: "Please fill me" });
            return false;
        }
        if (date === "") {
            setError({ field: "date", message: "Please fill me" });
            return false;
        }
        if (time === "") {
            setError({ field: "time", message: "Please fill me" });
            return false;
        }
        if (conducted_by === "") {
            setError({ field: "conducted_by", message: "Please fill me" });
            return false;
        }
        if (title === "") {
            setError({ field: "title", message: "Please fill me" });
            return false;
        }
        return true;
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
                    <EditSnackBar open={open} setOpen={setOpen} success={updateSuccess} />
                    <Typography variant="PageHeader" gutterBottom>
                        Edit Event
                    </Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Title</InputLabel>
                        <TextField required 
                                   id="title" 
                                   name="title" 
                                   fullWidth 
                                   multiline 
                                   defaultValue={title || ""}
                                   helperText={!payload.title && error.message}
                                   error={error.field === "title"}
                                   onChange={(e) => onChangeInput(e)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Date</InputLabel>
                        <DesktopDatePicker
                            inputFormat="MM/DD/YYYY"
                            value={date}
                            onChange={handleChangeDate}
                            renderInput={(params) => <TextField {...params} />}
                        /></Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Time</InputLabel>
                        <TimePicker
                            value={time}
                            onChange={handleChangeTime}
                            renderInput={(params) => <TextField {...params} />}
                        /> </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Conducted By</InputLabel>
                        <TextField 
                            required
                            id="description"
                            name="description"
                            fullWidth
                            multiline
                            helperText={error.message}
                            onChange={(e) => onChangeInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Description</InputLabel>
                        <TextField
                            defaultValue={"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout..."}
                            required
                            id="description"
                            name="description"
                            fullWidth
                            multiline
                            helperText={error.message}
                            onChange={(e) => onChangeInput(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Image</InputLabel>
                        <ImageUploadButton component="label">
                            <input type="file" hidden onChange={handleChange} />
                            {files && (
                                <img
                                    alt="forum_post"
                                    src={files}
                                    style={{ minHeight: 600, minWidth: 600 }}
                                />
                            )}{" "}
                            {!image && (
                                <ImageOutlinedIcon sx={{ minHeight: 600, minWidth: 600 }} />
                            )}
                            {image && (
                                <img
                                    alt="forum_post"
                                    src={image}
                                    style={{ minHeight: 600, minWidth: 600 }}
                                />
                            )}
                        </ImageUploadButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                            <Button onClick={onClickSave}>save</Button>
                            <StyledLink to={"/primepsyche/event/"}>
                                <WarningButton>Cancel</WarningButton>
                            </StyledLink>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default EditEvent;

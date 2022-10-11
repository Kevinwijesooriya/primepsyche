import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import { ImageUploadButton, WarningButton } from "../../styles";
import { Stack } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from "moment";
import EditSnackBar from "../components/EditSnackBar";

const EditEvent = () => {
    const [value, setValue] = React.useState(moment('2014-08-18T21:11:54'));
    const [files, setFiles] = React.useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7AfPcJcDM3HsTHJevFnRVDDSMcLPnVbX16A&usqp=CAU");
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState({ message: "" });
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    function handleChange(e) {
        console.log(e);
        setFiles(URL.createObjectURL(e.target.files[0]));
    }


    const handleChangeDate = (newValue) => {
        setValue(newValue);
    };

    const handleChangeTime = (newValue) => {
        setValue(newValue);
    };

    const onClickShare = () =>  {
        isValid() && setOpen(true);
    };
    
    const isValid = () => {
        if (description === "") {
            setError({ field: "description", message: "Please fill me" });
            return false;
        }
        if (title === "") {
            setError({ field: "title", message: "Please fill me" });
            return false;
        }
        return true;
    };
    const onChangeInput = (e) => {
        if (e.target.name === "description") {
            setDescription(e.target.value);
        }
        if (e.target.name === "title") {
            setTitle(e.target.value);
        }
        setError({ message: "" });
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
                    <EditSnackBar open={open} setOpen={setOpen} />
                    <Typography variant="PageHeader" gutterBottom>
                        Edit Event
                    </Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Title</InputLabel>
                        <TextField defaultValue={"The length programme - Mental health awareness session "} required id="title" name="title" fullWidth multiline helperText={error.message}
                            onChange={(e) => onChangeInput(e)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Date</InputLabel>
                        <DesktopDatePicker
                            inputFormat="MM/DD/YYYY"
                            value={value}
                            onChange={handleChangeDate}
                            renderInput={(params) => <TextField {...params} />}
                        /></Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Time</InputLabel>
                        <TimePicker
                            value={value}
                            onChange={handleChangeTime}
                            renderInput={(params) => <TextField {...params} />}
                        /> </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Conducted By</InputLabel>
                        <TextField defaultValue={"Dr.Pushpakumara"}
                            required
                            id="description"
                            name="description"
                            fullWidth
                            multiline
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
                            {files ? (
                                <img
                                    alt="forum_post"
                                    src={files}
                                    style={{ height: 600, maxWidth: 600 }}
                                />
                            ) : (
                                <ImageOutlinedIcon sx={{ minHeight: 600, minWidth: 600 }} />
                            )}
                        </ImageUploadButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                            <Button onClick={onClickShare}>save</Button>
                            <WarningButton>Cancel</WarningButton>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default EditEvent;

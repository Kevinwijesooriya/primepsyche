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


const AddEvent = () => {
    const [value, setValue] = React.useState(moment('2014-08-18T21:11:54'));

    const [files, setFiles] = React.useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFiles(URL.createObjectURL(e.target.files[0]));
    }


    const handleChangeDate = (newValue) => {
        setValue(newValue);
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
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}></Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Date</InputLabel>
                        <DesktopDatePicker
                            inputFormat="MM/DD/YYYY"
                            value={value}
                            onChange={handleChangeDate}
                            renderInput={(params) => <TextField {...params} />}
                        /></Grid>
                    <Grid item xs={12} sm={6}></Grid>            
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Time</InputLabel>
                        <TimePicker
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    /> </Grid>
                    <Grid item xs={12} sm={6}></Grid> 
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Conducted By</InputLabel>
                        <TextField
                            required
                            id="description"
                            name="description"
                            fullWidth
                            multiline
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
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <InputLabel>Enhance your post with an image!</InputLabel>
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
                        <Button>ADD</Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default AddEvent;

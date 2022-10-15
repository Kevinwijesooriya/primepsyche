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
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";


const AddEvent = () => {
    const [value, setValue] = React.useState(moment('2014-08-18T21:11:54'));
    const [open, setOpen] = React.useState(false);
    const { user } = useSelector((state) => state.auth);
    const [error, setError] = React.useState({ message: "" });
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [createSuccess, setCreateSuccess] = React.useState(false);
    const [postPayload, setPostPayload] = React.useState({
        userId: "",
        userName: "",
        title: "",
        date: "",
        time: "",
        conducted_by: "",
        description: "",
        image: "",
    });
    console.log(postPayload)

    const [files, setFiles] = React.useState();
    // function handleChange(e) {
    //     console.log(e.target.files);
    //     setFiles(URL.createObjectURL(e.target.files[0]));
    // };
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
            userId: user._id,
            userName: user.userName,
        });
        console.log("postPayload",postPayload)
    };
    // function handleChange(e) {
    //     console.log(e.target.files);
    //     setFiles(URL.createObjectURL(e.target.files[0]));
    //     setPostPayload({
    //         ...postPayload,
    //         image: URL.createObjectURL(e.target.files[0]),
    //     });
    // }


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

    const handleChange = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) return alert("File not exist.");
      if (file.size > 1024 * 1024)
        // 1mb
        return alert("Size too large!");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return alert("File format is incorrect.");
      let formData = new FormData();
      formData.append("file", file);
      
      const res = await axios.post(
        "http://localhost:5000/api/imageUpload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
        setFiles(res.data.url);
        setPostPayload({
             ...postPayload,
            image: res.data.url,
        });
    } catch (err) {
      toast.error(err.response.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import ForumPostAPI from "../../../../core/services/ForumPostAPI";
import ForumPostReportGenerator from "../../forum/reports/forumPost";
import ReadablesReportGenerator from "../../materials/reports/ReadblesReport";

const Reports = () => {
  const [posts, setPostsList] = React.useState([]);
  async function fetchData() {
    const response = await ForumPostAPI.getAll();
    if (response.status === 200) {
      setPostsList(response.data.data);
    }
  }
  const [readable, setReadable] = React.useState([]);
  const getAllReadable = async () => {
    await axios
      .get("http://localhost:5000/api/readableMaterials/getAll")
      .then((res) => {
        console.log(res);
        setReadable(res.data.data);
      })
      .catch((err) => {
        alert(err.massage);
      });
  };
  React.useEffect(() => {
    fetchData();
    getAllReadable();
  }, []);
  return (
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
          Report Generation
        </Typography>
      </Box>
      <Grid container spacing={2} padding="48px">
        <Grid item xs={12} sm={12}>
          <Button onClick={() => ForumPostReportGenerator(posts)}>
            Forum Post Report
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button>Event Report</Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button>Psychiatrist Report</Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button onClick={() => ReadablesReportGenerator(readable)}>
            Materials Report
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reports;

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import ForumPostAPI from "../../../../core/services/ForumPostAPI";
import ForumPostReportGenerator from "../../forum/reports/forumPost";

const Reports = () => {
  const [posts, setPostsList] = React.useState([]);
  async function fetchData() {
    const response = await ForumPostAPI.getAll();
    if (response.status === 200) {
      setPostsList(response.data.data);
    }
  }
  React.useEffect(() => {
    fetchData();
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
          <Button>Materials Report</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reports;

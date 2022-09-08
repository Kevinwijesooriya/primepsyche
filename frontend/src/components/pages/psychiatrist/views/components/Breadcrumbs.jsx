import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import { Outlet, Link } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import { StyledLink } from "../../styles";

export default function PsychaiatristBreadcrumbs() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      <Box
        sx={{
          p: 1,
        }}
      >
        {location.pathname === "/primepsyche/forum/view" && (
          <Breadcrumbs aria-label="breadcrumb">
            <StyledLink to="/primepsyche/forum">
              <Typography>Explore & Share</Typography>
            </StyledLink>
          </Breadcrumbs>
        )}
        {location.pathname === "/primepsyche/forum/add" && (
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: (theme) =>
                  theme.palette.prime_psycheColors.prime_psyche_darker_green2,
              }}
              to="/primepsyche/forum"
            >
              Explore & Share
            </Link>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.primary"
            >
              Add a post
            </Typography>
          </Breadcrumbs>
        )}
        {location.pathname === "/primepsyche/forum/edit" && (
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: (theme) =>
                  theme.palette.prime_psycheColors.prime_psyche_darker_green2,
              }}
              to="/primepsyche/forum"
            >
              Explore & Share
            </Link>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.primary"
            >
              Edit your post
            </Typography>
          </Breadcrumbs>
        )}
      </Box>
      <Grid item lg={9} md={8}>
        <Container variant="outletContainer">
          <Outlet />
        </Container>
      </Grid>
    </>
  );
}

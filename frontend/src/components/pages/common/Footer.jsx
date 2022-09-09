import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import NameLogo from "../../../assets/logos/NameLogo.svg";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © 2022 All rights reserved | "}
      <Link color="inherit" href="#">
        PrimePsyche
      </Link>
    </Typography>
  );
}

export default function Footer() {
  const pages = [
    {
      label: "Home",
      path: "/primepsyche/",
    },
    {
      label: "About",
      path: "#",
    },
    {
      label: "Our Team",
      path: "#",
    },
    {
      label: "Help",
      path: "#",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.prime_psycheColors.prime_psyche_darker_green2,
        }}
      >
        <Container>
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            <img alt="logo" src={NameLogo} />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Link
                style={{ textDecoration: "none" }}
                to={page.path}
                key={`link${page.label}`}
              >
                <Button
                  variant="footer"
                  key={page.label}
                  sx={{ my: 2, display: "block" }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
              pb: 2,
            }}
          >
            <InstagramIcon sx={{ mx: 2 }} />
            <TwitterIcon sx={{ mx: 2 }} />
            <FacebookIcon sx={{ mx: 2 }} />
          </Box>
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Typography variant="body1"></Typography>
            <Copyright />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../pages/common/Footer";
import Header from "../pages/common/Header";

const DefaultLayout = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <Box
        sx={{
          p: 1,
          backgroundColor: (theme) =>
            theme.palette.prime_psycheColors.prime_psyche_darker_green2,
        }}
      >
        <Outlet />
      </Box>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default DefaultLayout;

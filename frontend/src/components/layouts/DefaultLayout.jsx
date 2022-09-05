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
      <Outlet />
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default DefaultLayout;

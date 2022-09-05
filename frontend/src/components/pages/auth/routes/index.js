import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLogin from "../views/AuthLogin";
import AuthRegister from "../views/AuthRegister";

function AuthRoutes() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<AuthLogin />} />
        <Route path="login" element={<AuthLogin />} />
        <Route path="register" element={<AuthRegister />} />
      </Routes>
    </>
  );
}

export { AuthRoutes };

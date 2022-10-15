import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import { PrimePsycheTheme } from "./core/styles/theme/PrimePsycheTheme";
import { AuthProvider } from "./core/context/AuthProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={PrimePsycheTheme}>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <React.StrictMode>
        <AuthProvider>
          <BrowserRouter>
            <Provider store={store}>
              <App />
              <ToastContainer />
            </Provider>
          </BrowserRouter>
        </AuthProvider>
      </React.StrictMode>
    </LocalizationProvider>
  </ThemeProvider>
);

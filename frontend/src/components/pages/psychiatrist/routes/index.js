import React from "react";
import { Navigate } from "react-router-dom";
import HelpHomePage from "../views";
import view from "../views";
import PsychaiatristBreadcrumbs from "../views/components/Breadcrumbs";

const PsychiatristRoutes = [
  {
    path: "help",
    // element: <HelpHomePage />,
    element: <PsychaiatristBreadcrumbs />,

    children: [
      { path: "", element: <Navigate to="view" /> },
      { path: "view", element: <HelpHomePage /> },
      // { path: "view", element: <ViewComponent /> },
      // { path: "add", element: <AddComponent /> },
    ],
  },
];

export default PsychiatristRoutes;

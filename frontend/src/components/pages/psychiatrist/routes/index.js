import React from "react";
import { Navigate } from "react-router-dom";
import HelpHomePage from "../views";
import AddPost from "../views/AddPost";
import view from "../views";
import PsychaiatristBreadcrumbs from "../views/components/Breadcrumbs";
import EditPost from "../views/EditPost";
import ViewOne from "../views/ViewPost/viewOne";

const PsychiatristRoutes = [
  {
    path: "help",
    // element: <HelpHomePage />,
    element: <PsychaiatristBreadcrumbs />,

    children: [
      { path: "", element: <Navigate to="view" /> },
      { path: "view", element: <HelpHomePage /> },
      { path: "add", element: <AddPost /> },
      { path: "edit/:id", element: <EditPost /> },
      { path: "view/:id", element: <ViewOne /> },
    ],
  },
];

export default PsychiatristRoutes;

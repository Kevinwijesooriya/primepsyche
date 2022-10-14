import React from "react";
import { Navigate } from "react-router-dom";
import AddMusic from "../views/AddMusic";
import AddReadable from "../views/AddReadable";
import MaterialsBreadcrumbs from "../views/components/Breadcrumbs";
import EditMusic from "../views/EditMusic";
import EditReadable from "../views/EditReadable";
import MaterialHomePage from "../views";
import ViewMusic from "../views/ViewMusic";
import ViewReadable from "../views/ViewReadable";


const MaterialRoutes = [
  {
    path: "materials",
    element: <MaterialsBreadcrumbs />,

    children: [
      { path: "", element: <Navigate to="viewMusic" /> },
      { path: "viewMusic", element: <ViewMusic /> },
      { path: "viewReadable", element: <ViewReadable /> },
      { path: "addMusic", element: <AddMusic /> },
      { path: "addReadable", element: <AddReadable /> },
      { path: "editMusic/:id", element: <EditMusic /> },
      { path: "editReadable/:id", element: <EditReadable /> },
    ],
  },
];

export default MaterialRoutes;

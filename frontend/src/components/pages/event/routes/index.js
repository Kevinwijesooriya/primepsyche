import React from "react";
import { Navigate } from "react-router-dom";
import ViewComponent from "../views";
// import AddComponent from "../views"
import EditEvent from "../views/EditEvent";
import AddEvent from "../views/AddEvent";
import EventBreadcrumbs from "../views/components/Breadcrumbs";
import CusViewEvents from "../views/CusViewEvent";

const EventRoutes = [
  {
    path: "events",
    element: <EventBreadcrumbs />,
    children: [
      { path: "", element: <Navigate to="view" /> },
      { path: "view", element: <ViewComponent /> },
      { path: "add", element: <AddEvent /> },
      { path: "edit", element: <EditEvent /> },
      { path: "CusView", element: <CusViewEvents /> },
    ],
  },
];

export default EventRoutes;

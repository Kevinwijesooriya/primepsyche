import React from "react";
import { Navigate } from "react-router-dom";
import ViewComponent from "../views";
// import AddComponent from "../views"
import EditEvent from "../views/EditEvent";
import AddEvent from "../views/AddEvent";
import EventBreadcrumbs from "../views/components/Breadcrumbs";
import CusViewEvents from "../views/CusViewEvent";
import ViewOne from "../views/ViewEvent/ViewOne";


const EventRoutes =(role)=> [
  {
    path: "events",
    element: <EventBreadcrumbs />,
    children: [
      { path: "", element: <Navigate to="view" /> },
      { path: "view", element: (role === "user" ?< CusViewEvents /> :<ViewComponent />) },
      { path: "add", element: <AddEvent /> },
      { path: "edit/:id", element: <EditEvent /> },
      { path: "CusView", element: <CusViewEvents /> },
      { path: "view/:id", element: <ViewOne /> },
    ],
  },
];

export default EventRoutes;

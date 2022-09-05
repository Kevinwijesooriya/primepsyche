import React from "react";
import EventHomePage from "../views";

const EventRoutes = [
  {
    path: "events",
    element: <EventHomePage />,
    //HINT
    // children: [
    //   { path: "", element: <Navigate to="view" /> },
    //   { path: "view", element: <ViewComponent /> },
    //   { path: "add", element: <AddComponent /> },
    // ],
  },
];

export default EventRoutes;

import React from "react";
import HelpHomePage from "../views";

const PsychiatristRoutes = [
  {
    path: "help",
    element: <HelpHomePage />,
    //HINT
    // children: [
    //   { path: "", element: <Navigate to="view" /> },
    //   { path: "view", element: <ViewComponent /> },
    //   { path: "add", element: <AddComponent /> },
    // ],
  },
];

export default PsychiatristRoutes;

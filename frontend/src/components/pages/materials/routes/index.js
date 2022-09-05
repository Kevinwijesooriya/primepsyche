import React from "react";
import MaterialsHomePage from "../views";

const MaterialRoutes = [
  {
    path: "materials",
    element: <MaterialsHomePage />,
    //HINT
    // children: [
    //   { path: "", element: <Navigate to="view" /> },
    //   { path: "view", element: <ViewComponent /> },
    //   { path: "add", element: <AddComponent /> },
    // ],
  },
];

export default MaterialRoutes;

import React from "react";
import ForumHomePage from "../views";

const ForumRoutes = [
  {
    path: "forum",
    element: <ForumHomePage />,
    //HINT
    // children: [
    //   { path: "", element: <Navigate to="view" /> },
    //   { path: "view", element: <ViewComponent /> },
    //   { path: "add", element: <AddComponent /> },
    // ],
  },
];

export default ForumRoutes;

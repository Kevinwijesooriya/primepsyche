import React from "react";
import { Navigate } from "react-router-dom";
import ForumHomePage from "../views";
import AddPost from "../views/AddPost";
import IconBreadcrumbs from "../views/components/BreadCrums";
import EditPost from "../views/EditPost";

const ForumRoutes = [
  {
    path: "forum",
    element: <IconBreadcrumbs />,
    children: [
      { path: "", element: <Navigate to="view" /> },
      { path: "view", element: <ForumHomePage /> },
      { path: "add", element: <AddPost /> },
      { path: "edit", element: <EditPost /> },
    ],
  },
  // { path: "forum", element: <ForumHomePage /> },
  // { path: "forum/add", element: <AddPost /> },
];

export default ForumRoutes;

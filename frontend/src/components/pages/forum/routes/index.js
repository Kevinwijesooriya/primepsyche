import React from "react";
import { Navigate } from "react-router-dom";
import ForumHomePage from "../views";
import AddPost from "../views/AddPost";
import ForumBreadcrumbs from "../views/components/Breadcrumbs";
import EditPost from "../views/EditPost";
import ViewOne from "../views/ViewPosts/ViewOne";

const ForumRoutes = [
  {
    path: "forum",
    element: <ForumBreadcrumbs />,
    children: [
      { path: "", element: <Navigate to="view" /> },
      { path: "view", element: <ForumHomePage /> },
      { path: "add", element: <AddPost /> },
      { path: "edit/:id", element: <EditPost /> },
      { path: "view/:id", element: <ViewOne /> },
    ],
  },
  // { path: "forum", element: <ForumHomePage /> },
  // { path: "forum/add", element: <AddPost /> },
];

export default ForumRoutes;

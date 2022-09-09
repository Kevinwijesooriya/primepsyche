/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { AuthRoutes } from "../../components/pages/auth/routes/index";
import Logout from "../../components/pages/auth/views/Logout";
import EventRoutes from "../../components/pages/event/routes";
import ForumRoutes from "../../components/pages/forum/routes";
import MaterialRoutes from "../../components/pages/materials/routes";
import PsychiatristRoutes from "../../components/pages/psychiatrist/routes";

function AppRoutes() {
  //TODO implement authentication validation
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // React.useEffect(() => {
  //   setIsLoggedIn(true);
  // }, []);

  return (
    <>
      {isLoggedIn ? (
        <PrivateRoutes />
      ) : (
        <AuthRoutes setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

/**
 * manage private routes
 * @returns Router
 */
const PrivateRoutes = () => {
  const routes = [
    {
      path: "/logout",
      element: <Logout />,
      exact: true,
    },
    { path: "", element: <Navigate to="primepsyche/forum" /> },
    {
      path: "/primepsyche",
      element: <DefaultLayout />,
      children: [
        ...EventRoutes,
        ...ForumRoutes,
        ...MaterialRoutes,
        ...PsychiatristRoutes,
      ],
    },
  ];
  let element = useRoutes(routes);

  return element;
};

export { AppRoutes };

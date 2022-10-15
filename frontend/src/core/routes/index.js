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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReportRoutes } from "../../components/pages/Reports/routes";

function AppRoutes() {
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  React.useEffect(() => {
    if (user !== null) {
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setIsLoggedIn(false);
    }
  }, [user, isLoading, isError, isSuccess, message]);

  return (
    <>
      {isLoggedIn ? (
        <PrivateRoutes user={user}/>
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
const PrivateRoutes = (props) => {
  const { user } = props;
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
        ...EventRoutes(user && user.role),
        ...ForumRoutes,
        ...MaterialRoutes,
        ...PsychiatristRoutes,
        ...ReportRoutes,
      ],
    },
  ];
  let element = useRoutes(routes);

  return element;
};

export { AppRoutes };

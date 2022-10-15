import React from "react";
import EventBreadcrumbs from "../../event/views/components/Breadcrumbs";
import Reports from "../views/Reports";

const ReportRoutes = [
  {
    path: "reports",
    element: <EventBreadcrumbs />,
    children: [{ path: "", element: <Reports /> }],
  },
];

export { ReportRoutes };

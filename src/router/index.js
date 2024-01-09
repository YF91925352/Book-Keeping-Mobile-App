import Layout from "@/pages/layout";
import Month from "@/pages/month";
import New from "@/pages/new";
import Year from "@/pages/year";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "month", element: <Month /> },
      { path: "year", element: <Year /> },
    ],
  },
  { path: "/new", element: <New /> },
]);
export default router;

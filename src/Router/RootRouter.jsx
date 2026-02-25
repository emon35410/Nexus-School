import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/AuthPage/Login";
import Register from "../Pages/AuthPage/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardLayout from "../Layouts/DashboardLayout";
import Notice from "../Pages/Notice/Notice";
import Profile from "../Pages/Profile/Profile";
import NotFound from "../components/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index:true,
        Component: Dashboard
      },
      {
        path:"/dashboard/notices",
        Component: Notice
      },
      {
        path:"/dashboard/profile",
        Component: Profile
      }
    ]
  },
]);

export default router;

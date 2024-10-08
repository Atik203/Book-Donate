import { createBrowserRouter } from "react-router-dom";
import AboutUs from "../Pages/AboutUs/AboutUs";
import BookDetails from "../Pages/BookDetails/BookDetails";
import Books from "../Pages/Books/Books";
import ConfirmEmail from "../Pages/ConfirmEmail/ConfirmEmail";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import FailedConfirmEmail from "../Pages/FailedConfirmEmail/FailedConfirmEmail";
import Gifts from "../Pages/Gifts/Gifts";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Root from "../Root/Root";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.routes";
import PrivateRouteProvider from "./PrivateRouteProvider";
import { userPaths } from "./user.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: `/book-details/:id`,
        element: (
          <PrivateRouteProvider requiredRoles={["Admin", "User"]}>
            <BookDetails />
          </PrivateRouteProvider>
        ),
      },
      {
        path: "/gifts",
        element: <Gifts />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateRouteProvider requiredRoles={["Admin"]}>
        <Dashboard />
      </PrivateRouteProvider>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <PrivateRouteProvider requiredRoles={["User"]}>
        <Dashboard />
      </PrivateRouteProvider>
    ),
    children: routeGenerator(userPaths),
  },
  {
    path: "verification-success",
    element: <ConfirmEmail />,
  },
  {
    path: "verification-failed",
    element: <FailedConfirmEmail />,
  },
]);

export default router;

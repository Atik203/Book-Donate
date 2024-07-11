import { createBrowserRouter } from "react-router-dom";
import AboutUs from "../Pages/AboutUs/AboutUs";
import BookDetails from "../Pages/BookDetails/BookDetails";
import Books from "../Pages/Books/Books";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
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
        path: `/book-details`,
        element: (
          <PrivateRouteProvider>
            <BookDetails />
          </PrivateRouteProvider>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <Dashboard />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: <Dashboard />,
    children: routeGenerator(userPaths),
  },
]);

export default router;

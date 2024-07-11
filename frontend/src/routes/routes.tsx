import { createBrowserRouter } from "react-router-dom";
import AboutUs from "../Pages/AboutUs/AboutUs";
import BookDetails from "../Pages/BookDetails/BookDetails";
import Books from "../Pages/Books/Books";
import ContactUs from "../Pages/ContactUs/ContactUs";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Root from "../Root/Root";
import PrivateRouteProvider from "./PrivateRouteProvider";
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
            {" "}
            <BookDetails />{" "}
          </PrivateRouteProvider>
        ),
      },
    ],
  },
]);

export default router;

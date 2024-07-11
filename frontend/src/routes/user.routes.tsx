import ContactUs from "../Pages/ContactUs/ContactUs";
import UserDashboard from "../Pages/UserDashboard/UserDashboard";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "Profile",
    path: "profile",
    element: <div>Profile</div>,
    children: [
      {
        name: "My Donated Books",
        path: "donated-books",
        element: <ContactUs />,
      },
    ],
  },
];

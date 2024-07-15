import MyClaimedBook from "../Pages/MyClaimedBook/MyClaimedBook";
import MyDonatedBook from "../Pages/MyDonatedBook/MyDonatedBook";
import UserDashboard from "../Pages/UserDashboard/UserDashboard";

export const userPaths = [
  {
    name: "Profile",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "Book Management",
    children: [
      {
        name: "My Donated Books",
        path: "my-donated-book",
        element: <MyDonatedBook />,
      },
      {
        name: "My Claimed Books",
        path: "my-claimed-book",
        element: <MyClaimedBook />,
      },
    ],
  },
];

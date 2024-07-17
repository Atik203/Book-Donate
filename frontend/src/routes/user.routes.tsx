import AddBook from "../Pages/AddBook/AddBook";
import AddGenre from "../Pages/AddGenre/AddGenre";
import MyClaimedBook from "../Pages/MyClaimedBook/MyClaimedBook";
import MyDonatedBook from "../Pages/MyDonatedBook/MyDonatedBook";
import UpdateBook from "../Pages/UpdateBook/UpdateBook";
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
      {
        name: "Donate Book",
        path: "donate-book",
        element: <AddBook />,
      },
      {
        name: "Add Genre",
        path: "add-genre",
        element: <AddGenre />,
      },
    ],
  },
  {
    name: "",
    path: "update-book",
    element: <UpdateBook />,
  },
];

import AddBook from "../Pages/AddBook/AddBook";
import AddGenre from "../Pages/AddGenre/AddGenre";
import AddGift from "../Pages/AddGift/AddGift";
import AllUser from "../Pages/AllUser/AllUser";
import BookListTable from "../Pages/BookListTable/BookListTable";
import MyClaimedBook from "../Pages/MyClaimedBook/MyClaimedBook";
import MyDonatedBook from "../Pages/MyDonatedBook/MyDonatedBook";
import UpdateBook from "../Pages/UpdateBook/UpdateBook";
import UserDashboard from "../Pages/UserDashboard/UserDashboard";

export const adminPaths = [
  {
    name: "Dashboard",
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
        name: "Book List",
        path: "book-list",
        element: <BookListTable />,
      },
      {
        name: "Add Book",
        path: "add-book",
        element: <AddBook />,
      },
      {
        name: "Edit Book",
        path: "edit-book",
        element: <UpdateBook />,
      },
      {
        name: "Add Genre",
        path: "add-genre",
        element: <AddGenre />,
      },
      {
        name: "Add Gift",
        path: "add-gift",
        element: <AddGift />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "User List",
        path: "user-list",
        element: <AllUser />,
      },
    ],
  },
];

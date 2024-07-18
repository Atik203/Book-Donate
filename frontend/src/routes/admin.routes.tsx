import AddBook from "../Pages/AddBook/AddBook";
import AddGenre from "../Pages/AddGenre/AddGenre";
import AddGift from "../Pages/AddGift/AddGift";
import AllUser from "../Pages/AllUser/AllUser";
import AllUserGiftList from "../Pages/AllUserGiftList/AllUserGiftList";
import BookListTable from "../Pages/BookListTable/BookListTable";
import GiftList from "../Pages/GiftList/GiftList";
import PendingBook from "../Pages/PendingBook/PendingBook";
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
        name: "All Books",
        path: "book-list",
        element: <BookListTable />,
      },
      {
        name: "Add Book",
        path: "add-book",
        element: <AddBook />,
      },
      {
        name: "Add Genre",
        path: "add-genre",
        element: <AddGenre />,
      },
      {
        name: "Pending Books",
        path: "pending-book",
        element: <PendingBook />,
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
  {
    name: "Gift Management",
    children: [
      {
        name: "Gift List",
        path: "gift-list",
        element: <GiftList />,
      },
      {
        name: "Add Gift",
        path: "add-gift",
        element: <AddGift />,
      },
      {
        name: "Purchase History",
        path: "purchase-history",
        element: <AllUserGiftList />,
      },
    ],
  },
  {
    name: "",
    path: "update-book",
    element: <UpdateBook />,
  },
];

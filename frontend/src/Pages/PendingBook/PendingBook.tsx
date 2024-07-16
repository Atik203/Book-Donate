import { Avatar } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useGetPendingBookQuery } from "../../redux/features/book/bookApi";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { TBook } from "../../types";

const PendingBook = () => {
  const currentUser = useAppSelector((state: RootState) => state.user.user);

  const { data, isError, isFetching, isLoading } =
    useGetPendingBookQuery(undefined);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (isFetching) return <div>Fetching...</div>;

  const pendingBooks = data?.results ?? [];

  return (
    <div className="overflow-x-auto">
      <table className="table text-black">
        <thead className="text-lg font-semibold text-black">
          <tr>
            <th>Title and Author</th>
            <th>Publisher</th>
            <th>Condition</th>
            <th>Status</th>
            <th>Donated By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingBooks.map((book: TBook) => (
            <tr key={book.id} className="text-black">
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="secondary"
                      size="md"
                      src={book.image as string}
                    />
                  </div>
                  <div>
                    <div className="font-bold">{book.title}</div>
                    <div className="text-sm opacity-70">{book.author}</div>
                  </div>
                </div>
              </td>
              <td className="text-medium">
                {book.publisher}
                <br />
                <span className="text-sm opacity-79">
                  {book.publication_date}
                </span>
              </td>
              <td
                className={
                  "text-medium" +
                  (book.condition === "New" ? "text-green-500" : "text-red-500")
                }
              >
                {book.condition}
              </td>
              <td
                className={`text-medium ${
                  book.approve === "Pending" ? "text-red-500" : "text-green-500"
                }`}
              >
                {book.approve}
              </td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="secondary"
                      size="md"
                      src={book?.donated_by?.image as string}
                    />
                  </div>
                  <div>
                    <div className="font-bold">
                      {book.donated_by?.user.username}
                    </div>
                  </div>
                </div>
              </td>
              <td className="flex items-center justify-center gap-1">
                <button
                  title="Approved"
                  className="hover:text-navPrimary btn bg-green-500 btn-sm text-white"
                >
                  Approved
                </button>
                <Link to={`/update-book/?id=${book.id}`}>
                  <button
                    title="Approved"
                    className="hover:text-navPrimary btn bg-yellow-500 btn-sm text-white"
                  >
                    Edit
                  </button>
                </Link>
                <button
                  title="Details"
                  className="hover:text-navPrimary btn bg-red-500 btn-sm text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {!pendingBooks.length && (
            <tr>
              <td colSpan={10} className="text-center text-xl font-bold">
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PendingBook;

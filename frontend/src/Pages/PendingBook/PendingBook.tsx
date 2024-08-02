import { Avatar } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  useApproveBookMutation,
  useDeleteBookMutation,
  useGetPendingBookQuery,
} from "../../redux/features/book/bookApi";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { TBook } from "../../types";

const PendingBook = () => {
  const currentUser = useAppSelector((state: RootState) => state.user.user);
  const [ApproveBook] = useApproveBookMutation();
  const [DeleteBook] = useDeleteBookMutation();

  const { data, isError, isFetching, isLoading, refetch } =
    useGetPendingBookQuery(undefined);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (isFetching) return <div>Fetching...</div>;

  const pendingBooks = data?.results ?? [];

  const handleApproved = async (id: number) => {
    const toastId = toast.loading("Approving Book...");

    try {
      const result = await ApproveBook({ id }).unwrap();

      if (result.success) {
        toast.success("Book Approved Successfully", { id: toastId });
        refetch();
      } else {
        toast.error("Book Approved Failed", { id: toastId });
      }
    } catch (error) {
      toast.error("Book Approved Failed", { id: toastId });
    }
  };

  const handleDelete = async (id: number) => {
    const toastId = toast.loading("Deleting Book...");

    try {
      const result = await DeleteBook({ id }).unwrap();

      if (result.success) {
        toast.success("Book Deleted Successfully", { id: toastId });
        refetch();
      } else {
        toast.error("Book Deleted Failed", { id: toastId });
      }
    } catch (error) {
      toast.error("Book Deleted Failed", { id: toastId });
    }
  };

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
                    <Link to={`/book-details/${book.id}`}>
                      <div className="font-bold  hover:underline hover:text-red-500">
                        {book.title}
                      </div>
                    </Link>
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
                      {book.donated_by?.user?.username}
                    </div>
                  </div>
                </div>
              </td>
              <td className="flex items-center justify-center gap-1">
                <button
                  onClick={() => handleApproved(book.id)}
                  title="Approved"
                  className="hover:text-navPrimary btn bg-green-500 btn-sm text-white"
                >
                  Approved
                </button>
                <Link to={`/${currentUser?.role}/update-book/?id=${book.id}`}>
                  <button
                    title="Approved"
                    className="hover:text-navPrimary btn bg-yellow-500 btn-sm text-white"
                  >
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(book.id)}
                  title="Delete"
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

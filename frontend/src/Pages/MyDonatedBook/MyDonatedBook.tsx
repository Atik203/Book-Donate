import { Avatar } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useDeleteBookMutation } from "../../redux/features/book/bookApi";
import { useGetDonatedBooksQuery } from "../../redux/features/user/userApi";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { TBook } from "../../types";

const MyDonatedBook = () => {
  const currentUser = useAppSelector((state: RootState) => state.user.user);
  const [DeleteBook] = useDeleteBookMutation();
  const { data, isError, isFetching, isLoading, refetch } =
    useGetDonatedBooksQuery(currentUser?.id as number);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (isFetching) return <div>Fetching...</div>;

  const userDonatedBooks = data?.results ?? [];

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
            <th>Pages</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userDonatedBooks.map((book: TBook) => (
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
                      <div className="font-bold hover:text-red-500">
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
                  "text-medium " +
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
              <td className="text-medium">{book.pages}</td>
              <td className="text-center">
                {book.approve === "Pending" ? (
                  <div className="mx-auto flex items-center justify-center gap-2">
                    <Link
                      to={`/${currentUser?.role}/update-book/?id=${book.id}`}
                    >
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
                  </div>
                ) : (
                  <Link to={`/book-details/${book.id}`}>
                    <button
                      title="Details"
                      className="hover:text-navPrimary  btn bg-green-500 btn-sm text-white"
                    >
                      Details
                    </button>
                  </Link>
                )}
              </td>
            </tr>
          ))}

          {!userDonatedBooks.length && (
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

export default MyDonatedBook;

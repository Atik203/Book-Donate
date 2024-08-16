import { Avatar } from "@nextui-org/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "../../redux/features/book/bookApi";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { TBook } from "../../types";

const BookListTable = () => {
  const currentUser = useAppSelector((state: RootState) => state.user.user);

  const [DeleteBook] = useDeleteBookMutation();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isError, isFetching, isLoading, refetch } = useGetAllBooksQuery(
    {
      page: currentPage,
      page_size: 5,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (isFetching) return <div>Fetching...</div>;

  const books = data?.results ?? [];
  const totalCount = data?.count ?? 0;
  const totalPages = Math.ceil(totalCount / 3);

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
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="overflow-x-auto">
      <div>
        <h1 className="text-2xl font-bold mb-5 text-center">
          Total Books: {data?.count}
        </h1>
      </div>
      <table className="table text-black">
        <thead className="text-lg font-semibold text-black">
          <tr>
            <th>Title and Author</th>
            <th>Publisher</th>
            <th>Condition</th>
            <th>Claimed By</th>
            <th>Donated By</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book: TBook) => (
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
              <td>
                {book?.claimed_by !== null ? (
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        color="secondary"
                        size="md"
                        src={book?.claimed_by?.image as string}
                      />
                    </div>
                    <div>
                      <div className="font-bold">
                        {book.claimed_by?.user?.username}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="font-bold">Not Claimed</div>
                )}
              </td>
              <td>
                {book?.donated_by !== null ? (
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
                ) : (
                  <div className="font-bold">Not Donated</div>
                )}
              </td>
              <td className="flex items-center justify-center gap-1">
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

          {!books.length && (
            <tr>
              <td colSpan={10} className="text-center text-xl font-bold">
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="join space-x-2 font-bold mx-auto my-8 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => {
          const isActive = currentPage === index + 1;
          return (
            <button
              key={index + 1}
              className="btn btn-circle"
              aria-label={`${index + 1}`}
              onClick={() => handlePageChange(index + 1)}
              style={{
                cursor: "pointer",
                backgroundColor: isActive ? "#FF8C00" : "#4B5563",
                color: "white",
              }}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BookListTable;

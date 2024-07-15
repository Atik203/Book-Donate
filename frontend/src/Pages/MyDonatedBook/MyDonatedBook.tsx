import { Avatar } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { EyeIcon } from "../../components/ui/EyeIcon";
import { useGetDonatedBooksQuery } from "../../redux/features/user/userApi";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { TBook } from "../../types";

const MyDonatedBook = () => {
  const currentUser = useAppSelector((state: RootState) => state.user.user);

  const { data, isError, isFetching, isLoading } = useGetDonatedBooksQuery(
    currentUser?.id as number
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (isFetching) return <div>Fetching...</div>;

  const userDonatedBooks = data?.results ?? [];

  return (
    <div className="overflow-x-auto">
      <table className="table text-black">
        <thead className="text-lg font-semibold text-black">
          <tr>
            <th>Title and Author</th>
            <th>Publisher</th>
            <th>Condition</th>
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
                  "text-medium " +
                  (book.condition === "New" ? "text-green-500" : "text-red-500")
                }
              >
                {book.condition}
              </td>
              <td className="text-medium">{book.pages}</td>
              <td>
                <Link to={`/book-details/?id=${book.id}`}>
                  <button
                    title="Details"
                    className="hover:text-navPrimary font-bold"
                  >
                    <EyeIcon />
                  </button>
                </Link>
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

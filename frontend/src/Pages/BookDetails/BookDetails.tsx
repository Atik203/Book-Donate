import { useLocation } from "react-router-dom";
import { useGetSingleBookQuery } from "../../redux/features/book/bookApi";
import { TBook } from "../../types/book.types";

const BookDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookId = queryParams.get("id");

  const { data, isFetching, isError, isLoading } =
    useGetSingleBookQuery(bookId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (isFetching) return <div>Fetching...</div>;

  const book = data?.results[0];

  console.log(book);

  const {
    title,
    author,
    description,
    image,
    genre,
    condition,
    reward_point,
    pages,
    publication_date,
    publisher,
    status,
    stock,
    date_added,
    isbn,
    donated_by,
  } = book as TBook;

  return (
    <div>
      <h1>This is BookDetails component</h1>
      <p>Book ID: {bookId}</p>
    </div>
  );
};

export default BookDetails;

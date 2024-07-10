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

  const book = data?.results[0] as TBook;

  const {
    title,
    author,
    description,
    image,
    genre,
    condition,
    publication_date,
    publisher,
    status,
    stock,
    date_added,
    isbn,
    donated_by,
  } = book;

  const isButtonDisabled = status !== "Available" || stock <= 0;

  return (
    <div className="flex gap-8 justify-center mx-auto my-20">
      <div className="">
        <img src={image} alt={title} className="min-w-96" />
      </div>
      <div className="">
        <h1>{title}</h1>
        <p>
          <strong>Author:</strong> {author}
        </p>
        <p className="text-justify">
          <strong>Description:</strong> {description}
        </p>
        <p>
          <strong>Condition:</strong> {condition}
        </p>
        <p>
          <strong>Publication Date:</strong> {publication_date}
        </p>
        <p>
          <strong>Publisher:</strong> {publisher}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Stock:</strong> {stock}
        </p>
        <p>
          <strong>Date Added:</strong> {date_added}
        </p>
        <p>
          <strong>ISBN:</strong> {isbn}
        </p>
        <p className="">
          <strong>Donated By:</strong> {donated_by}
        </p>
        <p>
          <strong>Genre: </strong>
          {genre.map((genre, index) => (
            <p
              key={index}
              className="inline-block mr-2 font-semibold cursor-pointer hover:underline hover:text-blue-500 "
            >
              #{genre.name}
            </p>
          ))}
        </p>
        <button
          className="btn mt-2 bg-navPrimary text-white rounded-md text-lg px-5 hover:bg-gray-400
                hover:text-black"
          disabled={isButtonDisabled}
        >
          {isButtonDisabled ? "Not Available" : "Claim this Book"}
        </button>
      </div>
    </div>
  );
};

export default BookDetails;

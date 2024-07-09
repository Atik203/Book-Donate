import { Helmet } from "react-helmet-async";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import ErrorComponent from "../../components/ErrorComponent/ErrorComonent";
import PopularBookCard from "../../components/PopularBookCard/PopularBookCard";
import TitleDescriptionBlock from "../../components/TitleDescriptionBlock/TitleDescriptionBlock";
import useDeviceDetect from "../../Hooks/useDeviceDetect";
import { useGetAllBooksQuery } from "../../redux/features/book/bookApi";
import { TBook } from "../../types/book.types";

const Books = () => {
  const { isDesktop, isTablet } = useDeviceDetect();
  const cardsPerView = isDesktop ? 6 : isTablet ? 4 : 2;

  const { data, isFetching, isLoading, error } = useGetAllBooksQuery(undefined);

  const books = data?.results;

  if (error instanceof Error) {
    return <ErrorComponent message={error.message} />;
  }

  return (
    <div className="mx-auto my-10 md:my-16">
      <Helmet>
        <title>Service</title>
      </Helmet>
      <TitleDescriptionBlock
        title="All Books"
        description="Explore our extensive collection of books across various genres. Find your next great read below."
      />

      {isFetching || isLoading ? (
        <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-6">
          {Array.from({ length: cardsPerView }).map((_, index) => (
            <CardSkeleton key={index}></CardSkeleton>
          ))}
        </div>
      ) : (
        <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-6">
          {Array.isArray(books) &&
            books.map((book: TBook) => (
              <PopularBookCard key={book.id} data={book} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Books;

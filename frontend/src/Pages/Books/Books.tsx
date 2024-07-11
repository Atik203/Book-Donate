import { useState } from "react";
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

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching, isLoading, error } = useGetAllBooksQuery({
    page: currentPage,
    page_size: 3,
  });

  const books = data?.results;
  const totalCount = data?.count ?? 0;
  const totalPages = Math.ceil(totalCount / 3);

  if (error instanceof Error) {
    return <ErrorComponent message={error.message} />;
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        <div>
          <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-6">
            {Array.isArray(books) &&
              books.map((book: TBook) => (
                <PopularBookCard key={book.id} data={book} />
              ))}
          </div>
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
      )}
    </div>
  );
};

export default Books;

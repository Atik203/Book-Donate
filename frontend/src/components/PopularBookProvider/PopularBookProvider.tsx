import Slider from "react-slick";
import { useGetPopularBooksQuery } from "../../redux/features/book/bookApi";
import { TBook } from "../../types/book.types";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import ErrorComponent from "../ErrorComponent/ErrorComonent";
import PopularBookCard from "../PopularBookCard/PopularBookCard";
import TitleDescriptionBlock from "../TitleDescriptionBlock/TitleDescriptionBlock";
import LeftArrow from "../ui/LeftArrow";
import RightArrow from "../ui/RightArrow";

const PopularBookProvider = () => {
  const { data, isFetching, isLoading, error } =
    useGetPopularBooksQuery(undefined);

  const slides = data?.results;

  if (error instanceof Error) return <ErrorComponent message={error.message} />;

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 3,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <RightArrow onClick={onclick} />,
    prevArrow: <LeftArrow onClick={onclick} />,
  };

  return (
    <div className="mx-auto my-20">
      <TitleDescriptionBlock
        title="Our Popular Books"
        description="At Smart Care, we are committed to providing a wide range of services designed to ensure your well-being and comfort."
      />
      {isLoading || isFetching ? (
        <div>
          <CardSkeleton />
        </div>
      ) : (
        <div className="slider-container px-5">
          <Slider {...settings}>
            {slides?.map((book: TBook) => (
              <PopularBookCard key={book.id} data={book} />
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default PopularBookProvider;

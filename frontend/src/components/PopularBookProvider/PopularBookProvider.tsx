import { Link } from "react-router-dom";
import Slider from "react-slick";
import useDeviceDetect from "../../Hooks/useDeviceDetect";
import { useGetPopularBooksQuery } from "../../redux/features/book/bookApi";
import { TBook } from "../../types/book.types";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import ErrorComponent from "../ErrorComponent/ErrorComonent";
import PopularBookCard from "../PopularBookCard/PopularBookCard";
import TitleDescriptionBlock from "../TitleDescriptionBlock/TitleDescriptionBlock";
import LeftArrow from "../ui/LeftArrow";
import RightArrow from "../ui/RightArrow";

const PopularBookProvider = () => {
  const { isDesktop, isTablet } = useDeviceDetect();
  const { data, isFetching, isLoading, error } =
    useGetPopularBooksQuery(undefined);
  const cardsPerView = isDesktop ? 4 : isTablet ? 2 : 1;

  const slides = data?.results;

  if (error instanceof Error) return <ErrorComponent message={error.message} />;

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 4,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
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
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-6">
          {Array.from({ length: cardsPerView }).map((_, index) => (
            <CardSkeleton key={index}></CardSkeleton>
          ))}
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
      <div className="flex items-center  justify-center mt-8">
        <Link to="/books">
          <button className="btn bg-navSecondary text-white hover:text-black">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularBookProvider;

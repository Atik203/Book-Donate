import Slider from "react-slick";
import useDeviceDetect from "../../Hooks/useDeviceDetect";
import { useGetPopularBooksQuery } from "../../redux/features/book/bookApi";
import { TBook } from "../../types/book.types";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import ErrorComponent from "../ErrorComponent/ErrorComonent";
import TitleDescriptionBlock from "../TitleDescriptionBlock/TitleDescriptionBlock";
import LeftArrow from "../ui/LeftArrow";
import RightArrow from "../ui/RightArrow";

const PopularBookProvider = () => {
  const { isDesktop, isTablet } = useDeviceDetect();

  const { data, isFetching, isLoading, error } =
    useGetPopularBooksQuery(undefined);

  const slides = data?.results;

  if (error instanceof Error) return <ErrorComponent message={error.message} />;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
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
    <div className="mx-auto relative my-20">
      <TitleDescriptionBlock
        title="Our Popular Books"
        description="At Smart Care, we are committed to providing a wide range of services designed to ensure your well-being and comfort."
      />
      {isLoading || isFetching ? (
        <div>
          <CardSkeleton />
        </div>
      ) : (
        <div className="slider-container">
          <Slider {...settings}>
            {slides?.map((book: TBook) => (
              <div className="mx-auto">
                <h3>{book.title}</h3>

                <img
                  src={book.image}
                  className="h-72 mx-auto"
                  alt={book.title}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default PopularBookProvider;

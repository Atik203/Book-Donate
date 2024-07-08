import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useDeviceDetect from "../../Hooks/useDeviceDetect";

import TitleDescriptionBlock from "../TitleDescriptionBlock/TitleDescriptionBlock";

const ServiceProvide = () => {
  const { isDesktop, isTablet } = useDeviceDetect();
  // const { data, isFetching, isLoading, error } = useGetServicesQuery();

  // const slides = data?.results;

  // const slidesPerView = isDesktop ? 3 : isTablet ? 2 : 1;

  // if (error instanceof Error) return <ErrorComponent message={error.message} />;

  return (
    <div className="mx-auto relative my-20">
      <TitleDescriptionBlock
        title="Our Popular Books"
        description="At Smart Care, we are committed to providing a wide range of services designed to ensure your well-being and comfort."
      />
      {/* {isLoading || isFetching ? (
        <div className="mx-auto relative my-20">
          <Swiper
            modules={[Virtual, Navigation, Pagination]}
            slidesPerView={slidesPerView}
            centeredSlides={false}
            spaceBetween={20}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            virtual
            className="mx-auto w-10/12"
          >
            {Array.from({ length: slidesPerView }).map((_, index) => (
              <SwiperSlide key={index} className="min-h-72 mx-auto">
                <CardSkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-next  absolute bottom-40 top-40 right-0 transform -translate-y-1/2"></div>
          <div className="swiper-button-prev  absolute bottom-40 top-40 left-0 transform -translate-y-1/2"></div>
        </div>
      ) : (
        <div className="relative">
          <Swiper
            modules={[Virtual, Navigation, Pagination]}
            slidesPerView={slidesPerView}
            centeredSlides={false}
            spaceBetween={20}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            virtual
            className="mx-auto w-10/12"
          >
            {slides &&
              slides.map((data, index) => (
                <SwiperSlide
                  key={data.id}
                  virtualIndex={index}
                  className="min-h-72 mx-auto"
                >
                  {<ServiceCard data={data} />}
                </SwiperSlide>
              ))}
          </Swiper>
          <div className="swiper-button-next  absolute bottom-40 top-40 right-0 transform -translate-y-1/2"></div>
          <div className="swiper-button-prev  absolute bottom-40 top-40 left-0 transform -translate-y-1/2"></div>
        </div>
      )} */}
    </div>
  );
};

export default ServiceProvide;

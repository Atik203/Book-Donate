const Banner = () => {
  return (
    <div className="mt-10 md:mt-12 lg:mt-28 mb-8">
      <div
        className="md:relative py-4 md:p-0 w-full md:h-[348px] lg:h-[500px] flex flex-col-reverse md:flex-row justify-center gap-6 bg-cover bg-center"
        style={{ backgroundImage: `url('/bannerSvg.svg')` }}
      >
        <div className=" md:w-1/2 p-3 my-auto md:p-4 lg:p-8">
          <h1 className="text-navPrimary font-extrabold text-3xl md:text-4xl lg:text-5xl">
            Donate Books, Earn Rewards
          </h1>
          <p className="font-medium md:text-lg lg:text-xl mt-4">
            At BookDonate, your generosity is rewarded. Donate books to earn
            points and redeem them for exciting gifts. Join us in spreading
            knowledge and enjoy exclusive rewards.
          </p>
        </div>
        <div className="md:relative md:w-1/2 md:-mt-[7px] lg:mt-[9px]">
          <img
            src="/banner.jpg"
            alt=""
            className="md:absolute md:-top-20 lg:-top-16 w-10/12 mx-auto md:w-full lg:w-11/12"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;

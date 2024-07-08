import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";
import Doctors from "../../components/Doctors/Doctors";
import PopularBookProvider from "../../components/PopularBookProvider/PopularBookProvider";
import TitleDescriptionBlock from "../../components/TitleDescriptionBlock/TitleDescriptionBlock";

const Home = () => {
  return (
    <div className="bg-[#ECECEC]">
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home Page" />
      </Helmet>
      <Banner></Banner>
      <PopularBookProvider />
      <Doctors />
      <TitleDescriptionBlock
        title="Clients Review about us"
        description="We provide the best popular available books. Check out our client review below."
      />

      <TitleDescriptionBlock
        title="Frequently Asked Questions"
        description="Check out our FAQ below. If you have any questions, feel free to contact us."
      />

      <TitleDescriptionBlock
        title="Subscribe to our newsletter"
        description="Subscribe to our newsletter below. We will send you the latest updates."
      />
    </div>
  );
};

export default Home;

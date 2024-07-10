import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";
import BookFilter from "../../components/BookFilter/BookFilter";
import FAQSection from "../../components/FAQSection/FAQSection";
import PopularBookProvider from "../../components/PopularBookProvider/PopularBookProvider";
import SubscribeSection from "../../components/SubscribeSection/SubscribeSection";
import TitleDescriptionBlock from "../../components/TitleDescriptionBlock/TitleDescriptionBlock";
import UserReviewSection from "../../components/UserReviewSection/UserReviewSection";

const Home = () => {
  return (
    <div className="bg-[#ECECEC]">
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home Page" />
      </Helmet>
      <Banner></Banner>
      <PopularBookProvider />
      <BookFilter />
      <TitleDescriptionBlock
        title="Clients Review about us"
        description="We provide the best popular available books. Check out our client review below."
      />
      <UserReviewSection />

      <TitleDescriptionBlock
        title="Frequently Asked Questions"
        description="Check out our FAQ below. If you have any questions, feel free to contact us."
      />

      <FAQSection />
      <TitleDescriptionBlock
        title="Subscribe to our newsletter"
        description="Subscribe to our newsletter below. We will send you the latest updates."
      />
      <SubscribeSection />
    </div>
  );
};

export default Home;

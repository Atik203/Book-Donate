import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";
import BookFilter from "../../components/BookFilter/BookFilter";
import FAQSection from "../../components/FAQSection/FAQSection";
import PopularBookProvider from "../../components/PopularBookProvider/PopularBookProvider";
import SubscribeSection from "../../components/SubscribeSection/SubscribeSection";
import SupportCenter from "../../components/SupportCenter/SupportCenter";
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
      <UserReviewSection />
      <FAQSection />
      <SupportCenter />
      <SubscribeSection />
    </div>
  );
};

export default Home;

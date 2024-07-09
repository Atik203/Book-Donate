import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";
import BookFilter from "../../components/BookFilter/BookFilter";
import FAQSection from "../../components/FAQSection/FAQSection";
import PopularBookProvider from "../../components/PopularBookProvider/PopularBookProvider";
import SubscribeSection from "../../components/SubscribeSection/SubscribeSection";
import TitleDescriptionBlock from "../../components/TitleDescriptionBlock/TitleDescriptionBlock";
import UserReviewSection from "../../components/UserReviewSection/UserReviewSection";
const reviews = [
  {
    id: 1,
    user: {
      username: "BookLover22",
      email: "booklover22@example.com",
      first_name: "Emma",
      last_name: "Smith",
    },
    book: {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
    },
    rating: "⭐⭐⭐⭐⭐",
    comment: "One of the best classics I've read!",
    date_added: "2024-07-09T09:30:00.000Z",
  },
  {
    id: 2,
    user: {
      username: "Atik203",
      email: "atikurrahaman0305@gmail.com",
      first_name: "Md.Atikur",
      last_name: "Rahaman",
    },
    book: {
      title: "A Visit from the Goon Squad",
      author: "Jennifer Egan",
    },
    rating: "⭐⭐⭐⭐",
    comment: "Nice book",
    date_added: "2024-07-08T11:13:32.241Z",
  },
  {
    id: 3,
    user: {
      username: "SciFiFan88",
      email: "scififan88@example.com",
      first_name: "John",
      last_name: "Doe",
    },
    book: {
      title: "Dune",
      author: "Frank Herbert",
    },
    rating: "⭐⭐⭐⭐⭐",
    comment: "Absolutely mind-blowing!",
    date_added: "2024-07-07T15:45:00.000Z",
  },
  {
    id: 4,
    user: {
      username: "MysteryReader99",
      email: "mysteryreader99@example.com",
      first_name: "Alice",
      last_name: "Johnson",
    },
    book: {
      title: "The Girl with the Dragon Tattoo",
      author: "Stieg Larsson",
    },
    rating: "⭐⭐⭐",
    comment: "Kept me guessing until the end.",
    date_added: "2024-07-06T18:20:00.000Z",
  },
];

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
      <UserReviewSection reviews={reviews} />

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

import { Helmet } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";
import Doctors from "../../components/Doctors/Doctors";
import ServiceProvide from "../../components/ServiceProvide/ServiceProvide";

const Home = () => {
  return (
    <div className="bg-[#ECECEC]">
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home Page" />
      </Helmet>
      <Banner></Banner>
      <ServiceProvide />
      <Doctors />
    </div>
  );
};

export default Home;

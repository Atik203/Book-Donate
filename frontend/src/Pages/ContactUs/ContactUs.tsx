import { Helmet } from "react-helmet-async";
import TitleDescriptionBlock from "../../components/TitleDescriptionBlock/TitleDescriptionBlock";

const ContactUs = () => {
  return (
    <div>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <TitleDescriptionBlock
        title="contact us"
        description="Contact us for any queries. We are here to help you. Fill the form below."
      />
    </div>
  );
};

export default ContactUs;

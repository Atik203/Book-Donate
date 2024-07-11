import { Link } from "react-router-dom";

const SupportCenter = () => {
  return (
    <div className="bg-white shadow-md px-6 py-24 my-20 lg:px-8 rounded-md">
      <div className="mx-auto max-w-2xl text-center">
        <Link to="/contact-us">
          <p className="text-base font-semibold leading-7 text-indigo-500 cursor-pointer">
            Get the help you need
          </p>
        </Link>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-navPrimary sm:text-6xl">
          Support center
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Welcome to the BookDonate Support Center. Here, you can find answers
          to your questions, get help with donations, and learn more about how
          you can contribute to spreading knowledge through book donations. If
          you need further assistance, please don't hesitate to contact us.
        </p>
      </div>
    </div>
  );
};

export default SupportCenter;

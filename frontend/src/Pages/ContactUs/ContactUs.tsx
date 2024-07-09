import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  return (
    <div className="my-20">
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <div
        className="relative bg-cover bg-center h-screen"
        style={{
          backgroundImage: `url('https://source.unsplash.com/1600x900/?nature,water')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative flex items-center justify-center h-full">
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
              Contact Us
            </h1>
            <p className="text-center text-gray-600 mb-8">
              We would love to hear from you. Please fill out the form below and
              we will get in touch with you shortly.
            </p>
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

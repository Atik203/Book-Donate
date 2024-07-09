import React from "react";

const SubscribeSection: React.FC = () => {
  return (
    <div className="bg-gray-100 mb-20">
      <form className="flex items-center justify-center mx-auto w-full">
        <input
          type="email"
          className="py-3 px-4 w-full sm:w-auto border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="bg-navPrimary text-white py-3 px-6 rounded-r-md ml-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default SubscribeSection;

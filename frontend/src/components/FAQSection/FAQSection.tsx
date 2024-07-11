import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import React from "react";
import TitleDescriptionBlock from "../TitleDescriptionBlock/TitleDescriptionBlock";

const faqs = [
  {
    question: "How can I donate books to BookDonate?",
    answer:
      "To donate books to BookDonate, simply visit our donation page and fill out the donation form. You can choose to drop off your books at one of our designated locations or request a free pickup service if you have a large number of books. We accept books in good condition, including textbooks, novels, and children's books.",
  },
  {
    question: "What types of books are accepted for donation?",
    answer:
      "We accept a wide variety of books, including textbooks, novels, children's books, and non-fiction. However, we do not accept books that are damaged, moldy, or missing pages. Please ensure that the books you donate are in good condition so that they can be enjoyed by others.",
  },
  {
    question: "Can I get a receipt for my book donation?",
    answer:
      "Yes, you can request a receipt for your book donation. When you fill out the donation form on our website, there is an option to request a receipt. We will email you a receipt that you can use for tax purposes. Your generous donation is greatly appreciated and helps us continue our mission.",
  },
  {
    question: "How are the donated books used?",
    answer:
      "The books donated to BookDonate are distributed to schools, libraries, and community centers in need. We also partner with various non-profit organizations to ensure that the books reach those who will benefit the most. Our goal is to promote literacy and education by providing access to quality reading materials.",
  },
  {
    question: "Can I volunteer to help with book donations?",
    answer:
      "Absolutely! We are always looking for volunteers to help with sorting, packing, and distributing books. If you are interested in volunteering, please visit our volunteer page and fill out the volunteer application form. Your time and effort will make a significant impact on our mission to spread knowledge through book donations.",
  },
];

const FAQSection: React.FC = () => {
  return (
    <div className="bg-white shadow-md my-20">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-20">
        <TitleDescriptionBlock
          title="Frequently Asked Questions"
          description="Check out our FAQ below. If you have any questions, feel free to contact us."
        />
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;

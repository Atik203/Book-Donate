import React from "react";

const FAQSection: React.FC = () => {
  return (
    <div className="flex gap-3 max-w-2xl mx-auto flex-col items-center mb-10 justify-center">
      <div className="daisiui collapse collapse-arrow bg-base-100">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-medium">Earn Rewards</div>
        <div className="collapse-content">
          <p>
            Donate books to earn points and redeem them for exciting gifts at
            BookDonate.
          </p>
        </div>
      </div>
      <div className="daisiui collapse collapse-arrow bg-base-100">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          Spread Knowledge
        </div>
        <div className="collapse-content">
          <p>
            Join us in spreading knowledge by donating books and supporting our
            community.
          </p>
        </div>
      </div>
      <div className="daisiui collapse collapse-arrow bg-base-100">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          Exclusive Rewards
        </div>
        <div className="collapse-content">
          <p>
            Enjoy exclusive rewards and benefits as a member of the BookDonate
            community.
          </p>
        </div>
      </div>
      <div className="daisiui collapse collapse-arrow bg-base-100">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          Support Literacy
        </div>
        <div className="collapse-content">
          <p>
            Support literacy initiatives by donating books and making a
            difference in education.
          </p>
        </div>
      </div>
      <div className="daisiui collapse collapse-arrow bg-base-100">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          Join the Community
        </div>
        <div className="collapse-content">
          <p>
            Become part of a vibrant community dedicated to promoting reading
            and learning.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;

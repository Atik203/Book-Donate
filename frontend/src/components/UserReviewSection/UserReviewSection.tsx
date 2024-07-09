import React from "react";
import Marquee from "react-fast-marquee";

import UserReview, { UserReviewProps } from "./../UserReview/UserReview";

interface UserReviewSectionProps {
  reviews: UserReviewProps[];
}

const UserReviewSection: React.FC<UserReviewSectionProps> = ({ reviews }) => {
  return (
    <div className="bg-gray-100 my-8">
      <Marquee gradient={false} speed={50}>
        {reviews.map((review) => (
          <UserReview key={review.id} {...review} />
        ))}
      </Marquee>
    </div>
  );
};

export default UserReviewSection;

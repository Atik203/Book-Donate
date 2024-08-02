import Marquee from "react-fast-marquee";

import { toast } from "sonner";
import { useGetAllReviewsQuery } from "../../redux/features/review/reviewApi";
import TitleDescriptionBlock from "../TitleDescriptionBlock/TitleDescriptionBlock";
import UserReview, { UserReviewProps } from "./../UserReview/UserReview";

const UserReviewSection = () => {
  const { data, isError, isFetching, isLoading } = useGetAllReviewsQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );
  const reviews = data?.results;

  if (isFetching) {
    return <div className="mx-auto text-lg font-medium">Loading...</div>;
  }
  if (isError) {
    toast.error("Failed to fetch reviews");
    return (
      <div className="mx-auto text-lg font-medium">Failed to fetch reviews</div>
    );
  }

  if (isLoading) {
    return <div className="mx-auto text-lg font-medium">Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-md py-24">
      <TitleDescriptionBlock
        title="Clients Review about us"
        description="We provide the best popular available books. Check out our client review below."
      />
      <div className="bg-gray-100 my-8">
        <Marquee gradient={true} speed={50}>
          {reviews?.map((review: UserReviewProps) => (
            <UserReview key={review.id} review={review} />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default UserReviewSection;

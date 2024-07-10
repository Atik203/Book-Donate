export interface UserReviewProps {
  id: number;
  user: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    image: string;
    id: number;
  };
  book: {
    title: string;
    author: string;
    id: number;
    image: string;
  };
  rating: string;
  comment: string;
  date_added: string;
}

const UserReview = ({ review }: { review: UserReviewProps }) => {
  const { user, book, rating, comment, date_added } = review;

  return (
    <div className="bg-white p-4 text-center rounded-md shadow-xl mx-2 w-64 min-h-48">
      <div className="flex justify-center gap-2 my-1">
        <img
          src={user.image}
          alt={user.username}
          className="w-12 h-12 rounded-full mx-auto"
        />
        <div className="text-start">
          <p className="text-gray-800">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-gray-500 text-xs">{user.username}</p>
        </div>
      </div>
      <p className="text-gray-800">
        <strong>{book.title}</strong> by {book.author}
      </p>

      <p className="text-gray-700 ">{comment}</p>
      <div className="flex items-center justify-between my-1">
        <p className="">{rating}</p>
        <p className="text-gray-500 text-sm">
          {new Date(date_added).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default UserReview;

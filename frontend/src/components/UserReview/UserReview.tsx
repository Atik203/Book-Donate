export interface UserReviewProps {
  id: number;
  user: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  book: {
    title: string;
    author: string;
  };
  rating: string;
  comment: string;
  date_added: string;
}

const UserReview = ({ review }: { review: UserReviewProps }) => {
  const { user, book, rating, comment, date_added } = review;

  return (
    <div className="bg-white p-4 text-center rounded-md shadow-xl mx-2 w-64 h-52">
      <h3 className="text-xl font-bold text-gray-800">
        {user.first_name} {user.last_name}
      </h3>
      <p className="text-gray-600">
        <em>{user.username}</em>
      </p>
      <p className="text-gray-800">
        <strong>{book.title}</strong> by {book.author}
      </p>
      <p className="text-yellow-500">{rating}</p>
      <p className="text-gray-700">{comment}</p>
      <p className="text-gray-500 text-sm">
        {new Date(date_added).toLocaleDateString()}
      </p>
    </div>
  );
};

export default UserReview;

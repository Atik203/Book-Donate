/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectItem } from "@nextui-org/react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { UserReviewProps } from "../../components/UserReview/UserReview";
import { RATING_OPTIONS } from "../../constants/book.contants";
import {
  useClaimedBookMutation,
  useGetSingleBookQuery,
} from "../../redux/features/book/bookApi";
import {
  useGetSingleBookReviewQuery,
  usePostReviewMutation,
} from "../../redux/features/review/reviewApi";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { TBook } from "../../types/book.types";

const BookDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookId = queryParams.get("id");
  const { handleSubmit, control, reset } = useForm();

  const isAuthenticated = useAppSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const currentUser = useAppSelector((state: RootState) => state.user.user);

  // Ensure bookId is valid before making the query
  const {
    data,
    isFetching,
    isError,
    isLoading,
    refetch: refetchBook,
  } = useGetSingleBookQuery(bookId, {
    skip: !bookId,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const { data: reviewsData, refetch: refetchReview } =
    useGetSingleBookReviewQuery(bookId, {
      skip: !bookId,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    });
  const [PostReview] = usePostReviewMutation();
  const [claimedBook] = useClaimedBookMutation();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (isFetching) return <div>Fetching...</div>;

  const book = data?.results[0] as TBook;

  const reviews = reviewsData?.results ?? [];

  const {
    title,
    author,
    description,
    image,
    genre,
    condition,
    publication_date,
    publisher,
    status,
    stock,
    date_added,
    isbn,
    donated_by,
  } = book;

  const isButtonDisabled = status !== "Available" || stock <= 0;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { comment, rating } = data;
    const user = currentUser?.id as number;
    const book = Number(bookId);

    const submitData = {
      comment,
      rating,
      user,
      book,
    };

    const toastId = toast.loading("Submitting review...");
    try {
      const result = await PostReview(submitData).unwrap();
      if (!result) {
        toast.error("Failed to submit review", { id: toastId });
      } else {
        reset();
        toast.success("Review submitted successfully", { id: toastId });
        refetchReview(); // Refetch the reviews after successful submission
      }
    } catch (error) {
      toast.error("Failed to submit review", { id: toastId });
    }
  };

  const handleBookClaim = async () => {
    const claimed_by = currentUser?.id as number;
    const id = Number(bookId);
    const submitData = {
      claimed_by,
      id,
    };
    const toastId = toast.loading("Claiming book...");
    await claimedBook(submitData)
      .unwrap()
      .then((result) => {
        if (!result) {
          toast.error("Failed to claim book", { id: toastId });
        } else {
          refetchBook();
          toast.success("Book claimed successfully", { id: toastId });
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((error: any) => {
        toast.error("Failed to claim book", { id: toastId });
      });
  };

  return (
    <div className="my-20">
      <div className="flex gap-8 justify-center mx-auto">
        <div className="">
          <img src={image} alt={title} className="min-w-96" />
        </div>
        <div className="">
          <h1>{title}</h1>
          <p>
            <strong>Author:</strong> {author}
          </p>
          <p className="text-justify">
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Condition:</strong> {condition}
          </p>
          <p>
            <strong>Publication Date:</strong> {publication_date}
          </p>
          <p>
            <strong>Publisher:</strong> {publisher}
          </p>
          <p>
            <strong>Status:</strong> {status}
          </p>
          <p>
            <strong>Stock:</strong> {stock}
          </p>
          <p>
            <strong>Date Added:</strong> {date_added}
          </p>
          <p>
            <strong>ISBN:</strong> {isbn}
          </p>
          <p className="">
            <strong>Donated By:</strong> {donated_by}
          </p>
          <p>
            <strong>Genre: </strong>
            {genre.map((genre, index) => (
              <p
                key={index}
                className="inline-block mr-2 font-semibold cursor-pointer hover:underline hover:text-blue-500 "
              >
                #{genre.name}
              </p>
            ))}
          </p>
          <button
            onClick={handleBookClaim}
            className="btn mt-2 bg-navPrimary text-white rounded-md text-lg px-5 hover:bg-gray-400
                hover:text-black"
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? "Not Available" : "Claim this Book"}
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {reviews?.length ? (
          reviews.map((review: UserReviewProps) => (
            <div
              key={review.id}
              className="mt-4 p-4 border rounded shadow-sm bg-base-100"
            >
              <div className="flex items-center mb-2">
                <img
                  src={review.user.image}
                  alt={review.user.username}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">
                    {review.user.first_name} {review.user.last_name}
                  </p>
                  <p>{review.rating}</p>
                </div>
              </div>
              <p className="my-1 text-justify">{review.comment}</p>

              <p className="text-xs text-gray-500">
                {new Date(review.date_added).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
        {isAuthenticated && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Leave a Comment</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="comment"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="w-full p-2 border rounded mt-2"
                    rows={4}
                    placeholder="Write your comment here..."
                  ></textarea>
                )}
              />
              <div className="bg-white max-w-md">
                <Controller
                  name="rating"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select Rating"
                      label="Select Rating"
                      className="text-xl font-bold text-black bg-base-50"
                    >
                      {RATING_OPTIONS.map((rating) => (
                        <SelectItem key={rating.key} value={rating.key}>
                          {rating.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>
              <button
                type="submit"
                className="bg-navPrimary mt-2 px-4 py-2 text-white rounded"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;

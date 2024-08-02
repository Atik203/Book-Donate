/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  cn,
  Input,
  Pagination,
  PaginationItemRenderProps,
  PaginationItemType,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoSearchCircleOutline } from "react-icons/io5";
import {
  CONDITION_OPTIONS,
  RATING_OPTIONS,
  STATUS_OPTIONS,
} from "../../constants/book.contants";
import {
  useGetAllAuthorsQuery,
  useGetAllBooksQuery,
  useGetAllGenresQuery,
} from "../../redux/features/book/bookApi";
import { TBook } from "../../types/book.types";
import { genreKeyLabelGenerator } from "../../utils/genreKeyLabelGenerator";
import { ChevronIcon } from "../ChevronIcon/ChevronIcon";
import ErrorComponent from "../ErrorComponent/ErrorComonent";
import PopularBookCard from "../PopularBookCard/PopularBookCard";

export type TGenre = {
  id: string;
  name: string;
  slug: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const GENRE: {
  key: string;
  label: string;
}[] = [];
const countStars = (stars: string): number => {
  return stars.length;
};
const BookFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [status, setStatus] = useState("");
  const [condition, setCondition] = useState("");
  const [author, setAuthor] = useState("");
  const isAnyFilterSet = genre || rating || status || condition || author;
  const query = {
    page: currentPage,
    search: searchTerm,
    page_size: 3,
    id: null,
    genre,
    rating: countStars(rating),
    author,
    condition,
    status,
  };
  const handleGenreChange = (value: any) => {
    setGenre(value.currentKey);
  };
  const handleRatingChange = (value: any) => {
    setRating(value.currentKey);
  };

  const handleAuthorChange = (value: any) => {
    setAuthor(value.currentKey);
  };
  const handleConditionChange = (value: any) => {
    setCondition(value.currentKey);
  };
  const handleStatusChange = (value: any) => {
    setStatus(value.currentKey);
  };

  const {
    data,
    error,
    isFetching,
    isLoading,
    refetch: refetchBook,
  } = useGetAllBooksQuery(query);
  const { data: genreData } = useGetAllGenresQuery(undefined);
  const { data: authors } = useGetAllAuthorsQuery(undefined);
  const genres = genreData?.results;
  genreKeyLabelGenerator(genres);
  if (error instanceof Error) return <ErrorComponent message={error.message} />;
  const books: TBook[] = data?.results ?? [];

  const handleResetFilter = () => {
    setGenre("");
    setRating("");
    setStatus("");
    setCondition("");
    setAuthor("");

    refetchBook();
  };

  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          disabled={data?.next === null}
          className={cn(
            className,
            "bg-[#D9D9D9] text-[#5D94A6] min-w-12 w-12 h-12"
          )}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <ChevronIcon className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          disabled={data?.prev === null || currentPage === 1}
          className={cn(
            className,
            "bg-[#D9D9D9] text-[#5D94A6] min-w-12  w-12 h-12"
          )}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <ChevronIcon />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      );
    }

    return (
      <button
        key={key}
        ref={ref}
        className={cn(
          className,
          isActive && "text-black bg-[#72aeaa] text-2xl font-bold"
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="mx-auto my-20 mt-20 grid grid-cols-1 md:grid-cols-4 gap-6 w-[95%]">
      <div className="md:col-span-1">
        <Input
          className="mx-auto"
          disabled
          variant="bordered"
          labelPlacement="outside"
          size="lg"
          classNames={{
            label: "ml-2 no-asterisk",
            errorMessage: "text-red-500 text-sm px-3",
            input: "bg-white my-input text-[#E3C3C3]",
            inputWrapper: "bg-white",
          }}
          placeholder={isAnyFilterSet ? "Clear filters" : "Filter books"}
          startContent={
            <FaFilter
              onClick={handleResetFilter}
              size={18}
              className="text-[#E3C3C3] cursor-pointer text-2xl font-bold"
              title="Click to reset filters"
            />
          }
          type="search"
        />
        <div className="my-2">
          <Select
            label="Genre"
            className="max-w-md text-lg font-semibold text-black my-1 shadow-lg"
            style={{ backgroundColor: "white" }}
            value={genre}
            onSelectionChange={handleGenreChange}
          >
            {GENRE?.map((genre) => (
              <SelectItem
                className="font-bold text-lg"
                key={genre.key}
                value={genre.key}
              >
                {genre.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="Book Rating"
            className="max-w-md text-lg font-semibold text-black my-1 shadow-lg"
            style={{ backgroundColor: "white" }}
            value={rating}
            onSelectionChange={handleRatingChange}
          >
            {RATING_OPTIONS.map((rating) => (
              <SelectItem className="font-bold text-lg" key={rating.key}>
                {rating.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="Status"
            className="max-w-md text-lg font-semibold text-black my-1 shadow-lg"
            style={{ backgroundColor: "white" }}
            value={status}
            onSelectionChange={handleStatusChange}
          >
            {STATUS_OPTIONS.map((status) => (
              <SelectItem className="font-bold text-lg" key={status.key}>
                {status.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="Condition"
            className="max-w-md text-lg font-semibold text-black my-1 shadow-lg"
            style={{ backgroundColor: "white" }}
            value={condition}
            onSelectionChange={handleConditionChange}
          >
            {CONDITION_OPTIONS.map((condition) => (
              <SelectItem className="font-bold text-lg" key={condition.key}>
                {condition.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="Author"
            className="max-w-md text-lg font-semibold text-black my-1 shadow-lg"
            style={{ backgroundColor: "white" }}
            value={author}
            onSelectionChange={handleAuthorChange}
          >
            {authors?.map((author: { author: string }) => (
              <SelectItem className="font-bold text-lg" key={author.author}>
                {author.author}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="md:col-span-3">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mx-auto"
          radius="full"
          variant="bordered"
          size="lg"
          labelPlacement="outside"
          classNames={{
            label: "ml-2 no-asterisk",
            errorMessage: "text-red-500 text-sm px-3",
            input: "bg-white font-bold my-input",
            inputWrapper: "bg-white",
          }}
          placeholder="Type to search..."
          startContent={
            <IoSearchCircleOutline
              className="text-[#E3C3C3] font-bold"
              size={28}
            />
          }
          type="search"
        />

        <div className="grid grid-cols-1 mt-2 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4">
          {!isFetching &&
            !isLoading &&
            books &&
            books.map((book: TBook) => (
              <PopularBookCard key={book.id} data={book} />
            ))}
          {books.length === 0 && (
            <div className="text-center flex justify-center items-center text-2xl font-bold min-h-48 mx-auto my-20">
              <h1> No books found</h1>
            </div>
          )}
        </div>
        <div className="mx-auto mt-4 w-full">
          <Pagination
            disableCursorAnimation
            showControls
            total={data?.next ? currentPage + 1 : currentPage}
            initialPage={1}
            className="gap-2 w-full"
            radius="full"
            renderItem={renderItem}
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};

export default BookFilter;

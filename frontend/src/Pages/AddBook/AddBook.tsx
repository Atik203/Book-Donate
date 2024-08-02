/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { GENRE } from "../../components/BookFilter/BookFilter";
import { CONDITION_OPTIONS } from "../../constants/book.contants";
import {
  useAddBookMutation,
  useGetAllGenresQuery,
} from "../../redux/features/book/bookApi";
import { useGetDonatedBooksQuery } from "../../redux/features/user/userApi";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { genreKeyLabelGenerator } from "../../utils/genreKeyLabelGenerator";

const AddBook = () => {
  const user = useAppSelector((state: RootState) => state.user.user);
  const { refetch } = useGetDonatedBooksQuery(user?.id as number);

  const { data: genreData } = useGetAllGenresQuery(undefined);
  const genres = genreData?.results;
  genreKeyLabelGenerator(genres);

  const [values, setValues] = useState(new Set([]));
  const [condition, setCondition] = useState();
  const [AddBook] = useAddBookMutation();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const reward_point = user?.role === "Admin" ? data.reward_point : 0;

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("stock", data.stock);
    formData.append("reward_point", reward_point.toString());
    formData.append("publisher", data.publisher);
    formData.append("publication_date", data.publication_date);
    formData.append("isbn", data.isbn);
    formData.append("pages", data.pages);
    formData.append("description", data.description);
    formData.append("image", data.image[0]);
    formData.append("donated_by", user?.id?.toString() as string);
    formData.append("genre", Array.from(values).join(","));
    // @ts-expect-error condition is string
    formData.append("condition", condition?.currentKey as string);
    formData.append("donated_by", user?.id?.toString() as string);

    const toastId = toast.loading("Submitting...");
    try {
      const result = await AddBook(formData).unwrap();

      if (result.success) {
        toast.success("Book added successfully", { id: toastId });
        refetch();
        reset();
      } else {
        toast.error("Failed to add book", { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to add book", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{user?.role === "Admin" ? "Add" : "Donate"} Book</title>
      </Helmet>
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col justify-center px-2">
          <div className="mx-auto w-full max-w-4xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold leading-9 tracking-tight text-gray-900">
                {user?.role === "Admin" ? "Add" : "Donate"} Book
              </h2>
            </div>
            <div className="mt-8 w-full">
              <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="flex items-center justify-center gap-4 w-full">
                    <div className="min-w-[20rem] w-full">
                      <label
                        htmlFor="title"
                        className="block text-sm font-bold leading-6 text-gray-900"
                      >
                        Title
                      </label>
                      <div className="mt-2">
                        <input
                          id="title"
                          type="text"
                          autoComplete="title"
                          required
                          {...register("title")}
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="min-w-[20rem] w-full">
                      <label
                        htmlFor="author"
                        className="block text-sm font-bold leading-6 text-gray-900"
                      >
                        Author
                      </label>
                      <div className="mt-2">
                        <input
                          id="author"
                          type="text"
                          required
                          {...register("author")}
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                      <Select
                        label="Genre"
                        className="min-w-[20rem] font-bold"
                        placeholder="Select a genre"
                        labelPlacement="outside"
                        selectionMode="multiple"
                        selectedKeys={values}
                        onSelectionChange={setValues as any}
                      >
                        {GENRE.map((genre) => (
                          <SelectItem key={genre.label}>
                            {genre.label}
                          </SelectItem>
                        ))}
                      </Select>

                      <Select
                        label="Condition"
                        placeholder="Select an a book condition"
                        className="min-w-[20rem] font-bold"
                        labelPlacement="outside"
                        selectedKeys={condition}
                        onSelectionChange={setCondition as any}
                      >
                        {CONDITION_OPTIONS.map((condition) => (
                          <SelectItem key={condition.key}>
                            {condition.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="min-w-[20rem] w-full">
                      <label
                        htmlFor="stock"
                        className="block text-sm font-bold leading-6 text-gray-900"
                      >
                        Stock
                      </label>
                      <div className="mt-2">
                        <input
                          id="stock"
                          type="text"
                          autoComplete="stock"
                          required
                          {...register("stock")}
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="min-w-[20rem] w-full">
                      <label
                        htmlFor="reward_point"
                        className="block text-sm font-bold leading-6 text-gray-900"
                      >
                        Reward Point
                      </label>
                      <div className="mt-2">
                        <input
                          id="reward_point"
                          type="text"
                          autoComplete="reward_point"
                          required
                          value={0}
                          defaultValue={0}
                          disabled={user?.role === "Admin" ? false : true}
                          {...register("reward_point")}
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="min-w-[20rem] w-full">
                      <label
                        htmlFor="publisher"
                        className="block text-sm font-bold leading-6 text-gray-900"
                      >
                        Publisher
                      </label>
                      <div className="mt-2">
                        <input
                          id="publisher"
                          type="text"
                          autoComplete="publisher"
                          required
                          {...register("publisher")}
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="min-w-[20rem] w-full">
                      <label
                        htmlFor="publication_date"
                        className="block text-sm font-bold leading-6 text-gray-900"
                      >
                        Publication Date
                      </label>
                      <div className="mt-2">
                        <input
                          id="publication_date"
                          type="text"
                          autoComplete="publication_date"
                          required
                          {...register("publication_date")}
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="min-w-[20rem] w-full">
                      <label
                        htmlFor="isbn"
                        className="block text-sm font-bold leading-6 text-gray-900"
                      >
                        ISBN Number
                      </label>
                      <div className="mt-2 relative">
                        <input
                          id="isbn"
                          type={"text"}
                          required
                          {...register("isbn")}
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="min-w-[20rem] w-full">
                      <label
                        htmlFor="pages"
                        className="block text-sm font-bold leading-6 text-gray-900"
                      >
                        Pages
                      </label>
                      <div className="mt-2 relative">
                        <input
                          id="pages"
                          type="text"
                          required
                          {...register("pages")}
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="min-w-[20rem] w-full">
                      <label
                        htmlFor="image"
                        className="block text-sm font-bold leading-6 text-gray-900"
                      >
                        Image
                      </label>
                      <div className="mt-2 relative">
                        <input
                          id="image"
                          type={"file"}
                          required
                          {...register("image")}
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="min-w-[20rem] w-full">
                      <label
                        htmlFor="description"
                        className="block text-sm font-bold leading-6 text-gray-900"
                      >
                        Description
                      </label>
                      <div className="mt-2 relative">
                        <input
                          id="description"
                          type="textarea"
                          required
                          {...register("description")}
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className={`flex  min-w-[20rem] mx-auto justify-center rounded-md bg-navPrimary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;

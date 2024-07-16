/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useAddGenreMutation,
  useGetAllGenresQuery,
} from "../../redux/features/book/bookApi";

const AddGenre = () => {
  const [AddGenre] = useAddGenreMutation();
  const { register, handleSubmit } = useForm();
  const { refetch } = useGetAllGenresQuery(undefined);
  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Adding Genre...");

    try {
      const result = await AddGenre(data).unwrap();
      if (result.id) {
        toast.success("Genre added successfully", { id: toastId });
        refetch();
      } else {
        toast.error("Failed to add Genre", { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to add Genre", { id: toastId });
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-xl">Add New Genre</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-md mx-auto">
          <div className="mt-4">
            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              {...register("name")}
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className={`flex mx-auto justify-center rounded-md bg-navPrimary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGenre;

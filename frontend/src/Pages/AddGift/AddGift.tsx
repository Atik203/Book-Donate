import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import MultipleImageUploader from "../../components/MultipleImageUploader/MultipleImageUploader";
import { useAddGiftMutation } from "../../redux/features/gift/giftApi";
import uploadImageToImgBB from "../../utils/uploadImageToImgBB";

const AddGift = () => {
  const [AddGift] = useAddGiftMutation();
  const [images, setImages] = useState<File[]>([]);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Submitting...");
    try {
      const imageUrl = await uploadImageToImgBB(images[0]);

      if (!imageUrl) {
        toast.error("Failed to upload image", { id: toastId });
        return;
      }

      const submitData = {
        ...data,
        image: imageUrl,
      };

      const result = await AddGift(submitData).unwrap();

      if (result.success) {
        toast.success("Gift added successfully", { id: toastId });
        reset();
      } else {
        toast.error("Failed to add Gift", { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to add Gift", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Add Gift</title>
      </Helmet>
      <div className="flex flex-1">
        <div className="flex flex-1 flex-col justify-center px-2">
          <div className="mx-auto w-full max-w-4xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold leading-9 tracking-tight text-gray-900">
                Add Gift
              </h2>
            </div>
            <div className="mt-8 w-full">
              <div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6 max-w-lg mx-auto"
                >
                  <div className="min-w-[20rem] w-full">
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        required
                        {...register("name")}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="min-w-[20rem] w-full">
                    <label
                      htmlFor="point_cost"
                      className="block text-sm font-bold leading-6 text-gray-900"
                    >
                      Point Cost
                    </label>
                    <div className="mt-2">
                      <input
                        id="point_cost"
                        type="text"
                        required
                        {...register("point_cost")}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
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
                        required
                        {...register("stock")}
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
                        className="block w-full min-h-20 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="min-w-[20rem] w-full">
                    <MultipleImageUploader
                      images={images}
                      setImages={setImages}
                    />
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

export default AddGift;

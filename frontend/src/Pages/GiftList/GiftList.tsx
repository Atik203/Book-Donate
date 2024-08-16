import { Avatar, Tooltip } from "@nextui-org/react";
import { truncate } from "lodash";
import { toast } from "sonner";
import {
  useDeleteGiftMutation,
  useGetAllGiftsQuery,
} from "../../redux/features/gift/giftApi";
import { TGift } from "../../types";

const GiftList = () => {
  const [DeleteGift] = useDeleteGiftMutation();

  const { data, isError, isFetching, isLoading, refetch } =
    useGetAllGiftsQuery(undefined);

  if (isLoading || isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const allGifts = data?.results ?? [];

  const handleDelete = async (id: number) => {
    const toastId = toast.loading("Deleting gift...");

    try {
      await DeleteGift({ id }).unwrap();
      toast.success("Gift Deleted Successfully", { id: toastId });
      refetch();
    } catch (error) {
      toast.error("Gift Deleted Failed", { id: toastId });
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table text-black">
        <thead className="text-lg font-semibold text-black">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Point Cost</th>
            <th>Stock</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allGifts.map((gift: TGift) => (
            <tr key={gift.id} className="text-black">
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="secondary"
                      size="md"
                      src={gift.image as string}
                    />
                  </div>
                  <div>
                    <div className="font-bold  hover:underline hover:text-red-500">
                      {gift.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-medium">
                {" "}
                <Tooltip
                  content={gift.description}
                  color="foreground"
                  showArrow={true}
                  placement="top"
                  classNames={{
                    content: ["w-60"],
                  }}
                >
                  <p>{truncate(gift.description, { length: 30 })}</p>
                </Tooltip>
              </td>
              <td className="text-medium">{gift.point_cost}</td>
              <td className="text-medium">{gift.stock}</td>
              <td className="flex items-center justify-center gap-1">
                <button
                  onClick={() => handleDelete(gift.id)}
                  title="Delete"
                  className="hover:text-navPrimary btn bg-red-500 btn-sm text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {!allGifts.length && (
            <tr>
              <td colSpan={10} className="text-center text-xl font-bold">
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GiftList;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Tooltip } from "@nextui-org/react";
import { truncate } from "lodash";
import { useGetUserGiftsQuery } from "../../redux/features/gift/giftApi";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import transformGiftData, { Purchase } from "../../utils/transformGiftData";

const MyGift = () => {
  const currentUser = useAppSelector((state: RootState) => state.user.user);
  const { data, isError, isFetching, isLoading } = useGetUserGiftsQuery(
    currentUser?.id as number
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (isFetching) return <div>Fetching...</div>;

  const purchases: Purchase[] = data?.results ?? [];
  const transformData = transformGiftData(purchases);
  const userGifts = transformData.gifts;
  console.log(userGifts);

  return (
    <div className="overflow-x-auto">
      <table className="table text-black">
        <thead className="text-lg font-semibold text-black">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Point Cost</th>
            <th>Quantity</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {userGifts.map((item: any) => (
            <tr key={item.id} className="text-black">
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="secondary"
                      size="md"
                      src={item.image as string}
                    />
                  </div>
                  <div>
                    <div className="font-bold hover:text-red-500">
                      {item.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-medium">
                {" "}
                <Tooltip
                  content={item.description}
                  color="foreground"
                  showArrow={true}
                  placement="top"
                  classNames={{
                    content: ["w-60"],
                  }}
                >
                  <p>{truncate(item.description, { length: 30 })}</p>
                </Tooltip>
              </td>
              <td className="text-medium">{item.point_cost}</td>
              <td className="text-medium">{item.quantity}</td>
              <td className="text-medium">{item.total_cost}</td>
            </tr>
          ))}

          {!userGifts.length && (
            <tr>
              <td colSpan={10} className="text-center text-xl font-bold">
                No Gift found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyGift;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Tooltip } from "@nextui-org/react";
import { truncate } from "lodash";
import { useAllUserGiftsQuery } from "../../redux/features/gift/giftApi";
import transformAllUserGiftData, {
  TransformedData,
} from "../../utils/transformAllUserGiftData";
import { Purchase } from "../../utils/transformGiftData";

const AllUserGiftList = () => {
  const { data, isError, isFetching, isLoading } =
    useAllUserGiftsQuery(undefined);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (isFetching) return <div>Fetching...</div>;

  const purchases: Purchase[] = data?.results ?? [];
  const allUserGiftData: TransformedData[] =
    transformAllUserGiftData(purchases);

  return (
    <div className="overflow-x-auto">
      <table className="table text-black">
        <thead className="text-lg font-semibold text-black">
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Gift Name</th>
            <th>Description</th>
            <th>Point Cost</th>
            <th>Quantity</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {allUserGiftData.map((item: any, index) => (
            <tr key={index} className="text-black">
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="secondary"
                      size="md"
                      src={item.book_user.image as string}
                    />
                  </div>
                  <div>
                    <div className="font-bold hover:text-red-500">
                      {item.book_user.user.first_name}{" "}
                      {item.book_user.user.last_name}
                    </div>

                    <div>
                      <span className="text-sm italic">
                        @{item.book_user.user.username}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td
                className={
                  item.book_user.role === "Admin"
                    ? "text-red-500 text-medium"
                    : "text-green-500 text-medium"
                }
              >
                {item.book_user.role}
              </td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="secondary"
                      size="md"
                      src={item.gift.image as string}
                    />
                  </div>
                  <div>
                    <div className="font-bold hover:text-red-500">
                      {item.gift.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-medium">
                <Tooltip
                  content={item.gift.description}
                  color="foreground"
                  showArrow={true}
                  placement="top"
                  classNames={{
                    content: ["w-60"],
                  }}
                >
                  <p>{truncate(item.gift.description, { length: 30 })}</p>
                </Tooltip>
              </td>
              <td className="text-medium">{item.gift.point_cost}</td>
              <td className="text-medium">{item.gift.quantity}</td>
              <td className="text-medium">{item.gift.total_cost}</td>
            </tr>
          ))}

          {!allUserGiftData.length && (
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

export default AllUserGiftList;

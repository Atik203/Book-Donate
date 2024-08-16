import { Tooltip } from "@nextui-org/react";
import { truncate } from "lodash";
import { toast } from "sonner";
import TitleDescriptionBlock from "../../components/TitleDescriptionBlock/TitleDescriptionBlock";
import {
  useBuyGiftMutation,
  useGetAllGiftsQuery,
} from "../../redux/features/gift/giftApi";
import {
  useGetClaimedBooksQuery,
  useGetSingleUserQuery,
} from "../../redux/features/user/userApi";
import { setUser } from "../../redux/features/user/userSLice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
export type TGift = {
  id: number;
  name: string;
  description: string;
  image: string;
  point_cost: number;
  stock: number;
};

const Gifts = () => {
  const user = useAppSelector((state: RootState) => state.user.user);
  const token = useAppSelector(
    (state: RootState) => state.user.token
  ) as string;
  const dispatch = useAppDispatch();

  const { data, isFetching, isError, isLoading } =
    useGetAllGiftsQuery(undefined);

  const { data: userData, refetch } = useGetSingleUserQuery(user?.id || 0, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  const { data: claimedBook } = useGetClaimedBooksQuery(user?.id || 0, {
    skip: !user?.id,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  const [BuyGift] = useBuyGiftMutation();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (isFetching) return <div>Fetching...</div>;

  const gifts: TGift[] = data.results;

  const handleBuyGift = async (id: number) => {
    const submitDat = {
      book_user_id: user?.id,
      gift_id: id,
    };
    const toastId = toast.loading("Processing...");

    try {
      const response = await BuyGift(submitDat).unwrap();
      if (response.success) {
        toast.success("Gift purchased successfully", { id: toastId });
        await refetch();

        const newUser = userData?.results[0];
        const user_claimed_books = claimedBook?.results;
        const userSubmitData = {
          id: newUser?.id,
          image: newUser?.image,
          role: newUser?.role,
          first_name: newUser?.user.first_name,
          last_name: newUser?.user.last_name,
          email: newUser?.user.email,
          claimed_books: user_claimed_books,
          address: newUser?.address,
          phone: newUser?.phone,
          username: newUser?.user.username,
          reward_point: response?.reward_point,
        };
        dispatch(setUser({ token, user: userSubmitData }));
      } else {
        toast.error("Error occurred. Please try again", { id: toastId });
      }
    } catch (error) {
      toast.error("Error occurred. Please try again", { id: toastId });
    }
  };

  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-20">
        <TitleDescriptionBlock
          title="Explore Our Gift Section"
          description="Discover a variety of gifts that you can purchase with your reward points. If you have any questions, feel free to contact us."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-4">
          {gifts.length &&
            gifts.map((gift: TGift) => (
              <div
                key={gift.id}
                className="bg-white shadow-lg min-h-[28rem] flex flex-col"
              >
                <figure className="flex items-center justify-center p-2">
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="w-36 h-44 object-contain"
                  />
                </figure>
                <div className="card-body flex flex-col flex-grow">
                  <h2 className="card-title">{gift.name}</h2>
                  <Tooltip
                    content={gift.description}
                    color="foreground"
                    showArrow={true}
                    placement="top"
                    classNames={{
                      content: ["w-64"],
                    }}
                  >
                    <p>{truncate(gift.description, { length: 50 })}</p>
                  </Tooltip>

                  <div className="flex items-center justify-between mt-4">
                    <div className="badge badge-warning px-2 py-4">
                      Points: {gift.point_cost}
                    </div>
                    <div className="badge badge-neutral px-2 py-4">
                      Stock: {gift.stock}
                    </div>
                  </div>
                  <div className="card-actions mt-4 justify-center">
                    <button
                      onClick={() => handleBuyGift(gift.id)}
                      disabled={
                        user?.id
                          ? gift.point_cost > user?.reward_point ||
                            gift.stock === 0
                          : true
                      }
                      className={`btn bg-navPrimary text-white hover:text-black ${
                        user?.id && gift.point_cost <= user?.reward_point
                          ? ""
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Gifts;

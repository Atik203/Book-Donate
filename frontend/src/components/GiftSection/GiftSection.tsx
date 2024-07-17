import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  useBuyGiftMutation,
  useGetAllGiftsQuery,
} from "../../redux/features/gift/giftApi";
import { useGetSingleUserQuery } from "../../redux/features/user/userApi";
import { setUser } from "../../redux/features/user/userSLice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import TitleDescriptionBlock from "../TitleDescriptionBlock/TitleDescriptionBlock";
export type TGift = {
  id: number;
  name: string;
  description: string;
  image: string;
  point_cost: number;
  stock: number;
};

const GiftSection = () => {
  const user = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();

  const { data, isFetching, isError, isLoading } =
    useGetAllGiftsQuery(undefined);

  const { data: userData, refetch } = useGetSingleUserQuery(user?.id || 0, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  const newUser = userData?.results[0];

  const [BuyGift] = useBuyGiftMutation();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (isFetching) return <div>Fetching...</div>;

  let gifts: TGift[] = [];

  if (data.results.length > 4) {
    gifts = data.results.slice(0, 4);
  } else {
    gifts = data.results;
  }

  dispatch(setUser({ token: user?.token, user: newUser }));

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
        refetch();
      } else {
        toast.error("Error occurred. Please try again", { id: toastId });
      }
    } catch (error) {
      toast.error("Error occurred. Please try again", { id: toastId });
    }
  };

  return (
    <div className="mt-16 mb-12">
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
                className="bg-base-100 shadow-md min-h-[28rem] flex flex-col"
              >
                <figure className="flex items-center justify-center p-2">
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="w-36 h-44 object-cover"
                  />
                </figure>
                <div className="card-body flex flex-col flex-grow">
                  <h2 className="card-title">{gift.name}</h2>
                  <p className="flex-grow">{gift.description}</p>

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
                        user?.id ? gift.point_cost > user?.reward_point : true
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
        <div className="flex items-center  justify-center mt-12">
          <Link to="/gifts">
            <button className="btn bg-navSecondary text-white hover:text-black">
              View All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GiftSection;

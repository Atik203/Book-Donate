import { TGift } from "../types";

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  image: string;
  role: string;
  reward_point: number;
}

export interface Purchase {
  id: number;
  book_user: {
    id: number;
    user: User;
    phone: string;
    address: string;
    image: string;
    role: string;
    reward_point: number;
  };
  gift: TGift;
  date: string;
  point_cost: number;
}

interface TransformedGift {
  id: number;
  name: string;
  description: string;
  image: string;
  point_cost: number;
  stock: number;
  quantity: number;
  total_cost: number;
}

interface TransformedData {
  user: User | object;
  gifts: TransformedGift[];
}

function transformGiftData(purchases: Purchase[]): TransformedData {
  const result: TransformedData = {
    user: {},
    gifts: [],
  };

  const giftMap = new Map<number, TransformedGift>();

  purchases.forEach((purchase) => {
    if (!result.user) {
      result.user = purchase.book_user.user;
    }

    const gift = purchase.gift;
    if (giftMap.has(gift.id)) {
      const existingGift = giftMap.get(gift.id);
      existingGift!.quantity += 1;
      existingGift!.total_cost += purchase.point_cost;
    } else {
      giftMap.set(gift.id, {
        ...gift,
        quantity: 1,
        total_cost: purchase.point_cost,
      });
    }
  });

  result.gifts = Array.from(giftMap.values());
  return result;
}

export default transformGiftData;

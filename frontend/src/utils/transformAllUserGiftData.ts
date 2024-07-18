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

interface Gift {
  id: number;
  name: string;
  description: string;
  image: string;
  point_cost: number;
  stock: number;
}

interface Purchase {
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
  gift: Gift;
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

export interface TransformedData {
  book_user: {
    id: number;
    user: User;
    phone: string;
    address: string;
    image: string;
    role: string;
    reward_point: number;
  };
  gifts: TransformedGift[];
}

function transformAllUserGiftData(purchases: Purchase[]): TransformedData[] {
  const result: TransformedData[] = [];

  const userMap = new Map<number, TransformedData>();

  purchases.forEach((purchase) => {
    const bookUser = purchase.book_user;
    const gift = purchase.gift;

    if (userMap.has(bookUser.id)) {
      const existingUser = userMap.get(bookUser.id);
      const existingGift = existingUser!.gifts.find((g) => g.id === gift.id);

      if (existingGift) {
        existingGift.quantity += 1;
        existingGift.total_cost += purchase.point_cost;
      } else {
        existingUser!.gifts.push({
          ...gift,
          quantity: 1,
          total_cost: purchase.point_cost,
        });
      }
    } else {
      userMap.set(bookUser.id, {
        book_user: bookUser,
        gifts: [
          {
            ...gift,
            quantity: 1,
            total_cost: purchase.point_cost,
          },
        ],
      });
    }
  });

  userMap.forEach((value) => result.push(value));
  return result;
}

export default transformAllUserGiftData;

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
  gift: TransformedGift;
}

function transformAllUserGiftData(purchases: Purchase[]): TransformedData[] {
  const result: TransformedData[] = [];

  purchases.forEach((purchase) => {
    const bookUser = purchase.book_user;
    const gift = purchase.gift;

    const existingEntry = result.find(
      (entry) => entry.book_user.id === bookUser.id && entry.gift.id === gift.id
    );

    if (existingEntry) {
      existingEntry.gift.quantity += 1;
      existingEntry.gift.total_cost += purchase.point_cost;
    } else {
      result.push({
        book_user: bookUser,
        gift: {
          ...gift,
          quantity: 1,
          total_cost: purchase.point_cost,
        },
      });
    }
  });

  return result;
}

export default transformAllUserGiftData;

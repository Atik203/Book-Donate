import { TBook } from "./book.types";

export interface TUser {
  id: number;
  email: string;
  first_name: string;
  image: string;
  last_name: string;
  phone: string;
  username: string;
  reward_point: number;
  role: "Admin" | "User";
  claimed_books: TBook[];
  address: string;
}

export interface UserState {
  token: string | null;
  user: TUser | null;
  isAuthenticated: boolean;
}

export type TChangePassword = {
  username: string;
  old_password: string;
  new_password: string;
  confirm_password: string;
};

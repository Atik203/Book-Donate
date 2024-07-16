import { TBook } from "./book.types";

export interface TUser {
  id: number;
  email: string | null;
  first_name: string | null;
  image: string | null;
  last_name: string | null;
  phone: string | null;
  username: string | null;
  reward_point: number;
  role: "Admin" | "User";
  claimed_books: TBook[];
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

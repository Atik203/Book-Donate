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
}

export interface UserState {
  token: string | null;
  user: TUser | null;
  isAuthenticated: boolean;
}

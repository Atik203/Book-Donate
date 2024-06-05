export interface TUser {
  email: string | null;
  first_name: string | null;
  image: string | null;
  last_name: string | null;
  phone: string | null;
  username: string | null;
}

export interface UserState {
  token: string | null;
  user: TUser | null;
  isAuthenticated: boolean;
}

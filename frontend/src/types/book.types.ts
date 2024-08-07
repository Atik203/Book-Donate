import { TUser } from "./userSateData";

export type TBook = {
  id: number;
  title: string;
  author: string;
  genre: Array<{ name: string; slug: string | null }>;
  description: string;
  condition: "New" | "Used" | "Refurbished";
  image: string;
  donated_by: TUser | null;
  claimed_by: TUser | null;
  date_added: string;
  status: "Available" | "Claimed" | "Donated";
  isbn: string | null;
  publisher: string | null;
  publication_date: string | null;
  stock: number;
  pages: number | null;
  reward_point: number;
  approve: "Pending" | "Approved";
};

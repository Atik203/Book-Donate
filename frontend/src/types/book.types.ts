export type TBook = {
  id: number;
  title: string;
  author: string;
  genre: Array<{ name: string; slug: string | null }>;
  description: string;
  condition: "New" | "Used" | "Refurbished";
  image: string;
  donated_by: number | null;
  claimed_by: number | null;
  date_added: string;
  status: "Available" | "Claimed" | "Donated";
  isbn: string | null;
  publisher: string | null;
  publication_date: string | null;
  stock: number;
  pages: number | null;
  reward_point: number;
};

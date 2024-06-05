// types/serviceData.ts
export type TServiceData = {
  id: number;
  name: string;
  image: string;
  description: string;
};
export type ServiceData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TServiceData[];
};

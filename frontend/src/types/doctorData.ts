export type TUser = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
};

export type TSpecialization = {
  id: number;
  name: string;
  slug: string;
};

export type TDesignation = {
  id: number;
  name: string;
  slug: string;
};

export type TAvailableTime = {
  id: number;
  name: string;
};

export type TDoctorData = {
  id: number;
  user: TUser;
  specialization: TSpecialization[];
  designation: TDesignation[];
  available_time: TAvailableTime[];
  image: string;
  fee: number;
  meet_link: string;
};

export type doctorData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TDoctorData[];
};

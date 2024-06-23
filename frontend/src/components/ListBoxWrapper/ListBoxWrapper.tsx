import { ReactNode } from "react";

export const ListboxWrapper = ({
  children,
  selected,
}: {
  children: ReactNode;
  selected: boolean;
}) => (
  <div
    className={`border-small text-black font-bold px-2 py-3 ${
      selected ? "bg-[#FFCC80]" : "bg-[#FFE0B2]"
    } rounded-small`}
  >
    {children}
  </div>
);

import { ReactNode } from "react";

export const ListboxWrapper = ({
  children,
  selected,
}: {
  children: ReactNode;
  selected: boolean;
}) => (
  <div
    className={`border-small text-white font-bold px-2 py-3 ${
      selected ? "bg-[#4da9a3]" : "bg-[#7cc8bf]"
    } rounded-small`}
  >
    {children}
  </div>
);

import {
  cn,
  Input,
  Listbox,
  ListboxItem,
  Pagination,
  PaginationItemRenderProps,
  PaginationItemType,
} from "@nextui-org/react";
import { Selection } from "@react-types/shared";
import { useMemo, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoSearchCircleOutline } from "react-icons/io5";
import { useGetDoctorsQuery } from "../../redux/api/baseApi";
import { doctorData } from "../../types/doctorData";
import { ChevronIcon } from "../ChevronIcon/ChevronIcon";
import DoctorCard from "../DoctorCard/DoctorCard";
import ErrorComponent from "../ErrorComponent/ErrorComonent";
import { ListboxWrapper } from "../ListBoxWrapper/ListBoxWrapper";

const Doctors = () => {
  const filters: string[] = ["Name", "Designation", "Specialization"];
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Filter Doctors"]));
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleSelectionChange = (keys: Selection) => {
    const newKeys = new Set<string>();
    for (const key of keys) {
      newKeys.add(String(key));
    }
    setSelectedKeys(newKeys);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isFetching, isLoading } = useGetDoctorsQuery({
    page: currentPage,
    search: searchTerm,
  });
  const doctorData: doctorData | undefined = data;
  if (error instanceof Error) return <ErrorComponent message={error.message} />;
  const doctors = doctorData?.results ?? [];

  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className={cn(
            className,
            "bg-[#D9D9D9] text-[#5D94A6] min-w-12 w-12 h-12"
          )}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <ChevronIcon className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={cn(
            className,
            "bg-[#D9D9D9] text-[#5D94A6] min-w-12  w-12 h-12"
          )}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <ChevronIcon />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      );
    }

    // cursor is the default item
    return (
      <button
        key={key}
        ref={ref}
        className={cn(
          className,
          isActive && "text-black bg-[#72aeaa] text-2xl font-bold"
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="mx-auto my-20 mt-20 grid grid-cols-1 md:grid-cols-4 gap-6 w-[95%]">
      <div className="md:col-span-1">
        <Input
          className="mx-auto"
          disabled
          variant="bordered"
          labelPlacement="outside"
          size="lg"
          classNames={{
            label: "ml-2 no-asterisk",
            errorMessage: "text-red-500 text-sm px-3",
            input: "bg-white my-input text-[#E3C3C3]",
            inputWrapper: "bg-white",
          }}
          placeholder={`${selectedValue ? selectedValue : "Filter Doctors"}`}
          startContent={<FaFilter size={18} className="text-[#E3C3C3]" />}
          type="search"
        />
        <div className="flex flex-col gap-4 mt-1">
          <Listbox
            variant="solid"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelectionChange}
          >
            {filters.map((filter) => (
              <ListboxItem
                key={filter}
                className="p-0 m-0"
                classNames={{
                  selectedIcon: "hidden",
                }}
              >
                <ListboxWrapper selected={selectedKeys.has(filter)}>
                  {filter}
                </ListboxWrapper>
              </ListboxItem>
            ))}
          </Listbox>
          <p className="text-small px-2 font-semibold">
            Selected Filter: {selectedValue}
          </p>
        </div>
      </div>
      <div className="md:col-span-3">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mx-auto"
          radius="full"
          variant="bordered"
          size="lg"
          labelPlacement="outside"
          classNames={{
            label: "ml-2 no-asterisk",
            errorMessage: "text-red-500 text-sm px-3",
            input: "bg-white font-bold my-input",
            inputWrapper: "bg-white",
          }}
          placeholder="Type to search..."
          startContent={
            <IoSearchCircleOutline
              className="text-[#E3C3C3] font-bold"
              size={28}
            />
          }
          type="search"
        />

        <div className="grid grid-cols-1 mt-2 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4">
          {!isFetching &&
            !isLoading &&
            doctors &&
            doctors.map((doctor) => (
              <DoctorCard key={doctor.id} data={doctor} />
            ))}
        </div>
        <div className="mx-auto mt-4 w-full">
          <Pagination
            disableCursorAnimation
            showControls
            total={data?.next ? currentPage + 1 : currentPage}
            initialPage={1}
            className="gap-2 w-full"
            radius="full"
            renderItem={renderItem}
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};

export default Doctors;

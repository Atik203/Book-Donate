import { Image } from "@nextui-org/react";
import { truncate } from "lodash";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TBook } from "../../types/book.types";

type TBookCardProps = {
  data: TBook;
  // setId: (id: number) => void;
};

const PopularBookCard: React.FC<TBookCardProps> = ({ data }) => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center bg-white rounded-md h-[28rem]">
      <Image
        alt="Card background"
        className="pt-2 mx-auto  m-0 h-[260px] w-60 md:w-64 object-contain"
        src={`https://app.requestly.io/delay/2000/${data.image}`}
      />
      <div className="px-4 pb-2 flex-col items-start">
        <ul className="list-none p-0 m-0">
          {data.genre.map((genre, index) => (
            <li
              key={index}
              className="inline-block mr-2 text-sm cursor-pointer hover:underline hover:text-blue-500 "
            >
              #{genre.name}
            </li>
          ))}
        </ul>
        <h2 className="text-navPrimary font-semibold">{data.title}</h2>
        <p className="">
          Author: <span className="">{data.author}</span>
        </p>
        <p className="">
          Condition:
          <span className="">{data.condition}</span>
        </p>
        <p className="text-black text-justify">
          {truncate(data.description, { length: 50 })}
        </p>
        <Link to={`/book-details/${data.id}`}>
          <p className="hover:text-navPrimary text-end text-lg cursor-pointer">
            Details <FaArrowRight className="inline" />
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PopularBookCard;

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
    <div className="mx-auto flex flex-col items-center justify-center bg-white">
      <Image
        width={300}
        height={350}
        alt="Card background"
        className="rounded-lg mx-auto p-0 m-0 h-[350px] w-64 md:w-72"
        src={`https://app.requestly.io/delay/2000/${data.image}`}
      />
      <div className="px-6 py-3 flex-col items-start">
        <ul className="list-none p-0 m-0">
          {data.genre.map((genre, index) => (
            <li
              key={index}
              className="inline-block mr-2 font-semibold cursor-pointer hover:underline hover:text-blue-500 "
            >
              #{genre.name}
            </li>
          ))}
        </ul>
        <h2 className="text-navPrimary uppercase font-bold">{data.title}</h2>
        <p className="">
          Author: <span className="font-semibold">{data.author}</span>
        </p>
        <p className="">
          Condition:
          <span className="font-semibold">{data.condition}</span>
        </p>
        <p className="text-black text-justify">
          {truncate(data.description, { length: 100 })}
        </p>
        <Link to={`/book-details/?id=${data.id}`}>
          <p className="hover:text-navPrimary font-bold text-lg cursor-pointer">
            Learn More <FaArrowRight className="inline" />
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PopularBookCard;

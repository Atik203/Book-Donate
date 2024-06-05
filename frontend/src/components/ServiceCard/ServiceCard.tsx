import { Card, CardFooter, Image } from "@nextui-org/react";
import { truncate } from "lodash";
import { FaArrowRight } from "react-icons/fa";
import { TServiceData } from "../../types/serviceData";

type ServiceCardProps = {
  data: TServiceData;
};
const ServiceCard: React.FC<ServiceCardProps> = ({ data }) => {
  return (
    <div>
      <Card className="mx-auto flex flex-col items-center justify-center p-0 m-0">
        <div className="m-4">
          <Image
            width={320}
            height={240}
            alt="Card background"
            className="rounded-lg mx-auto p-0 h-60 w-72 md:w-80 "
            src={`https://app.requestly.io/delay/2000/${data.image}`}
          />
          <CardFooter className="px-2 flex-col items-start">
            <h2 className="text-navPrimary uppercase font-bold">{data.name}</h2>
            <p className="text-lg">
              {truncate(data.description, { length: 50 })}
            </p>
            <p className="text-navPrimary font-bold text-lg cursor-pointer">
              Learn More <FaArrowRight className="inline" />
            </p>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default ServiceCard;

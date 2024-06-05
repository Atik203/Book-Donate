import { Card, CardFooter, Image } from "@nextui-org/react";
import { TDoctorData } from "../../types/doctorData";

interface DoctorCardProps {
  data: TDoctorData;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ data }) => {
  return (
    <div>
      <Card className="mx-auto flex flex-col items-center justify-center p-0 m-0">
        <div className="m-4">
          <Image
            width={192}
            height={192}
            radius="full"
            classNames={{
              img: "ml-4",
            }}
            alt="Card background"
            className="rounded-full mx-auto p-0 h-48 w-48 md:w-48"
            src={`https://app.requestly.io/delay/2000/${data.image}`}
          />
          <CardFooter className="flex-col items-center">
            <h2 className="text-navPrimary uppercase text-center font-bold">
              {data.user.first_name} {data.user.last_name}
            </h2>
            <p className="text-sm">
              {data.designation?.map((d) => {
                return d.name + " ";
              })}
            </p>
            <div className="items-start text-sm mt-1">
              {data.specialization?.map((s) => {
                return s.name + " ";
              })}
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default DoctorCard;

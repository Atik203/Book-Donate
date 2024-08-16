/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Avatar } from "@nextui-org/react";
import { toast } from "sonner";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useMakeAdminMutation,
} from "../../redux/features/user/userApi";
import { TUser } from "../../types/userSateData";

const AllUser = () => {
  const [DeleteUser] = useDeleteUserMutation();
  const [MakeAdmin] = useMakeAdminMutation();

  const { data, isError, isFetching, isLoading, refetch } =
    useGetAllUserQuery(undefined);

  if (isLoading || isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const allUsers = data?.results ?? [];

  const handleDelete = async (id: number) => {
    const toastId = toast.loading("Deleting User...");

    try {
      const result = await DeleteUser({ id }).unwrap();

      if (result.success) {
        toast.success("User Deleted Successfully", { id: toastId });
        refetch();
      } else {
        toast.error("User Deleted Failed", { id: toastId });
      }
    } catch (error) {
      toast.error("User Deleted Failed", { id: toastId });
    }
  };

  const makeAdmin = async (id: number) => {
    const toastId = toast.loading("Making Admin...");

    try {
      const result = await MakeAdmin({ id }).unwrap();

      if (result.success) {
        toast.success("User Made Admin Successfully", { id: toastId });
        refetch();
      } else {
        toast.error("User Made Admin Failed", { id: toastId });
      }
    } catch (error) {
      toast.error("User Made Admin Failed", { id: toastId });
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table text-black">
        <thead className="text-lg font-semibold text-black">
          <tr className="">
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Point</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((item: TUser) => (
            <tr key={item.id} className="text-black">
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="secondary"
                      size="md"
                      src={item.image as string}
                    />
                  </div>
                  <div>
                    <div className="font-bold  hover:underline hover:text-red-500">
                      {item.user.first_name} {item.user.last_name}
                    </div>

                    <div className="text-sm opacity-70 italic">
                      @{item.user.username}
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-medium">{item.user.email}</td>
              <td>{item.phone}</td>
              <td
                className={`text-medium ${
                  item.role === "Admin" ? "text-red-500" : "text-green-500"
                }`}
              >
                {item.role}
              </td>
              <td>{item.reward_point}</td>
              <td className="flex items-center justify-center gap-1">
                {item.role === "User" ? (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => makeAdmin(item.id)}
                      title="Delete"
                      className="hover:text-navPrimary btn bg-green-500 btn-sm text-white"
                    >
                      Make Admin
                    </button>{" "}
                    <button
                      onClick={() => handleDelete(item.id)}
                      title="Delete"
                      className="hover:text-navPrimary btn bg-red-500 btn-sm text-white"
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
              </td>
            </tr>
          ))}

          {!allUsers.length && (
            <tr>
              <td colSpan={10} className="text-center text-xl font-bold">
                No User found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUser;

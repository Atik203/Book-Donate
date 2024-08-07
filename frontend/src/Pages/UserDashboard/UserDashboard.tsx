import ChangePasswordModal from "../../components/ChangePasswordModal/ChangePasswordModal";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

const UserDashboard = () => {
  const user = useAppSelector((state: RootState) => state.user.user);

  if (!user) return <div>Loading...</div>;

  return (
    <div className=" bg-gray-200 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded-full border-4 border-indigo-500"
            src={user.image as string}
            alt={`${user.first_name} ${user.last_name}`}
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-gray-700">@{user.username}</p>
          <p className="mt-2 text-gray-700">{user.email}</p>
          <p className="mt-2 text-gray-700">{user.phone}</p>
          <div className="mt-4 flex items-center justify-center gap-5">
            <ChangePasswordModal />
            <div title="Edit">
              <EditProfileModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

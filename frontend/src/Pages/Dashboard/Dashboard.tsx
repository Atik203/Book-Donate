import MainLayout from "../../components/layout/MainLayout";
import PrivateRouteProvider from "../../routes/PrivateRouteProvider";

const Dashboard = () => {
  return (
    <div>
      <PrivateRouteProvider>
        <MainLayout />
      </PrivateRouteProvider>
    </div>
  );
};

export default Dashboard;

import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const PrivateRouteProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.user.user);

  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace={true}
        state={{
          from: location.pathname + location.search,
        }}
      />
    );
  }

  return <>{children}</>;
};

export default PrivateRouteProvider;

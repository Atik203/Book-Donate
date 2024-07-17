import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface PrivateRouteProviderProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const PrivateRouteProvider = ({
  children,
  requiredRoles,
}: PrivateRouteProviderProps) => {
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

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return (
      <Navigate
        to="/"
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

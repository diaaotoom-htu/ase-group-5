import { Navigate, useLocation } from "react-router-dom";
import UseToken from "./UseToken";

export default function PrivateRoute(props: { children: React.ReactNode }) {
  const { children } = props;
  const { token } = UseToken();
  const location = useLocation();

  return token ? (
    <>{children}</>
  ) : (
    <Navigate
      replace={true}
      to="/login"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  );
}

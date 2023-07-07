import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  return props.tokenCheck() ? (
    <Component {...props} />
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export default ProtectedRouteElement;

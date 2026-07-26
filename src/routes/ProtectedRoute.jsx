import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  return token ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

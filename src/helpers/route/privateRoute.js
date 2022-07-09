import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";

export default function PrivateRoute(props) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const dataUser = useSelector((state) => state.user.data);
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    const decoded = jwt_decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.clear();
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }
  if (props.isAdmin && dataUser[0].role !== "admin") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
PrivateRoute.propTypes = {
  isAdmin: PropTypes.bool,
};

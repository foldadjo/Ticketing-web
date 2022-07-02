import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export default function PublicRoute(props) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  // restricted true = untuk halaman auth yang dimana jika user sudah login tidak bsa mengakses halaman auth
  // restricted false = untuk halaman yang sifatnya benar2 public
  if (token && props.restricted) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

PublicRoute.propTypes = {
  restricted: PropTypes.bool,
};

import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading";
import Forbidden from "../components/Forbidden";

const RiderRoute = ({ children }) => {
  const {user, loading } = useAuth();
  const [role, roleLoading] = useRole();

  if (loading || !user || roleLoading) {
    return <Loading />;
  }

  if (role !== "rider") {
    return <Forbidden />;
  }
  return children;
};

export default RiderRoute;

import {React, useContext} from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    console.log("user is not logged in");
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
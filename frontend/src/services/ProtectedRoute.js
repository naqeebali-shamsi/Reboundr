import {React, useContext} from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { token } = useContext(AuthContext);
  if (!token) {
    console.log("user is not logged in");
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
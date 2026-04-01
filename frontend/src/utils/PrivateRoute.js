import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
      const token = localStorage.getItem("token");

      console.log("PRIVATE ROUTE TOKEN:", token);

      return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
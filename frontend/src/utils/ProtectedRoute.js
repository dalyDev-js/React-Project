import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const token = useSelector((state) => state.token.token);
  const storedToken = token || localStorage.getItem("token");

  if (!storedToken) {
    return <Navigate to="/signin" />;
  }

  try {
    const decoded = jwtDecode(storedToken);
    const role = decoded.role;
    console.log(role);

    if (role === "user") {
      return <Navigate to="/err" />;
    }

    return <Outlet />;
  } catch (error) {
    return <Navigate to="/signin" />;
  }
}

export default ProtectedRoute;

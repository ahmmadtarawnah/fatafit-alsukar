import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("adminToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ممكن نضيف خطوة: decode token and check expiry (لو حابب)
  return children;
};

export default ProtectedRoute;

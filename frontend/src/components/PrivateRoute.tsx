import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>Cargando...</p>;

  if (!token) {
    // redirige al home si no hay token
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

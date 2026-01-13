import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { token, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/">Posts</Link>
        {token && <Link to="/create-post">Crear Post</Link>}
      </div>
      <div className="flex gap-4">
        {token ? (
          <>
            <Link to="/profile">Perfil</Link>
            <button onClick={logout} className="bg-red-500 px-2 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
};


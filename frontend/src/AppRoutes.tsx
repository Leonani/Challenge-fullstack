import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { Posts } from "./pages/Posts";
import { PostDetail } from "./pages/PostDetail";
import { CreatePost } from "./pages/CreatePost";
import { useAuth } from "./context/AuthContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<Posts />} />
      <Route path="/posts/:id" element={<PostDetail />} />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/create-post"
        element={
          <PrivateRoute>
            <CreatePost />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<p>Página no encontrada</p>} />
    </Routes>
  );
};


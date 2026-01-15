import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { PrivateRoute } from "./components/PrivateRoute";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Posts } from "./pages/Posts";
// import { PostDetail } from "./pages/PostDetail";
import { Profile } from "./pages/Profile";
import { CreatePost } from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* 🌍 LAYOUT GLOBAL */}
      <Route element={<MainLayout />}>
        {/* Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Posts />} />
        
        <Route path="/posts/edit/:id" element={
          <PrivateRoute>
            <EditPost />
          </PrivateRoute>
        } />

        {/* Privadas */}
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

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

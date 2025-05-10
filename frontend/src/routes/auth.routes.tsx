import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "@/contexts/auth.context";
import { Login } from "@/pages/login/login";
import { Register } from "@/pages/register/register";

export const AuthRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
};

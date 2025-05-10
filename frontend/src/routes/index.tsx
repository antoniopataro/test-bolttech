import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "@/contexts/auth.context";

import { AuthRoutes } from "./auth.routes";
import { ProtectedRoutes } from "./protected.routes";

export const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ? (
          <Route path="*" element={<AuthRoutes />} />
        ) : (
          <Route path="*" element={<ProtectedRoutes />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

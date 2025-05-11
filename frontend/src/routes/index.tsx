import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useUser } from "@/contexts/user.context";

import { AuthRoutes } from "./auth.routes";
import { ProtectedRoutes } from "./protected.routes";

export const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useUser();

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

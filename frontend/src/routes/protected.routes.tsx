import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "@/contexts/auth.context";
import { Booking } from "@/pages/booking/booking";
import { Home } from "@/pages/home/home";
import { Search } from "@/pages/search/search";
import { AppLayout } from "@/ui/layouts/app-layout";
import { SearchLayout } from "@/ui/layouts/search-layout";

export const ProtectedRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate replace to="/login" />;
  }

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchLayout />}>
          <Route path=":searchId" element={<Search />} />
          <Route path=":searchId/book/:offerId" element={<Booking />} />
        </Route>
      </Route>
    </Routes>
  );
};

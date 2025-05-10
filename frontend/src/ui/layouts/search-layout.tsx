import type { PropsWithChildren } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

import { SearchProvider } from "@/contexts/search.context";

export const SearchLayout: React.FC<PropsWithChildren> = () => {
  const { searchId } = useParams();

  if (!searchId) {
    return <Navigate to="/" />;
  }

  return (
    <SearchProvider searchId={searchId}>
      <Outlet />
    </SearchProvider>
  );
};

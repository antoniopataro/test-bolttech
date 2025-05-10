import { useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/auth.context";

import { Icon } from "../components/icon/icon";

import { components } from "./app-layout.styles";

export const AppLayout: React.FC = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = useCallback(async () => {
    await logout();

    navigate("/login");
  }, [logout, navigate]);

  return (
    <components.root>
      <components.top.root>
        <components.top.logout onClick={handleLogout}>
          <Icon use="arrow-left-start-on-rectangle" />
        </components.top.logout>
        <components.top.link to="/">
          <components.top.title>carental</components.top.title>
        </components.top.link>
      </components.top.root>
      <components.outlet.box>
        <Outlet />
      </components.outlet.box>
    </components.root>
  );
};

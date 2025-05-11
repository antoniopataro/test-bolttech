import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";

import { theme } from "@/ui/styles/theme";

import { UserProvider } from "./contexts/user.context";
import { AppRoutes } from "./routes";
import { Toaster } from "./ui/components/toaster/toaster";

import "@/ui/styles/index.css";

import "react-loading-skeleton/dist/skeleton.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <Toaster />
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  </ThemeProvider>,
);

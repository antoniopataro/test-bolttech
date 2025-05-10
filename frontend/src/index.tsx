import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";

import { theme } from "@/ui/styles/theme";

import { AuthProvider } from "./contexts/auth.context";
import { AppRoutes } from "./routes";

import "@/ui/styles/index.css";

import "react-loading-skeleton/dist/skeleton.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </ThemeProvider>,
);

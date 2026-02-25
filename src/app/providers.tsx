import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { AuthProvider } from "../features/auth/AuthContext";
import { ThemeProvider } from "../components/shared/ThemeContext";
import { ToastProvider } from "../components/ui/ToastProvider";

export const AppProviders: React.FC = () => (
  <ThemeProvider>
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  </ThemeProvider>
);


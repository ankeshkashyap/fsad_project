import { useContext } from "react";
import { ThemeContext } from "../components/shared/ThemeContext";

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
};


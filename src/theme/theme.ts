import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#9c27b0",
          },
          background: {
            default: "#f5f5f5",
            paper: "#ffffff",
          },
        }
      : {
          primary: {
            main: "#90caf9",
          },
          secondary: {
            main: "#ce93d8",
          },
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
        }),
  },
});

export const getTheme = (mode: PaletteMode) =>
  createTheme(getDesignTokens(mode));

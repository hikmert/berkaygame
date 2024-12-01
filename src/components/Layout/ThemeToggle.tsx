import { IconButton } from "@mui/material";
import { Sun, Moon } from "lucide-react";
import { useThemeContext } from "../../context/ThemeContext";

export const ThemeToggle = () => {
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <IconButton color="inherit" onClick={toggleColorMode}>
      {mode === "dark" ? <Sun /> : <Moon />}
    </IconButton>
  );
};

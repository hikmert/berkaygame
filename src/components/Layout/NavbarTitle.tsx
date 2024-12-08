import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export const NavbarTitle = () => {
  const location = useLocation();
  const currentPath = getHumanReadablePath(location.pathname);

  function getHumanReadablePath(path: string) {
    if (path === "/") return "Home";
    if (path === "/about") return "About";
    return "Unknown";
  }
  return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      Berkay Game: {currentPath}
    </Typography>
  );
};

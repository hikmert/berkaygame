import { Drawer, List } from "@mui/material";
import { Home, Info, Play, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SidebarItem } from "./SidebarItem";
interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const menuItems = [
  { text: "Home", Icon: Home, path: "/" },
  { text: "About", Icon: Info, path: "/about" },
  { text: "Playground", Icon: Play, path: "/playground" },
  { text: "User Profile", Icon: User, path: "/userProfile" },
];
export const Sidebar = ({ open, onClose }: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.text}
            text={item.text}
            icon={item.Icon}
            onClick={() => {
              navigate(item.path);
              onClose();
            }}
          />
        ))}
      </List>
    </Drawer>
  );
};

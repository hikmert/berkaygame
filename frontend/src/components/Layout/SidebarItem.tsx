import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  text: string;
  icon: LucideIcon;
  onClick: () => void;
}

export const SidebarItem = ({ text, icon: Icon, onClick }: SidebarItemProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};
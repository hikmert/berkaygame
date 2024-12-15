import { IconButton } from '@mui/material';
import { Menu as MenuIcon } from 'lucide-react';

interface MenuButtonProps {
  onClick: () => void;
}

export const MenuButton = ({ onClick }: MenuButtonProps) => {
  
  
  return (
    <IconButton
      color="inherit"
      edge="start"
      onClick={onClick}
      sx={{ mr: 2 }}
    >
      
      <MenuIcon />
    </IconButton>
  );
};
import { AppBar, Toolbar, Box } from '@mui/material';
import { MenuButton } from './MenuButton';
import { NavbarTitle } from './NavbarTitle';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  toggleDrawer: () => void;
}

export const Navbar = ({ toggleDrawer }: NavbarProps) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <MenuButton onClick={toggleDrawer} />
        <NavbarTitle />
        <Box>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
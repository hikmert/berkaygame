import { Typography } from '@mui/material';
import { find, menuItems } from './Sidebar';
import { useState } from 'react';

export function RoutePath(index:number)
{
 return menuItems[index].text;
}

export const NavbarTitle = () => {


  return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      My App:{find}
    </Typography>
  );
};
import { Typography, Paper, Box } from '@mui/material';

export const About = () => {
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          This is the about page where you can learn more about our application.
          It showcases different MUI components and styling capabilities.
        </Typography>
      </Box>
    </Paper>
  );
};
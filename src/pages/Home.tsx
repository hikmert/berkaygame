import { Typography, Paper, Box } from '@mui/material';

export const Home = () => {
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome Home
        </Typography>
        <Typography variant="body1" paragraph>
          This is the home page of our application. It demonstrates the use of MUI components
          with a responsive layout and theme switching capabilities.
        </Typography>
      </Box>
    </Paper>
  );
};
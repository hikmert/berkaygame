import { Paper, Typography, Box } from "@mui/material";
import {} from "lucide-react";
import User from "./User";

export const UserProfile = () => {
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User
        </Typography>
        <User />
      </Box>
    </Paper>
  );
};

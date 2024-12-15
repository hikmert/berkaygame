import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from "@mui/material";
import { Star } from "lucide-react";
import { Score } from "./Playground";

interface ScoreBoardProps {
  scores: Score[];
}
export const ScoreBoard = ({ scores }: ScoreBoardProps) => {
  const sortedScores = scores.sort((a, b) => b.score - a.score);

  return (
    <Paper
      elevation={4}
      sx={{ p: 4, borderRadius: 2, backgroundColor: "whitesmoke" }}
    >
      <Box sx={{ maxWidth: 600, mx: "auto", textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          ScoreBoard
        </Typography>
        <List>
          {sortedScores.map((score, index) => (
            <Box key={score.id}>
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: index === 0 ? "gold" : "white",
                  borderRadius: 1,
                  mb: 1,
                  boxShadow: 1,
                  px: 2,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="medium"
                  color="text.secondary"
                >
                  {index + 1}.
                </Typography>
                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ textAlign: "center" }}
                    >
                      {score.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "center" }}
                    >
                      {score.score} points
                    </Typography>
                  }
                />
                <ListItemAvatar
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 && <Star color="orange" size={28} />}
                </ListItemAvatar>
              </ListItem>
              {index < sortedScores.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

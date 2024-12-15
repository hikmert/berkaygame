import { Paper, Typography, Box, Button, Grid, Stack } from "@mui/material";
import React from "react";
import { AxisController } from "./AxisController";
import { ScoreBoard } from "./ScoreBoard";

enum Direction {
  UP = "UP",
  DOWN = "DOWN",
}

enum Axis {
  X = "X",
  Y = "Y",
}

export interface Score {
  id: number;
  name: string;
  score: number;
}

export const Playground = () => {
  const [xCount, setxCount] = React.useState(0);
  const [yCount, setyCount] = React.useState(0);
  const [scores, setScores] = React.useState<Score[]>([
    { id: 1, name: "Berkay", score: 65 },
    { id: 2, name: "John", score: 20 },
    { id: 3, name: "Jane", score: 80 },
    { id: 4, name: "Doe", score: 82 },
    { id: 5, name: "Alice", score: 60 },
  ]);

  const handleCount = (direction: Direction, axis: Axis) => {
    if (axis === Axis.X) {
      setxCount((prev) => (direction === Direction.UP ? prev + 1 : prev - 1));
    } else {
      setyCount((prev) => (direction === Direction.UP ? prev + 1 : prev - 1));
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      {/* Intro Section */}
      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto", mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Playground
        </Typography>
        <Typography variant="body1" paragraph>
          This is the playground page where you can experiment with different
          MUI components and styling capabilities.
        </Typography>
      </Paper>

      {/* Controls Section */}
      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto", mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" component="h2" gutterBottom>
              X-AXIS: {xCount.toFixed(2)}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={() => handleCount(Direction.DOWN, Axis.X)}
              >
                -1
              </Button>
              <Button
                variant="contained"
                onClick={() => handleCount(Direction.UP, Axis.X)}
              >
                +1
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h5" component="h2" gutterBottom>
              Y-AXIS: {yCount.toFixed(2)}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={() => handleCount(Direction.DOWN, Axis.Y)}
              >
                -1
              </Button>
              <Button
                variant="contained"
                onClick={() => handleCount(Direction.UP, Axis.Y)}
              >
                +1
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Chart Section */}
      <Box sx={{ maxWidth: 800, mx: "auto", mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Chart
        </Typography>
        <AxisController
          xValue={xCount}
          yValue={yCount}
          setX={setxCount}
          setY={setyCount}
          setScores={setScores}
        />
      </Box>

      {/* ScoreBoard Section */}
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <ScoreBoard scores={scores} />
      </Box>
    </Box>
  );
};

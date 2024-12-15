import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, Typography } from "@mui/material";

interface Invader {
  x: number;
  y: number;
  alive: boolean;
}

interface Player {
  x: number;
}

interface Missile {
  x: number;
  y: number;
}

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const INVADER_SIZE = 20;
const PLAYER_SIZE = 30;
const MISSILE_SIZE = 5;
const INVADER_ROWS = 5;
const INVADER_COLS = 10;
const INVADER_SPEED = 2; // Adjust invader speed here
const MISSILE_SPEED = 5;

const SpaceInvaders: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [invaders, setInvaders] = useState<Invader[]>([]);
  const [player, setPlayer] = useState<Player>({
    x: CANVAS_WIDTH / 2 - PLAYER_SIZE / 2,
  });
  const [missiles, setMissiles] = useState<Missile[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [invaderDirection, setInvaderDirection] = useState(1); // 1 for right, -1 for left

  useEffect(() => {
    // Initialize invaders
    const initialInvaders: Invader[] = [];
    for (let row = 0; row < INVADER_ROWS; row++) {
      for (let col = 0; col < INVADER_COLS; col++) {
        initialInvaders.push({
          x: col * (INVADER_SIZE + 10) + 50,
          y: row * (INVADER_SIZE + 10) + 50,
          alive: true,
        });
      }
    }
    setInvaders(initialInvaders);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameOver) return;

      if (event.key === "ArrowLeft" && player.x > 0) {
        setPlayer({ x: player.x - 10 });
      } else if (
        event.key === "ArrowRight" &&
        player.x < CANVAS_WIDTH - PLAYER_SIZE
      ) {
        setPlayer({ x: player.x + 10 });
      } else if (event.key === " ") {
        // Fire missile
        setMissiles([
          ...missiles,
          {
            x: player.x + PLAYER_SIZE / 2,
            y: CANVAS_HEIGHT - PLAYER_SIZE - MISSILE_SIZE,
          },
        ]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const gameLoop = () => {
      if (gameOver) return;

      // Move invaders
      const newInvaders = invaders.map((invader) => {
        if (!invader.alive) return invader;
        const newX = invader.x + invaderDirection * INVADER_SPEED;

        //check for edge collisions and move down
        if (newX < 0 || newX > CANVAS_WIDTH - INVADER_SIZE) {
          setInvaderDirection(invaderDirection * -1);
          return { ...invader, x: invader.x, y: invader.y + 10 };
        }

        return { ...invader, x: newX };
      });

      setInvaders(newInvaders);

      // Move missiles
      const newMissiles = missiles.map((missile) => ({
        ...missile,
        y: missile.y - MISSILE_SPEED,
      }));
      setMissiles(newMissiles.filter((missile) => missile.y > 0));

      // Check for collisions
      newMissiles.forEach((missile) => {
        newInvaders.forEach((invader, invaderIndex) => {
          if (!invader.alive) return;

          if (
            missile.x < invader.x + INVADER_SIZE &&
            missile.x + MISSILE_SIZE > invader.x &&
            missile.y < invader.y + INVADER_SIZE &&
            missile.y + MISSILE_SIZE > invader.y
          ) {
            // Collision detected
            const updatedInvaders = [...newInvaders];
            updatedInvaders[invaderIndex].alive = false;
            setInvaders(updatedInvaders);

            setMissiles(newMissiles.filter((m) => m !== missile));
            setScore(score + 10);
          }
        });
      });

      // Check for game over (invaders reaching the bottom)
      for (let i = 0; i < newInvaders.length; i++) {
        if (newInvaders[i].y + INVADER_SIZE > CANVAS_HEIGHT - PLAYER_SIZE) {
          setGameOver(true);
          break;
        }
      }
    };

    const intervalId = setInterval(gameLoop, 30);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(intervalId);
    };
  }, [gameOver, score, invaderDirection]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw invaders
        invaders.forEach((invader) => {
          if (invader.alive) {
            ctx.fillRect(invader.x, invader.y, INVADER_SIZE, INVADER_SIZE);
          }
        });
        // Draw player
        ctx.fillRect(
          player.x,
          CANVAS_HEIGHT - PLAYER_SIZE,
          PLAYER_SIZE,
          PLAYER_SIZE
        );

        // Draw missiles
        missiles.forEach((missile) => {
          ctx.fillRect(missile.x, missile.y, MISSILE_SIZE, MISSILE_SIZE);
        });
      }
    }
  }, [invaders, player, missiles]);

  return (
    <Grid
      container
      justifyContent="center"
      direction="column"
      alignItems="center"
    >
      <Box width={CANVAS_WIDTH} height={CANVAS_HEIGHT} border="1px solid black">
        <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
      </Box>
      <Typography variant="h6">Score: {score}</Typography>

      {gameOver && <Typography variant="h4">Game Over</Typography>}
    </Grid>
  );
};

export default SpaceInvaders;

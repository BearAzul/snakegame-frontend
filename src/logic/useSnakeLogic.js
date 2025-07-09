import { useState, useEffect, useCallback } from "react";
import { useScoreStore } from "../store/useScoreStore";

export const GRID_SIZE = 20;
export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const INITIAL_SPEED = 400;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];

const generateFoodPosition = (snake) => {
  let newFoodPosition;
  do {
    newFoodPosition = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (
    snake.some(
      (segment) =>
        segment.x === newFoodPosition.x && segment.y === newFoodPosition.y
    )
  );
  return newFoodPosition;
};

export const useSnakeLogic = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(() => generateFoodPosition(INITIAL_SNAKE));
  const [direction, setDirection] = useState(DIRECTIONS.UP);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isPaused, setIsPaused] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const { postScore } = useScoreStore();

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFoodPosition(INITIAL_SNAKE));
    setDirection(DIRECTIONS.UP);
    setSpeed(INITIAL_SPEED);
    setIsGameOver(false);
    setScore(0);
    setIsPaused(true);
  }, []);

  const handleGameOver = () => {
    setIsGameOver(true);
    postScore(score);
  };

  useEffect(() => {
    if (isPaused || isGameOver) {
      return;
    }

    const gameInterval = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        head.x += direction.x;
        head.y += direction.y;

        if (
          head.x < 0 ||
          head.x >= GRID_SIZE ||
          head.y < 0 ||
          head.y >= GRID_SIZE
        ) {
          handleGameOver();
          return prevSnake;
        }

        for (let i = 1; i < newSnake.length; i++) {
          if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
            handleGameOver();
            return prevSnake;
          }
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setScore((s) => s + 10);
          setFood(generateFoodPosition(newSnake));

          setSpeed((prevSpeed) => Math.max(50, prevSpeed - 5));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(gameInterval);
  }, [snake, food, speed, isPaused, isGameOver, score, direction]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      let newDirection;
      switch (e.key) {
        case "ArrowUp":
          newDirection = DIRECTIONS.UP;
          break;
        case "ArrowDown":
          newDirection = DIRECTIONS.DOWN;
          break;
        case "ArrowLeft":
          newDirection = DIRECTIONS.LEFT;
          break;
        case "ArrowRight":
          newDirection = DIRECTIONS.RIGHT;
          break;
        default:
          return;
      }

      if (
        direction.x + newDirection.x !== 0 ||
        direction.y + newDirection.y !== 0
      ) {
        setDirection(newDirection);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  const handleDirectionChange = useCallback(
    (newDirection) => {
      if (
        direction.x + newDirection.x !== 0 ||
        direction.y + newDirection.y !== 0
      ) {
        setDirection(newDirection);
      }
    },
    [direction]
  );

  const togglePause = () => {
    if (isGameOver) return;
    setIsPaused((prev) => !prev);
  };

  return {
    snake,
    food,
    score,
    isGameOver,
    isPaused,
    handleDirectionChange,
    togglePause,
    resetGame,
  };
};

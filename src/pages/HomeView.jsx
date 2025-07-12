import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  CirclePause,
  CirclePlay,
  RotateCw,
  LoaderCircle
} from "lucide-react";
import { useSnakeLogic, GRID_SIZE, DIRECTIONS } from "../logic/useSnakeLogic.js";
import { useScoreStore } from "../store/useScoreStore.js";
import { useEffect } from "react";
import Gameboard from "../components/Gameboard.jsx";


const HomeView = () => {
  const { isPostingScore, getBestScore, bestScore, isBestScoreLoading } = useScoreStore();

  useEffect(() => {
    getBestScore();
  }, [getBestScore]);

  const {
    snake, food, score, isGameOver, isPaused,
    handleDirectionChange, togglePause, resetGame,
  } = useSnakeLogic(); 

  if (isBestScoreLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-base-300">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <section className="h-screen p-6 pt-22 lg:pt-18 2xl:pt-22 bg-base-300">
      <div className="container mx-auto max-w-md">
        <div className="flex items-center justify-between px-1">
          <h1 className="font-medium">Score: {score}</h1>
          <h1 className="font-medium">Best Scores: {bestScore}</h1>
        </div>
        <div className="flex flex-col items-center gap-3 mt-2">
          <div className="bg-base-200 w-full aspect-square">
            <Gameboard
              snake={snake}
              food={food}
              GRID_SIZE={GRID_SIZE}
              isGameOver={isGameOver}
            />
          </div>
          {isGameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-base-100 bg-opacity-70 rounded-lg">
              <h2 className="text-4xl font-extrabold text-red-500">GAME OVER</h2>
              <button onClick={resetGame} className="btn btn-primary mt-4" disabled={isPostingScore}>
                {isPostingScore ?
                  (
                    "Mengirim..."
                  ) :
                  (
                    <>
                      <RotateCw />
                      Mulai Lagi
                    </>
                  )
                }
              </button>
            </div>
          )}
          <div className="grid grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-2 w-full">
            <button className={`btn btn-sm ${isPaused ? "bg-green-600" : "bg-error"} col-span-4 lg:col-span-1`} onClick={togglePause}>
              {isPaused ? <CirclePlay /> : <CirclePause />}
              {isPaused ? "START" : "PAUSE"}
            </button>

            <button type="button" className="btn btn-sm btn-neutral" onClick={() => handleDirectionChange(DIRECTIONS.LEFT)}>
              <ArrowLeft className="h-6 w-6 text-accent" />
            </button>

            <button type="button" className="btn btn-sm btn-neutral" onClick={() => handleDirectionChange(DIRECTIONS.UP)}>
              <ArrowUp className="h-6 w-6 text-accent" />
            </button>

            <button type="button" className="btn btn-sm btn-neutral" onClick={() => handleDirectionChange(DIRECTIONS.DOWN)}>
              <ArrowDown className="h-6 w-6 text-accent" />
            </button>

            <button type="button" className="btn btn-sm btn-neutral" onClick={() => handleDirectionChange(DIRECTIONS.RIGHT)}>
              <ArrowRight className="h-6 w-6 text-accent" />
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HomeView;
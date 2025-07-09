import React from 'react';

const GameBoard = ({ snake, food, GRID_SIZE, isGameOver }) => {
  return (
    <div className={`w-full h-full bg-neutral-900 rounded-lg relative ${isGameOver ? 'opacity-50' : ''}`}>
      {snake.map((segment, index) => (
        <div
          key={index}
          className={`absolute ${index === 0 ? "bg-green-400" : "bg-green-600"} rounded-sm`}
          style={{
            left: `${segment.x * (100 / GRID_SIZE)}%`,
            top: `${segment.y * (100 / GRID_SIZE)}%`,
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
          }}
        />
      ))}
      {/* Render Makanan */}
      <div
        className="absolute bg-red-500 rounded-full"
        style={{
          left: `${food.x * (100 / GRID_SIZE)}%`,
          top: `${food.y * (100 / GRID_SIZE)}%`,
          width: `${100 / GRID_SIZE}%`,
          height: `${100 / GRID_SIZE}%`,
        }}
      />
    </div>
  );
};

export default React.memo(GameBoard); 
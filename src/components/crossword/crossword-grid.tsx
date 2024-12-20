"use client";

import { cn } from "@/lib/utils";
import { Clue, Direction } from "@/services/crossword";
import { Input } from "@/components/ui/input";
import { CellPosition } from "@/app/crossword/play/page";

interface CrosswordGridProps {
  grid: string[][];
  selectedCell: { row: number; col: number } | null;
  onCellClick: (cell: { row: number; col: number }) => void;
  clues: Clue[];
  isWordStart: (
    row: number,
    col: number,
    direction: Direction,
    clues: Clue[]
  ) => Clue | null;
  highlightedCells: CellPosition[];
  setGrid: (newGrid: string[][]) => void;
}

const CrosswordGrid = ({
  grid,
  selectedCell,
  onCellClick,
  clues,
  isWordStart,
  highlightedCells,
  setGrid
}: CrosswordGridProps) => {
  return (
    <div className="grid grid-cols-10 max-w-4xl mx-auto mb-6 border-4 border-black">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isSelected =
            selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
          const isBlackCell = cell === "-";
          const isEmpty = cell === "";
          const isHighlighted = highlightedCells.some(
            highlighted =>
              highlighted.row === rowIndex && highlighted.col === colIndex
          );
          const isStartOfWordHorizontal = isWordStart(
            rowIndex,
            colIndex,
            "horizontal",
            clues
          );
          const isStartOfWordVertical = isWordStart(
            rowIndex,
            colIndex,
            "vertical",
            clues
          );

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={cn(
                "w-16 h-16 flex items-center justify-center text-xl font-semibold border-2 border-black relative",
                isSelected
                  ? "bg-[#FA9B03] text-white"
                  : isHighlighted
                    ? "bg-gray-300"
                    : "bg-white",
                isBlackCell
                  ? "bg-black cursor-default"
                  : isEmpty
                    ? "cursor-pointer"
                    : "bg-gray-300"
              )}
              onClick={() =>
                !isBlackCell &&
                isEmpty &&
                onCellClick({ row: rowIndex, col: colIndex })
              }
            >
              {cell !== "-" && (
                <Input
                  value={cell}
                  onChange={e => {
                    onCellClick({ row: rowIndex, col: colIndex });
                    const newValue = e.target.value.slice(-1).toUpperCase();
                    if (/^[A-Z]$/.test(newValue)) {
                      const newGrid = [...grid];
                      newGrid[rowIndex][colIndex] = newValue;
                      setGrid(newGrid);
                    }
                  }}
                  className="w-full h-full text-center text-2xl font-semibold bg-transparent rounded-none"
                />
              )}
              {(isStartOfWordHorizontal || isStartOfWordVertical) &&
                !isBlackCell && (
                  <span className="text-xs absolute top-0 left-0 mt-1 ml-1">
                    {
                      clues.find(
                        clue => clue.row === rowIndex && clue.col === colIndex
                      )?.index
                    }
                  </span>
                )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default CrosswordGrid;

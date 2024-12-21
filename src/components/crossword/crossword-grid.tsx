"use client";

import { cn } from "@/lib/utils";
import { Clue } from "@/services/crossword";
import { Input } from "@/components/ui/input";
import { Cell, CellPosition } from "@/app/crossword/play/page";

interface CrosswordGridProps {
  grid: Cell[][];
  selectedCell: CellPosition | null;
  onCellClick: (cell: CellPosition) => void;
  clues: Clue[];
  selectedClue: Clue | null; // Pass the selected clue directly
  setGrid: (newGrid: Cell[][]) => void;
}

const CrosswordGrid = ({
  grid,
  selectedCell,
  onCellClick,
  clues,
  selectedClue,
  setGrid
}: CrosswordGridProps) => {
  return (
    <div className="grid grid-cols-10 max-w-4xl mx-auto mb-6 border-4 border-black">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isSelected =
            selectedCell?.row === rowIndex && selectedCell?.col === colIndex;

          const isHighlighted =
            selectedClue &&
            ((selectedClue.direction === "horizontal" &&
              selectedClue.row === rowIndex &&
              selectedClue.col <= colIndex &&
              colIndex < selectedClue.col + selectedClue.length) ||
              (selectedClue.direction === "vertical" &&
                selectedClue.col === colIndex &&
                selectedClue.row <= rowIndex &&
                rowIndex < selectedClue.row + selectedClue.length));

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={cn(
                "w-16 h-16 flex items-center justify-center text-xl font-semibold border-2 border-black relative",
                cell.isBlack
                  ? "bg-black cursor-default"
                  : isSelected
                    ? "bg-[#FA9B03] text-white"
                    : isHighlighted
                      ? "bg-yellow-200"
                      : cell.value !== ""
                        ? "bg-gray-200"
                        : "bg-white"
              )}
              onClick={() =>
                !cell.isBlack && onCellClick({ row: rowIndex, col: colIndex })
              }
            >
              {!cell.isBlack && (
                <Input
                  value={cell.value}
                  onChange={e => {
                    const newValue = e.target.value.slice(-1).toUpperCase();
                    if (/^[A-Z]$/.test(newValue)) {
                      const newGrid = grid.map(r => r.map(c => ({ ...c })));
                      newGrid[rowIndex][colIndex].value = newValue;
                      setGrid(newGrid);
                    }
                  }}
                  className="w-full h-full text-center text-2xl font-semibold bg-transparent rounded-none"
                />
              )}
              {!cell.isBlack && (
                <span className="text-xs absolute top-0 left-0 mt-1 ml-1">
                  {clues
                    .filter(
                      clue => clue.row === rowIndex && clue.col === colIndex
                    )
                    .map(clue => clue.index)
                    .join(", ")}
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

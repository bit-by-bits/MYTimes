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
  selectedClue: Clue | null;
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
  const isSelectedCell = (rowIndex: number, colIndex: number) =>
    selectedCell?.row === rowIndex && selectedCell?.col === colIndex;

  const isHighlightedCell = (rowIndex: number, colIndex: number) => {
    if (!selectedClue) return false;
    const { direction, row, col, length } = selectedClue;
    return direction === "horizontal"
      ? row === rowIndex && col <= colIndex && colIndex < col + length
      : direction === "vertical" &&
          col === colIndex &&
          row <= rowIndex &&
          rowIndex < row + length;
  };

  const handleCellClick = (
    rowIndex: number,
    colIndex: number,
    isBlack: boolean
  ) => {
    if (!isBlack) {
      onCellClick({ row: rowIndex, col: colIndex });
    }
  };

  const handleInputChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const newValue = value.slice(-1).toUpperCase();
    if (/^[A-Z]$/.test(newValue)) {
      const newGrid = grid.map(r => r.map(c => ({ ...c })));
      newGrid[rowIndex][colIndex].value = newValue;
      setGrid(newGrid);
    }
  };

  return (
    <div className="grid grid-cols-10 max-w-4xl mx-auto mb-6 border-4 border-black">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isSelected = isSelectedCell(rowIndex, colIndex);
          const isHighlighted = isHighlightedCell(rowIndex, colIndex);

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
                      ? "bg-[#D6B235]"
                      : cell.value !== ""
                        ? "bg-gray-200"
                        : "bg-white"
              )}
              onClick={() => handleCellClick(rowIndex, colIndex, cell.isBlack)}
            >
              {!cell.isBlack && (
                <Input
                  value={cell.value}
                  onChange={e =>
                    handleInputChange(rowIndex, colIndex, e.target.value)
                  }
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

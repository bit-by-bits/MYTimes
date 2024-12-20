import { Cell, CellPosition } from "@/app/sudoku/play/page";
import { cn } from "@/lib/utils";

interface SudokuGridProps {
  grid: Cell[][];
  selectedCell: CellPosition | null;
  onCellClick: (cell: CellPosition) => void;
}

const SudokuGrid = ({ grid, selectedCell, onCellClick }: SudokuGridProps) => (
  <div className="grid grid-cols-9 max-w-4xl mx-auto mb-6 border-4 border-black">
    {grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const isSelected =
          selectedCell?.row === rowIndex && selectedCell?.col === colIndex;

        return (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={cn(
              "w-16 h-16 flex items-center justify-center text-2xl font-semibold border border-black",
              rowIndex % 3 === 0 && "border-t-4",
              colIndex % 3 === 0 && "border-l-4",
              rowIndex % 3 === 2 && "border-b-4",
              colIndex % 3 === 2 && "border-r-4",
              isSelected ? "bg-[#FA9B03] text-white" : cell.color,
              !cell.prefilled && "cursor-pointer"
            )}
            onClick={() =>
              !cell.prefilled && onCellClick({ row: rowIndex, col: colIndex })
            }
          >
            {cell.value !== 0 ? cell.value : ""}
          </div>
        );
      })
    )}
  </div>
);

export default SudokuGrid;

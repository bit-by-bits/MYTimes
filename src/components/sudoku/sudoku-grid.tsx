import { Cell, CellPosition } from "@/app/sudoku/play/page";
import { cn } from "@/lib/utils";

interface SudokuGridProps {
  grid: Cell[][];
  selectedCell: CellPosition | null;
  onCellClick: (cell: CellPosition) => void;
}

const SudokuGrid = ({ grid, selectedCell, onCellClick }: SudokuGridProps) => {
  const isSelectedCell = (rowIndex: number, colIndex: number) =>
    selectedCell?.row === rowIndex && selectedCell?.col === colIndex;

  const isBorderCell = (rowIndex: number, colIndex: number) =>
    rowIndex % 3 === 0 ||
    colIndex % 3 === 0 ||
    rowIndex % 3 === 2 ||
    colIndex % 3 === 2;

  return (
    <div className="grid grid-cols-9 max-w-4xl mx-auto mb-6 border-4 border-black">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isSelected = isSelectedCell(rowIndex, colIndex);
          const isBorder = isBorderCell(rowIndex, colIndex);

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={cn(
                "w-16 h-16 flex items-center justify-center text-2xl font-semibold border border-black",
                isBorder && "border-4",
                isSelected ? "bg-[#FA9B03] text-white" : cell.color,
                !cell.prefilled && "cursor-pointer"
              )}
              onClick={() =>
                !cell.prefilled && onCellClick({ row: rowIndex, col: colIndex })
              }
            >
              {cell.value || ""}
            </div>
          );
        })
      )}
    </div>
  );
};

export default SudokuGrid;

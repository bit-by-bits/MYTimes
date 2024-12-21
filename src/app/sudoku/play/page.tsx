"use client";

import { useEffect, useState } from "react";
import Layout from "@/app/home/layout";
import { fetchSudokuPuzzle } from "@/services/sudoku";
import SudokuGrid from "@/components/sudoku/sudoku-grid";
import NumberPad from "@/components/sudoku/number-pad";
import Controls from "@/components/sudoku/controls";
import { cn } from "@/lib/utils";
import Loading from "@/components/home/loading";
import Error from "@/components/home/error";

export interface Cell {
  value: number;
  color: string;
  prefilled: boolean;
}

export interface CellPosition {
  row: number;
  col: number;
}

const Play = () => {
  const [sudokuGrid, setSudokuGrid] = useState<Cell[][]>([]);
  const [solutionGrid, setSolutionGrid] = useState<number[][]>([]);
  const [difficulty, setDifficulty] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
  const [time, setTime] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [hints, setHints] = useState<number>(3);

  const initializeCell = (value: number): Cell => ({
    value,
    color: value !== 0 ? "bg-gray-400" : "bg-white",
    prefilled: value !== 0
  });

  const renderDifficultyBadge = () => {
    const difficultyColor = getDifficultyColor(difficulty);
    return (
      <span
        className={cn("px-3 py-1 text-white rounded-full", difficultyColor)}
      >
        {difficulty}
      </span>
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "Easy") return "bg-green-500";
    if (difficulty === "Medium") return "bg-yellow-500";
    return "bg-red-500";
  };

  const loadSudokuData = async () => {
    setLoading(true);
    try {
      const { grid, solution, difficulty } = await fetchSudokuPuzzle();
      setSudokuGrid(grid.map((row: number[]) => row.map(initializeCell)));
      setSolutionGrid(solution);
      setDifficulty(difficulty);
    } catch {
      setError("Failed to load Sudoku data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSudokuData();
    const timer = setInterval(() => setTime(prev => prev + 1), 1000);
    return () => clearInterval(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateCell = (row: number, col: number, updates: Partial<Cell>) => {
    setSudokuGrid(prev => {
      const newGrid = [...prev];
      newGrid[row][col] = { ...newGrid[row][col], ...updates };
      return newGrid;
    });
  };

  const handleCellChange = (row: number, col: number, value: number) => {
    if (!sudokuGrid[row][col].prefilled) {
      updateCell(row, col, { value });
      setMoves(prev => prev + 1);
    }
  };

  const handleDelete = () => {
    if (
      selectedCell &&
      !sudokuGrid[selectedCell.row][selectedCell.col].prefilled
    ) {
      updateCell(selectedCell.row, selectedCell.col, { value: 0 });
      setMoves(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    const currentGrid = sudokuGrid.map(row => row.map(cell => cell.value));
    const result =
      JSON.stringify(currentGrid) === JSON.stringify(solutionGrid)
        ? "Congratulations! You solved the Sudoku."
        : "Incorrect solution. Keep trying!";
    alert(result);
  };

  const handleHint = () => {
    if (hints > 0) {
      const emptyCells: CellPosition[] = findEmptyCells();
      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      updateCell(randomCell.row, randomCell.col, {
        value: solutionGrid[randomCell.row][randomCell.col]
      });
      setHints(prev => prev - 1);
    }
  };

  const findEmptyCells = () => {
    const emptyCells: CellPosition[] = [];
    sudokuGrid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.value === 0) emptyCells.push({ row: rowIndex, col: colIndex });
      });
    });
    return emptyCells;
  };

  if (loading) return <Loading message="Please wait while sudoku loads..." />;
  if (error) return <Error title="Error" message={error} />;

  return (
    <Layout>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-semibold">Play Sudoku</h1>
        <div className="text-lg">{renderDifficultyBadge()}</div>
      </div>

      <div className="mb-4">
        <p className="text-md text-gray-600">
          <strong>Difficulty: </strong>
          {difficulty}
        </p>
        <p className="text-md text-gray-600">
          <strong>Time: </strong>
          {new Date(time * 1000).toISOString().substr(11, 8)}
        </p>
        <p className="text-md text-gray-600">
          <strong>Moves: </strong>
          {moves}
        </p>
        <p className="text-md text-gray-600">
          <strong>Hints Left: </strong>
          {hints}
        </p>
        <p className="text-md text-gray-600">
          <strong>Instructions:</strong> Fill in the grid so that each row,
          column, and 3x3 subgrid contains all digits from 1 to 9.
        </p>
      </div>

      <SudokuGrid
        grid={sudokuGrid}
        selectedCell={selectedCell}
        onCellClick={setSelectedCell}
      />

      <NumberPad
        onNumberClick={num =>
          selectedCell &&
          handleCellChange(selectedCell.row, selectedCell.col, num)
        }
        onDelete={handleDelete}
      />

      <Controls
        hintsLeft={hints > 0}
        onHint={handleHint}
        onReset={() => setSudokuGrid([])}
        onSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default Play;

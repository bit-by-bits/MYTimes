"use client";

import { useEffect, useState } from "react";
import Layout from "@/app/home/layout";
import CrosswordGrid from "@/components/crossword/crossword-grid";
import Controls from "@/components/crossword/controls";
import CluesPanel from "@/components/crossword/clues-panel";
import { Clue, generateCrosswordGrid } from "@/services/crossword";
import Loading from "@/components/home/loading";
import Error from "@/components/home/error";

export interface Cell {
  value: string;
  color: string;
  isBlack: boolean;
}

export interface CellPosition {
  row: number;
  col: number;
}

const Play = () => {
  const [userGrid, setUserGrid] = useState<Cell[][]>([]);
  const [solutionGrid, setSolutionGrid] = useState<Cell[][]>([]);
  const [clues, setClues] = useState<Clue[]>([]);
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
  const [selectedClue, setSelectedClue] = useState<Clue | null>(null);
  const [selectedClueIndex, setSelectedClueIndex] = useState<number>(0);
  const [hints, setHints] = useState<number>(3);
  const [time, setTime] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const initializeGrid = (grid: string[][]) =>
    grid.map(row =>
      row.map(cell =>
        cell === "-"
          ? { value: "", color: "black", isBlack: true }
          : { value: "", color: "white", isBlack: false }
      )
    );

  const initializeSolution = (grid: string[][]) =>
    grid.map(row =>
      row.map(cell =>
        cell === "-"
          ? { value: "", color: "black", isBlack: true }
          : { value: cell, color: "white", isBlack: false }
      )
    );

  const loadCrosswordData = async () => {
    setLoading(true);
    setError(null);

    try {
      const { grid, clues } = await generateCrosswordGrid();
      setUserGrid(initializeGrid(grid));
      setSolutionGrid(initializeSolution(grid));
      setClues(clues);
      setHints(3);
      setMoves(0);
      setTime(0);
    } catch {
      setError("Failed to load crossword data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCrosswordData();
    const timer = setInterval(() => setTime(prev => prev + 1), 1000);
    return () => clearInterval(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCellClick = (cellPosition: CellPosition) => {
    setSelectedCell(cellPosition);

    const relevantClues = clues.filter(
      clue => clue.row === cellPosition.row && clue.col === cellPosition.col
    );

    if (relevantClues.length === 0) {
      setSelectedClue(null);
      setSelectedClueIndex(0);
      return;
    }

    const isSameCell =
      selectedCell?.row === cellPosition.row &&
      selectedCell?.col === cellPosition.col;
    const nextIndex = isSameCell
      ? (selectedClueIndex + 1) % relevantClues.length
      : 0;

    setSelectedClue(relevantClues[nextIndex]);
    setSelectedClueIndex(nextIndex);
  };

  const handleClueClick = (clue: Clue) => {
    setSelectedCell({ row: clue.row, col: clue.col });
    setSelectedClue(clue);
    setSelectedClueIndex(0);
  };

  const handleHint = () => {
    if (hints <= 0) return;

    for (let row = 0; row < solutionGrid.length; row++) {
      for (let col = 0; col < solutionGrid[row].length; col++) {
        if (!solutionGrid[row][col].isBlack && !userGrid[row][col].value) {
          const newGrid = [...userGrid];
          newGrid[row][col] = {
            ...newGrid[row][col],
            value: solutionGrid[row][col].value
          };
          setUserGrid(newGrid);
          setHints(hints - 1);
          setMoves(moves + 1);
          return;
        }
      }
    }
  };

  const handleSubmit = () => {
    const isCorrect = userGrid.every((row, rowIndex) =>
      row.every(
        (cell, colIndex) =>
          cell.value === solutionGrid[rowIndex][colIndex].value
      )
    );

    alert(
      isCorrect ? "Crossword solved correctly!" : "Some answers are incorrect."
    );
  };

  if (loading)
    return <Loading message="Please wait while crossword loads..." />;
  if (error) return <Error title="Error" message={error} />;

  return (
    <Layout>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-semibold">Play Crossword</h1>
      </div>

      <div className="mb-4">
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
          <strong>Instructions:</strong> Fill in the crossword grid using the
          clues provided. Click a cell or clue to begin.
        </p>
      </div>

      <CrosswordGrid
        grid={userGrid}
        selectedCell={selectedCell}
        selectedClue={selectedClue}
        onCellClick={handleCellClick}
        clues={clues}
        setGrid={newGrid => {
          setUserGrid(newGrid);
          setMoves(moves + 1);
        }}
      />

      <CluesPanel clues={clues}
      selectedClue={selectedClue}
      onClueClick={handleClueClick} />

      <Controls
        hintsLeft={hints > 0}
        onHint={handleHint}
        onReset={loadCrosswordData}
        onSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default Play;

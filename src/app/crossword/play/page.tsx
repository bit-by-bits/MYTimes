"use client";

import { useEffect, useState } from "react";
import Layout from "@/app/home/layout";
import CrosswordGrid from "@/components/crossword/crossword-grid";
import Controls from "@/components/crossword/controls";
import CluesPanel from "@/components/crossword/clues-panel";
import { Clue, generateCrosswordGrid } from "@/services/crossword";

export interface CellPosition {
  row: number;
  col: number;
}

const Play = () => {
  const [userGrid, setUserGrid] = useState<string[][]>([]);
  const [solutionGrid, setSolutionGrid] = useState<string[][]>([]);
  const [clues, setClues] = useState<Clue[]>([]);
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
  const [hints, setHints] = useState<number>(3);
  const [time, setTime] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [highlightedCells, setHighlightedCells] = useState<CellPosition[]>([]);

  const loadCrosswordData = async () => {
    setLoading(true);
    try {
      const { grid, clues } = await generateCrosswordGrid();
      setUserGrid(grid.map(row => row.map(cell => (cell === "-" ? "-" : ""))));
      setSolutionGrid(grid);
      setClues(clues);
      setHints(3);
      setMoves(0);
      setTime(0);
    } catch {
      setError("Failed to load crossword data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCrosswordData();

    const timer = setInterval(() => setTime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!selectedCell) {
      setHighlightedCells([]);
      return;
    }

    const associatedCells: CellPosition[] = [];
    const clue = clues.find(
      c =>
        c.row === selectedCell.row &&
        c.col === selectedCell.col &&
        (c.direction === "horizontal" || c.direction === "vertical")
    );

    if (clue) {
      const { direction, row, col, length } = clue;

      for (let i = 0; i < length; i++) {
        associatedCells.push(
          direction === "horizontal"
            ? { row, col: col + i }
            : { row: row + i, col }
        );
      }
    }

    setHighlightedCells(associatedCells);
  }, [selectedCell, clues]);

  const handleClueClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  const handleHint = () => {
    if (hints > 0) {
      const newGrid = [...userGrid];
      let hintUsed = false;

      for (let row = 0; row < solutionGrid.length && !hintUsed; row++) {
        for (let col = 0; col < solutionGrid[row].length; col++) {
          if (solutionGrid[row][col] !== "-" && userGrid[row][col] === "") {
            newGrid[row][col] = solutionGrid[row][col];
            hintUsed = true;
            break;
          }
        }
      }

      if (hintUsed) {
        setUserGrid(newGrid);
        setHints(prev => prev - 1);
        setMoves(prev => prev + 1);
      }
    }
  };

  const handleSubmit = () => {
    const isCorrect = userGrid.every((row, rowIndex) =>
      row.every((cell, colIndex) => cell === solutionGrid[rowIndex][colIndex])
    );

    alert(
      isCorrect ? "Crossword solved correctly!" : "Some answers are incorrect."
    );
  };

  if (loading) return <Layout>Loading...</Layout>;
  if (error) return <Layout>{error}</Layout>;

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
        onCellClick={cell => setSelectedCell(cell)}
        clues={clues}
        highlightedCells={highlightedCells}
        isWordStart={(row, col, direction) =>
          clues.find(
            clue =>
              clue.row === row &&
              clue.col === col &&
              clue.direction === direction
          ) || null
        }
        setGrid={newGrid => {
          setUserGrid(newGrid);
          setMoves(prev => prev + 1);
        }}
      />

      <CluesPanel clues={clues} onClueClick={handleClueClick} />

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

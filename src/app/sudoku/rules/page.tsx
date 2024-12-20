"use client";

import Layout from "@/app/home/layout";

const Rules = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-semibold mb-6">How to Play Sudoku</h1>

        <div className="mb-6">
          <p className="text-xl text-gray-700">
            Sudoku is a puzzle game played on a 9x9 grid, divided into nine 3x3
            subgrids. The goal of the game is to fill the grid with numbers from
            1 to 9 such that:
          </p>
          <ul className="list-disc pl-6 mt-4 text-lg text-gray-700">
            <li>Each row contains all numbers from 1 to 9.</li>
            <li>Each column contains all numbers from 1 to 9.</li>
            <li>Each 3x3 subgrid contains all numbers from 1 to 9.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Basic Rules:
          </h2>
          <ul className="list-decimal pl-6 mt-4 text-lg text-gray-700">
            <li>
              Numbers from 1 to 9 must be placed in empty cells on the grid.
            </li>
            <li>
              You cannot repeat a number in a row, column, or 3x3 subgrid.
            </li>
            <li>
              Some cells are pre-filled with numbers; these are clues to help
              you solve the puzzle.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Solving Tips:
          </h2>
          <ul className="list-decimal pl-6 mt-4 text-lg text-gray-700">
            <li>
              Start by filling in the obvious numbers based on the clues you
              have.
            </li>
            <li>
              Use the process of elimination to figure out where other numbers
              should go.
            </li>
            <li>
              Focus on one row, column, or 3x3 grid at a time to avoid getting
              overwhelmed.
            </li>
            <li>
              Don&apos;t be afraid to try different possibilities, but always
              check that your choices don&apos;t violate the rules.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Difficulty Levels:
          </h2>
          <p className="text-lg text-gray-700">
            Sudoku puzzles come in different difficulty levels:
          </p>
          <ul className="list-disc pl-6 mt-4 text-lg text-gray-700">
            <li>
              <strong>Easy:</strong> Fewer numbers are missing, making it easier
              to start solving.
            </li>
            <li>
              <strong>Medium:</strong> A balanced puzzle with some challenging
              spots.
            </li>
            <li>
              <strong>Hard:</strong> Fewer clues, requiring more advanced
              solving techniques.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Good Luck!
          </h2>
          <p className="text-lg text-gray-700">
            Remember, patience and logical thinking are key. If you get stuck,
            take a break and return with a fresh perspective. Happy solving!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Rules;

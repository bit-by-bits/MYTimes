import { get } from "@/lib/api";

const SUDOKU_API_URL = "https://sudoku-api.vercel.app/api/dosuku";

interface SudokuApiResponse {
  newboard: {
    grids: {
      value: number[][];
      solution: number[][];
      difficulty: string;
    }[];
  };
}

export const fetchSudokuPuzzle = async (): Promise<{
  grid: number[][];
  solution: number[][];
  difficulty: string;
}> => {
  try {
    const response = await get<SudokuApiResponse>(SUDOKU_API_URL, {
      query: "{ newboard(limit: 1) { grids { value, solution, difficulty } } }"
    });
    const puzzle = response.newboard.grids[0];
    return {
      grid: puzzle.value,
      solution: puzzle.solution,
      difficulty: puzzle.difficulty
    };
  } catch (error) {
    console.error("Error fetching Sudoku puzzle:", error);
    throw error;
  }
};

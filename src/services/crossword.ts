import { get } from "@/lib/api";

export type Direction = "horizontal" | "vertical";

export interface Clue {
  index: number;
  word: string;
  row: number;
  col: number;
  direction: Direction;
  length: number;
}

const fetchWords = async (query: string): Promise<string[]> => {
  const response = await get<{ word: string; score: number }[]>(
    "https://api.datamuse.com/words",
    { ml: query, max: 10 }
  );
  return response.map(item => item.word);
};

const createEmptyGrid = (): string[][] => {
  return Array.from({ length: 10 }, () => Array(10).fill("-"));
};

const placeWordInGrid = (
  grid: string[][],
  word: string,
  row: number,
  col: number,
  direction: Direction
) => {
  for (let i = 0; i < word.length; i++) {
    if (direction === "horizontal") {
      grid[row][col + i] = word[i];
    } else {
      grid[row + i][col] = word[i];
    }
  }
};

const canPlaceWord = (
  grid: string[][],
  word: string,
  row: number,
  col: number,
  direction: Direction
): boolean => {
  if (direction === "horizontal") {
    if (col + word.length > 10) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row][col + i] !== "-" && grid[row][col + i] !== word[i])
        return false;
    }
  } else {
    if (row + word.length > 10) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row + i][col] !== "-" && grid[row + i][col] !== word[i])
        return false;
    }
  }
  return true;
};

const findRandomPositionForWord = (
  grid: string[][],
  word: string
): {
  row: number;
  col: number;
  direction: Direction;
} | null => {
  const directions: Direction[] = ["horizontal", "vertical"];

  for (let attempt = 0; attempt < 100; attempt++) {
    const direction = directions[Math.floor(Math.random() * 2)];
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);

    if (canPlaceWord(grid, word, row, col, direction)) {
      return { row, col, direction };
    }
  }

  return null;
};

export const generateCrosswordGrid = async (): Promise<{
  grid: string[][];
  clues: Clue[];
}> => {
  const grid = createEmptyGrid();
  const clues: Clue[] = [];
  const words = await fetchWords("example");

  for (const word of words) {
    const position = findRandomPositionForWord(grid, word);
    if (position) {
      placeWordInGrid(
        grid,
        word,
        position.row,
        position.col,
        position.direction
      );
      clues.push({
        index: clues.length + 1,
        word,
        row: position.row,
        col: position.col,
        direction: position.direction,
        length: word.length
      });
    }
  }

  return { grid, clues };
};

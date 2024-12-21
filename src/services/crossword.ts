import { fetchRandomWord, fetchRelatedWord } from "@/services/words";

export type Direction = "horizontal" | "vertical";

export interface Clue {
  index: number;
  word: string;
  row: number;
  col: number;
  direction: Direction;
  length: number;
  meaning: string | null;
}

const createEmptyGrid = (size: number = 10): string[][] =>
  Array.from({ length: size }, () => Array(size).fill("-"));

const placeWordInGrid = (
  grid: string[][],
  word: string,
  row: number,
  col: number,
  direction: Direction
): void => {
  for (let i = 0; i < word.length; i++) {
    grid[row + (direction === "vertical" ? i : 0)][
      col + (direction === "horizontal" ? i : 0)
    ] = word[i];
  }
};

const canPlaceWord = (
  grid: string[][],
  word: string,
  row: number,
  col: number,
  direction: Direction
): boolean => {
  if (
    (direction === "horizontal" && col + word.length > grid[0].length) ||
    (direction === "vertical" && row + word.length > grid.length)
  )
    return false;

  for (let i = 0; i < word.length; i++) {
    if (
      grid[row + (direction === "vertical" ? i : 0)][
        col + (direction === "horizontal" ? i : 0)
      ] !== "-" &&
      grid[row + (direction === "vertical" ? i : 0)][
        col + (direction === "horizontal" ? i : 0)
      ] !== word[i]
    )
      return false;
  }
  return true;
};

const findPosition = (
  grid: string[][],
  word: string,
  overlap: boolean
): { row: number; col: number; direction: Direction } | null => {
  const directions: Direction[] = ["horizontal", "vertical"];
  const maxAttempts = overlap ? grid.length * grid[0].length : 50;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const row = Math.floor(Math.random() * grid.length);
    const col = Math.floor(Math.random() * grid[0].length);

    if (overlap ? grid[row][col] !== "-" : true) {
      if (canPlaceWord(grid, word, row, col, direction)) {
        return { row, col, direction };
      }
    }
  }
  return null;
};

export const generateCrosswordGrid = async (): Promise<{
  grid: string[][];
  clues: Clue[];
}> => {
  const maxOuterAttempts = 10;
  const minWordCount = 10;
  const maxWordCount = 20;

  for (let attempts = 0; attempts < maxOuterAttempts; attempts++) {
    const grid = createEmptyGrid();
    const clues: Clue[] = [];
    const usedWords = new Set<string>();
    let wordCount = 0;

    try {
      const currentWord = await fetchRandomWord();
      const { relatedWords } = await fetchRelatedWord(currentWord);

      if (!relatedWords || relatedWords.length === 0) continue;

      const initialRelatedWord =
        relatedWords[Math.floor(Math.random() * relatedWords.length)];

      placeWordInGrid(grid, initialRelatedWord.word, 0, 0, "horizontal");

      clues.push({
        index: 1,
        word: initialRelatedWord.word,
        row: 0,
        col: 0,
        direction: "horizontal",
        length: initialRelatedWord.word.length,
        meaning: initialRelatedWord.meaning || null
      });

      usedWords.add(initialRelatedWord.word);
      wordCount++;

      for (const relatedWord of relatedWords) {
        if (usedWords.has(relatedWord.word)) continue;

        const position =
          findPosition(grid, relatedWord.word, true) ||
          findPosition(grid, relatedWord.word, false);

        if (position) {
          placeWordInGrid(
            grid,
            relatedWord.word,
            position.row,
            position.col,
            position.direction
          );

          clues.push({
            index: clues.length + 1,
            word: relatedWord.word,
            row: position.row,
            col: position.col,
            direction: position.direction,
            length: relatedWord.word.length,
            meaning: relatedWord.meaning || null
          });

          usedWords.add(relatedWord.word);
          wordCount++;

          if (wordCount >= maxWordCount) break;
        }
      }

      if (wordCount >= minWordCount) {
        return { grid, clues };
      }
    } catch {}

    console.warn(`Attempt ${attempts + 1} failed, retrying...`);
  }

  throw new Error(
    "Failed to generate a crossword grid after maximum attempts."
  );
};

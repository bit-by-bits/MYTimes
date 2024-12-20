"use client";

import Layout from "@/app/home/layout";

const Rules = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-semibold mb-6">How to Play Crossword</h1>

        <div className="mb-6">
          <p className="text-xl text-gray-700">
            Crossword is a word puzzle game played on a grid of black and white
            squares. The goal of the game is to fill in the white squares with
            letters to form words, based on clues provided for both the across
            and down directions.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Basic Rules:
          </h2>
          <ul className="list-decimal pl-6 mt-4 text-lg text-gray-700">
            <li>Each white square in the grid must be filled with a letter.</li>
            <li>
              Words are formed horizontally (across) and vertically (down) using
              clues given for each direction.
            </li>
            <li>
              Black squares are used to separate words and are not filled with
              letters.
            </li>
            <li>
              Each clue corresponds to a specific word that fits in the grid in
              either the across or down direction.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Clues:</h2>
          <ul className="list-decimal pl-6 mt-4 text-lg text-gray-700">
            <li>
              Each clue has a number indicating which word it refers to. The
              numbers correspond to the first letter of each word, whether
              across or down.
            </li>
            <li>
              Clues may range in difficulty and may involve definitions,
              wordplay, or cultural references.
            </li>
            <li>
              Across clues are solved by filling letters from left to right, and
              down clues are solved by filling letters from top to bottom.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Solving Tips:
          </h2>
          <ul className="list-decimal pl-6 mt-4 text-lg text-gray-700">
            <li>
              Start with the easiest clues, often the ones you&apos;re most
              familiar with.
            </li>
            <li>
              Use the intersecting letters from across and down words to help
              you solve other clues.
            </li>
            <li>
              Don&apos;t be afraid to guess, but check that your answers fit
              both the definition and the crossing words.
            </li>
            <li>
              Review the grid to see if you&apos;re missing any squares that
              should be filled.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Types of Clues:
          </h2>
          <p className="text-lg text-gray-700">
            There are different types of clues in crossword puzzles:
          </p>
          <ul className="list-disc pl-6 mt-4 text-lg text-gray-700">
            <li>
              <strong>Straight Clues:</strong> The most common type, providing a
              direct definition of the word.
            </li>
            <li>
              <strong>Cryptic Clues:</strong> These involve wordplay, anagrams,
              or other types of indirect hints.
            </li>
            <li>
              <strong>General Knowledge Clues:</strong> These clues rely on
              facts about culture, history, or geography.
            </li>
            <li>
              <strong>Wordplay Clues:</strong> These clues involve puns, hidden
              meanings, or clues that have double meanings.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Good Luck!
          </h2>
          <p className="text-lg text-gray-700">
            Crosswords can be challenging, but with practice and patience,
            you&apos;ll improve. If you&apos;re stuck, take a break and return
            with fresh eyes. Remember, crossword puzzles are not just about
            finding the right words—they&apos;re about learning new things and
            having fun!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Rules;

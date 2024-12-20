"use client";

import Layout from "@/app/home/layout";

const Rules = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-semibold mb-6">How to Play Wordle</h1>

        <div className="mb-6">
          <p className="text-xl text-gray-700">
            Wordle is a popular word puzzle game where the goal is to guess a
            secret 5-letter word in six tries. Each time you make a guess, the
            letters of the word will change color to provide feedback:
          </p>
          <ul className="list-disc pl-6 mt-4 text-lg text-gray-700">
            <li>Green: The letter is correct and in the correct position.</li>
            <li>Yellow: The letter is correct but in the wrong position.</li>
            <li>Gray: The letter is not in the word at all.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Basic Rules:
          </h2>
          <ul className="list-decimal pl-6 mt-4 text-lg text-gray-700">
            <li>Guess the secret 5-letter word within six tries.</li>
            <li>Each guess must be a valid 5-letter word.</li>
            <li>
              After each guess, feedback will be provided using colored tiles
              (green, yellow, gray).
            </li>
            <li>
              You can try any valid word, but be mindful of the feedback you
              receive.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Solving Tips:
          </h2>
          <ul className="list-decimal pl-6 mt-4 text-lg text-gray-700">
            <li>
              Start with common 5-letter words to gather feedback quickly.
            </li>
            <li>
              Use the process of elimination based on the feedback to narrow
              down your guesses.
            </li>
            <li>
              Pay attention to which letters are excluded from the word,
              especially as you get more guesses.
            </li>
            <li>
              If you get a yellow tile, consider the correct letter but try it
              in a different position.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Wordle Strategy:
          </h2>
          <p className="text-lg text-gray-700">
            The key to winning at Wordle is using each guess wisely and
            interpreting the feedback effectively. Here are some strategies:
          </p>
          <ul className="list-disc pl-6 mt-4 text-lg text-gray-700">
            <li>
              <strong>Start with common words:</strong> Use words with common
              vowels and consonants to get as much information as possible from
              the first guess.
            </li>
            <li>
              <strong>Pay attention to letter placement:</strong> If a letter
              turns green, it is in the correct position. If it turns yellow,
              try it in another position.
            </li>
            <li>
              <strong>Use process of elimination:</strong> Once you rule out a
              letter, avoid guessing it again.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Good Luck!
          </h2>
          <p className="text-lg text-gray-700">
            Wordle requires both strategy and luck. Be patient, keep analyzing
            the feedback, and with practice, you&apos;ll become a Wordle master.
            Good luck and have fun!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Rules;

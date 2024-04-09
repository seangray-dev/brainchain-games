import { useState } from "react";
import GameLost from "../game-lost";
import GameWon from "../game-won";
import Answer from "./answer";
import LetterButtons from "./letter-buttons";
import RemainingGuesses from "./remaining-guess";

const answer = "whats up";
const MAX_WRONG_GUESSES = 6;

interface HangManProps {
  onSelectDifferentGame: () => void;
}
export default function HangMan({ onSelectDifferentGame }: HangManProps) {
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState<Set<string>>(new Set());

  const answerLetters = new Set(
    answer
      .toUpperCase()
      .replace(/[^A-Z]/gi, "")
      .split(""),
  );
  const gameWon = [...answerLetters].every((letter) =>
    guessedLetters.has(letter),
  );
  const gameLost = wrongGuesses.size >= MAX_WRONG_GUESSES;

  const handleLetterClick = (letter: string) => {
    if (answer.toUpperCase().includes(letter)) {
      setGuessedLetters((prev) => new Set(prev).add(letter));
    } else {
      setWrongGuesses((prev) => new Set(prev).add(letter));
    }
  };

  const handleRetry = () => {
    setGuessedLetters(new Set());
    setWrongGuesses(new Set());
  };

  return (
    <>
      <section className="flex w-full flex-1 flex-col items-center">
        <div>
          <h2 className="mb-10 text-5xl font-bold">Hang Man</h2>
        </div>
        <div className="container flex flex-1 flex-col gap-10">
          <RemainingGuesses wrongGuessesCount={wrongGuesses.size} />
          <Answer answer={answer} guessedLetters={guessedLetters} />
        </div>
        <div className="w-full">
          <LetterButtons
            onLetterClick={handleLetterClick}
            guessedLetters={new Set([...guessedLetters, ...wrongGuesses])}
          />
        </div>
      </section>

      {/* Modals */}
      <GameLost
        gameLost={gameLost}
        onRetry={handleRetry}
        onSelectDifferentGame={onSelectDifferentGame}
      />
      <GameWon
        gameWon={gameWon}
        onSelectDifferentGame={onSelectDifferentGame}
      />
    </>
  );
}

import { gameWinsAtom } from "@/lib/jotai/gameWins";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { GameProps } from "../constants";
import GameLost from "../game-lost";
import GameWon from "../game-won";
import Answer from "./answer";
import LetterButtons from "./letter-buttons";
import RemainingGuesses from "./remaining-guess";

const MAX_WRONG_GUESSES = 6;

export default function HangMan({ onSelectDifferentGame }: GameProps) {
  const [gameWins, setGameWins] = useAtom(gameWinsAtom);
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const answerLetters = new Set(
    String(answer)
      .toUpperCase()
      .replace(/[^A-Z]/gi, "")
      .split(""),
  );

  const gameWon =
    answerLetters.size > 0 &&
    [...answerLetters].every((letter) => guessedLetters.has(letter));

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
    setAnswer("");
    setHint("");
    setFetchTrigger((prevTrigger) => !prevTrigger);
  };

  useEffect(() => {
    const fetchWord = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/hangman", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setAnswer(data.word || "");
        setHint(data.hint || "");
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch word:", error);
      }
    };

    fetchWord();
  }, [fetchTrigger]);

  useEffect(() => {
    if (gameWon) {
      setGameWins((prevWins: Map<string, boolean>) => {
        const newWins = new Map(prevWins);
        newWins.set("hangman", true);
        Cookies.set("gameWins", JSON.stringify(Array.from(newWins.entries())), {
          expires: 7,
        });
        return newWins;
      });
    }
  }, [gameWon, setGameWins]);

  return (
    <>
      <section className="flex w-full flex-1 flex-col items-center">
        <div>
          <h2 className="mb-10 text-5xl font-bold">Hang Man</h2>
        </div>
        <div className="container flex flex-1 flex-col gap-10 !px-0">
          {isLoading ? (
            <div className="flex h-full flex-1 flex-col items-center justify-center">
              <Loader2Icon size={32} className="animate-spin" />
            </div>
          ) : (
            <>
              <RemainingGuesses wrongGuessesCount={wrongGuesses.size} />
              <Answer
                answer={answer}
                hint={hint}
                guessedLetters={guessedLetters}
              />
            </>
          )}
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
        correctAnswer={answer}
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

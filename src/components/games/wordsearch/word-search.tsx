import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { gameWinsAtom } from "@/lib/jotai/gameWins";
import { useAtom } from "jotai";
import { CheckIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { GameProps } from "../constants";
import GameWon from "../game-won";

interface LetterPosition {
  letter: string;
  position: [number, number];
}

interface FoundWord {
  word: string;
  positions: [number, number][];
}

export default function WordSearch({ onSelectDifferentGame }: GameProps) {
  const [gameWins, setGameWins] = useAtom(gameWinsAtom);
  const [gameWon, setGameWon] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState<LetterPosition[]>([]);
  const [foundWords, setFoundWords] = useState<FoundWord[]>([]);

  const wordsToFind = [
    "BLOCKCHAIN",
    "ALGORITHM",
    "LEDGER",
    "ETHEREUM",
    "TOKEN",
    "ENS",
    "BITCOIN",
    "CRYPTO",
    "NFT",
    "KEYS",
  ];

  const grid = [
    ["A", "B", "L", "O", "C", "K", "C", "H", "A", "I", "N", "N"],
    ["H", "R", "L", "S", "P", "X", "J", "K", "L", "W", "E", "B"],
    ["K", "E", "W", "D", "B", "T", "Y", "U", "G", "T", "I", "A"],
    ["A", "G", "C", "O", "E", "N", "F", "T", "O", "T", "V", "L"],
    ["D", "D", "O", "M", "A", "I", "O", "O", "C", "H", "O", "G"],
    ["N", "E", "T", "S", "S", "T", "T", "O", "I", "E", "G", "O"],
    ["J", "L", "P", "I", "E", "P", "I", "L", "T", "T", "H", "R"],
    ["K", "A", "Y", "N", "Y", "N", "N", "E", "N", "S", "Y", "I"],
    ["E", "B", "R", "R", "T", "Y", "R", "E", "M", "P", "L", "T"],
    ["Y", "S", "C", "V", "B", "N", "K", "I", "W", "E", "R", "H"],
    ["S", "A", "G", "M", "I", "O", "S", "D", "P", "G", "H", "M"],
    ["H", "E", "K", "E", "T", "H", "E", "R", "E", "U", "M", "M"],
  ];

  // Check if all words are found
  useEffect(() => {
    if (foundWords.length === wordsToFind.length) {
      setGameWins(new Map(gameWins.set("wordsearch", true)));
      setGameWon(true);
    }
  }, [foundWords, wordsToFind.length, setGameWins]);

  const getDirection = (firstPosition: number[], secondPosition: number[]) => {
    const [firstRow, firstCol] = firstPosition;
    const [secondRow, secondCol] = secondPosition;

    if (firstRow === secondRow) return "horizontal";
    if (firstCol === secondCol) return "vertical";
    if (Math.abs(secondRow - firstRow) === Math.abs(secondCol - firstCol))
      return "diagonal";
    return null; // Not a straight line
  };

  const isSameDir = (
    selectedLetters: LetterPosition[],
    newPosition: [number, number],
  ) => {
    if (selectedLetters.length < 2) return true; // Direction not established yet

    const direction = getDirection(
      selectedLetters[0].position,
      selectedLetters[1].position,
    );
    const lastPosition = selectedLetters[selectedLetters.length - 1].position;

    switch (direction) {
      case "horizontal":
        return newPosition[0] === lastPosition[0];
      case "vertical":
        return newPosition[1] === lastPosition[1];
      case "diagonal":
        return (
          Math.abs(newPosition[0] - lastPosition[0]) ===
          Math.abs(newPosition[1] - lastPosition[1])
        );
      default:
        return false;
    }
  };

  const isAdjacent = (
    lastPosition: [number, number],
    newPosition: [number, number],
  ) => {
    if (!lastPosition) return true;

    const [lastRow, lastCol] = lastPosition;
    const [newRow, newCol] = newPosition;

    return (
      Math.abs(newPosition[0] - lastPosition[0]) <= 1 &&
      Math.abs(newPosition[1] - lastPosition[1]) <= 1
    );
  };

  const handleLetterClick = (letter: string, row: number, col: number) => {
    const newPosition: [number, number] = [row, col];
    const existingIndex = selectedLetters.findIndex(
      (selected) =>
        selected.position[0] === row && selected.position[1] === col,
    );

    let newSelectedLetters: LetterPosition[] = [];

    // Check if the letter is already selected
    if (existingIndex !== -1) {
      // If so, remove this letter and all that follow it
      newSelectedLetters = selectedLetters.slice(
        0,
        existingIndex,
      ) as LetterPosition[];
    } else {
      const lastPosition =
        selectedLetters[selectedLetters.length - 1]?.position;

      if (
        isAdjacent(lastPosition, newPosition) &&
        isSameDir(selectedLetters, newPosition)
      ) {
        // Add new letter if adjacent and is the same direction
        newSelectedLetters = [
          ...selectedLetters,
          { letter, position: newPosition },
        ];
      } else {
        // Start new selection if not adjacent or same direction
        newSelectedLetters = [{ letter, position: newPosition }];
      }
    }

    setSelectedLetters(newSelectedLetters);
    checkWords(newSelectedLetters);
  };

  const checkWords = (selectedLetters: LetterPosition[]) => {
    const selectedWord = selectedLetters.map((l) => l.letter).join("");

    // Check if selectedWord is in wordsToFind and not found
    if (
      wordsToFind.includes(selectedWord) &&
      !foundWords.some((fw) => fw.word === selectedWord)
    ) {
      setFoundWords([
        ...foundWords,
        {
          word: selectedWord,
          positions: selectedLetters.map((l) => l.position),
        },
      ]);
    }

    // Check to see if all words are found
    if (foundWords.length === wordsToFind.length) {
      setGameWins(new Map(gameWins.set("wordsearch", true)));
      setGameWon(true);
    }
  };

  return (
    <section className="flex w-full flex-1 flex-col items-center justify-center">
      <h2 className="mb-10 text-5xl font-bold">Word Search</h2>
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <div className="mb-6 grid max-w-4xl grid-cols-12">
          {grid.map((row, rowIndex) =>
            row.map((letter, colIndex) => (
              <Button
                variant={"secondary"}
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleLetterClick(letter, rowIndex, colIndex)}
                className={`flex h-12 w-full items-center justify-center rounded-none border font-bold ${
                  selectedLetters.some(
                    (selected) =>
                      selected.position[0] === rowIndex &&
                      selected.position[1] === colIndex,
                  )
                    ? "border-primary"
                    : ""
                } ${
                  foundWords.some((fw) =>
                    fw.positions.some(
                      (pos) => pos[0] === rowIndex && pos[1] === colIndex,
                    ),
                  )
                    ? "bg-muted-foreground"
                    : ""
                }`}
              >
                {letter}
              </Button>
            )),
          )}
        </div>
        <div className="container flex flex-col gap-2">
          <h3 className="text-center text-xl">Words to find:</h3>
          <div className="grid grid-cols-2 justify-between">
            {wordsToFind.map((word) => (
              <div key={word} className="flex justify-center gap-1 text-center">
                <p>{word}</p>
                <Badge
                  className={`h-3 w-3 p-0 ${
                    foundWords.some((fw) => fw.word === word)
                      ? "bg-green-500"
                      : "opacity-0"
                  }`}
                >
                  <CheckIcon size={12} />
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
      <GameWon
        gameWon={gameWon}
        onSelectDifferentGame={onSelectDifferentGame}
      />
    </section>
  );
}

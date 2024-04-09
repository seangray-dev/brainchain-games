import { Button } from "@/components/ui/button";
import React, { FC } from "react";

interface LetterButtonsProps {
  onLetterClick: (letter: string) => void;
  guessedLetters: Set<string>;
}

export default function LetterButtons({
  onLetterClick,
  guessedLetters,
}: LetterButtonsProps) {
  const renderLetters = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return alphabet.map((letter: string) => (
      <Button
        className={`h-8 w-full md:h-12 md:w-full ${guessedLetters.has(letter) ? "bg-gray-400" : ""}`}
        key={letter}
        onClick={() => onLetterClick(letter)}
        tabIndex={0}
        disabled={guessedLetters.has(letter)}
      >
        {letter}
      </Button>
    ));
  };

  return (
    <div className="grid w-full grid-cols-9 flex-wrap gap-2 rounded-md border p-4">
      {renderLetters()}
    </div>
  );
}

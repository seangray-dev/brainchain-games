import React, { ReactElement, useEffect, useState } from "react";

export default function Answer({
  answer,
  guessedLetters,
}: {
  answer: string;
  guessedLetters: Set<string>;
}) {
  const [displayedAnswer, setDisplayedAnswer] = useState<ReactElement[]>(
    answer.split("").map((char, index) => (
      <span key={index} className={char === " " ? "mx-2" : ""}>
        {char === " " ? "\u00A0" : ""}
      </span>
    )),
  );

  useEffect(() => {
    const updatedDisplayedAnswer = answer.split("").map((char, index) => (
      <span
        key={index}
        className={`letter flex h-12 w-12 items-center justify-center ${char === " " ? "bg-transparent" : "bg-primary"} font-bold text-primary-foreground`}
      >
        {guessedLetters.has(char.toUpperCase()) || char === " " ? char : ""}
      </span>
    ));
    setDisplayedAnswer(updatedDisplayedAnswer);
  }, [guessedLetters, answer]);

  return (
    <div className="flex flex-1 justify-center space-x-2">
      {displayedAnswer}
    </div>
  );
}

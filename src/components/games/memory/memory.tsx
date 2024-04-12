import { gameWinsAtom } from "@/lib/jotai/gameWins";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { GameProps } from "../constants";
import GameWon from "../game-won";

export default function Memory({ onSelectDifferentGame }: GameProps) {
  const [gameWins, setGameWins] = useAtom(gameWinsAtom);
  const [gameWon, setGameWon] = useState(false);
  const [cards, setCards] = useState<string[]>([]);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [matchedIndexes, setMatchedIndexes] = useState<number[]>([]);

  useEffect(() => {
    const symbols = ["💰", "💸", "🤑", "📉", "📈", "💵", "⚡️", "🔐"];
    const deck = [...symbols, ...symbols].sort(() => 0.5 - Math.random());
    setCards(deck);
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedIndexes.length === 0) {
      setFlippedIndexes([index]);
    } else if (
      flippedIndexes.length === 1 &&
      flippedIndexes[0] !== index &&
      cards[flippedIndexes[0]] === cards[index]
    ) {
      setMatchedPairs((prev) => prev + 1);
      setMatchedIndexes((prev) => [...prev, flippedIndexes[0], index]);
      setFlippedIndexes([]);
    } else if (flippedIndexes.length === 1) {
      setFlippedIndexes([flippedIndexes[0], index]);
      setTimeout(() => {
        setFlippedIndexes([]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (matchedPairs === 8) {
      setGameWins((prevWins) => {
        const newWins = new Map(prevWins);
        setGameWon(true);
        newWins.set("memory", true);
        return newWins;
      });
    }
  }, [matchedPairs, setGameWins]);

  return (
    <>
      <section className="flex w-full flex-1 flex-col items-center">
        <div>
          <h2 className="mb-10 text-5xl font-bold">Memory Cards</h2>
        </div>
        <div className="mt-5 grid grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`flip-card m-2 h-24 w-16 cursor-pointer sm:h-32 sm:w-24`}
              onClick={() => handleCardClick(index)}
            >
              <div
                className={`flip-card-inner ${flippedIndexes.includes(index) || matchedIndexes.includes(index) ? "is-flipped" : ""}`}
              >
                <div className="flip-card-front flex items-center justify-center rounded-lg bg-secondary">
                  <span className="text-4xl text-card">❓</span>
                </div>
                <div
                  className={`flip-card-back flex items-center justify-center rounded-lg
                  ${matchedIndexes.includes(index) ? "bg-green-400" : "bg-primary"}`}
                >
                  <span className="text-4xl">{card}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <GameWon
        gameWon={gameWon}
        onSelectDifferentGame={onSelectDifferentGame}
      />
    </>
  );
}

"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import Decryption from "../games/decryption/decryption";
import DecryptionInstructions from "../games/decryption/instructions";
import HangMan from "../games/hangman/hangman";
import HangmanInstructions from "../games/hangman/instructions";
import HowToPlay from "../games/how-to-play";
import MemoryInstructions from "../games/memory/instructions";
import Memory from "../games/memory/memory";
import Quiz from "../games/quiz/quiz";
import WordSearchInstructions from "../games/wordsearch/instructions";
import WordSearch from "../games/wordsearch/word-search";
import { Button } from "../ui/button";
import GameCards from "../ui/game-cards";

export default function SelectGame() {
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  const gameInstructions: { [key: string]: JSX.Element } = {
    hangman: <HangmanInstructions />,
    memory: <MemoryInstructions />,
    decryption: <DecryptionInstructions />,
    quiz: <DecryptionInstructions />,
    wordsearch: <WordSearchInstructions />,
  };

  const selectGame = (gameId: string) => {
    setCurrentGame(gameId);
  };

  const goBackToGameSelection = () => {
    setCurrentGame(null);
  };

  const renderGameComponent = () => {
    switch (currentGame) {
      case "hangman":
        return <HangMan onSelectDifferentGame={goBackToGameSelection} />;
      case "memory":
        return <Memory onSelectDifferentGame={goBackToGameSelection} />;
      case "decryption":
        return <Decryption onSelectDifferentGame={goBackToGameSelection} />;
      case "quiz":
        return <Quiz onSelectDifferentGame={goBackToGameSelection} />;
      case "wordsearch":
        return <WordSearch onSelectDifferentGame={goBackToGameSelection} />;
      default:
        return <div>Game not found</div>;
    }
  };

  return (
    <div className="container flex flex-1 flex-col items-center justify-center">
      {!currentGame ? (
        <GameCards selectGame={selectGame} />
      ) : (
        <>
          <div className="mb-10 flex w-full items-center justify-between">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>
                  <ArrowLeftIcon size={18} className="mr-2" />
                  Go back
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone and you will lose your current
                    progress.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={goBackToGameSelection}
                    className="bg-destructive text-white hover:bg-destructive/80"
                  >
                    Go Back
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <HowToPlay instructions={gameInstructions[currentGame]} />
          </div>

          {renderGameComponent()}
        </>
      )}
    </div>
  );
}

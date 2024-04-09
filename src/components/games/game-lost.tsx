import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useEffect, useState } from "react";

interface GameLostProps {
  correctAnswer: string;
  gameLost: boolean;
  onRetry: () => void;
  onSelectDifferentGame: () => void;
}

export default function GameLost({
  correctAnswer,
  gameLost,
  onRetry,
  onSelectDifferentGame,
}: GameLostProps) {
  const [isOpen, setIsOpen] = useState(gameLost);

  useEffect(() => {
    setIsOpen(gameLost);
  }, [gameLost]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You Lost...</AlertDialogTitle>
          <AlertDialogDescription>
            <p>The correct answer was: {correctAnswer}</p>
            <p>Try again, or select a different game.</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              onSelectDifferentGame();
              handleClose();
            }}
          >
            Select another game
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onRetry();
              handleClose();
            }}
          >
            Retry
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

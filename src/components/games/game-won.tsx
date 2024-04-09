import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useEffect, useState } from "react";

interface GameLostProps {
  gameWon: boolean;
  onSelectDifferentGame: () => void;
}

export default function GameWon({
  gameWon,
  onSelectDifferentGame,
}: GameLostProps) {
  const [isOpen, setIsOpen] = useState(gameWon);

  useEffect(() => {
    setIsOpen(gameWon);
  }, [gameWon]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You Won!</AlertDialogTitle>
          <AlertDialogDescription>
            Select a new game to play.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              onSelectDifferentGame();
              handleClose();
            }}
          >
            Select New Game
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

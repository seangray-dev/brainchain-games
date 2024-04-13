import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { gameWinsAtom } from "@/lib/jotai/gameWins";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";

interface GameWonProps {
  gameWon: boolean;
  onSelectDifferentGame: () => void;
}

export default function GameWon({
  gameWon,
  onSelectDifferentGame,
}: GameWonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [gameWins] = useAtom(gameWinsAtom);

  useEffect(() => {
    if (gameWon && gameWins.size < 5) {
      setIsOpen(true);
    }
  }, [gameWon, gameWins.size]);

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

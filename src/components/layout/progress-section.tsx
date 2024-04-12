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
import { gameWinsAtom } from "@/lib/jotai/gameWins";
import { useAtom } from "jotai";
import { Button } from "../ui/button";

import { Progress } from "../ui/progress";

export default function ProgressSection() {
  const [gameWins, setGameWins] = useAtom(gameWinsAtom);

  const winsCount = Array.from(gameWins.values()).reduce(
    (count, win) => count + (win ? 1 : 0),
    0,
  );

  const handleResetProgress = () => {
    setGameWins(new Map());
    localStorage.removeItem("gameWins");
  };

  return (
    <div className="flex flex-col gap-8">
      <Progress value={winsCount * 20} max={100} />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Reset Progress</Button>
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
              onClick={handleResetProgress}
              className="bg-destructive text-white hover:bg-destructive/80"
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

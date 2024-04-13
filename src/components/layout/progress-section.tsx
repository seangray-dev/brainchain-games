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
import Link from "next/link";
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

  const isAllGamesCompleted = winsCount === 5;

  return (
    <div className="flex flex-col gap-8">
      <Progress value={winsCount * 20} max={100} />
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-full">Reset Progress</Button>
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
        {isAllGamesCompleted && (
          <Link className="w-full" href="/claim-nft">
            <Button variant={"secondary"} className="w-full">
              Claim NFT
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

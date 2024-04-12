import { gameWinsAtom } from "@/lib/jotai/gameWins";
import { useAtom } from "jotai";
import { Progress } from "../ui/progress";

export default function ProgressBar() {
  const [gameWins] = useAtom(gameWinsAtom);

  const winsCount = Array.from(gameWins.values()).reduce(
    (count, win) => count + (win ? 1 : 0),
    0,
  );

  return <Progress value={winsCount * 20} max={100} />;
}

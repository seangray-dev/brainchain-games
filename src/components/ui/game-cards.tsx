"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { gameWinsAtom } from "@/lib/jotai/gameWins";
import { useAtom } from "jotai";
import {
  CheckIcon,
  LockKeyholeOpenIcon,
  MessageCircleQuestionIcon,
  SearchIcon,
  SendToBackIcon,
  SkullIcon,
} from "lucide-react";
import { Button } from "./button";

const games = [
  { id: "hangman", Icon: SkullIcon },
  { id: "memory", Icon: SendToBackIcon },
  { id: "decryption", Icon: LockKeyholeOpenIcon },
  { id: "trivia", Icon: MessageCircleQuestionIcon },
  { id: "wordsearch", Icon: SearchIcon },
];

export default function GameCards({
  selectGame,
}: {
  selectGame: (id: string) => void;
}) {
  const [gameWins] = useAtom(gameWinsAtom);

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-4">
        {games.map(({ id, Icon }) => (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <div className="relative">
                {gameWins.get(id) && (
                  <Badge className="absolute -right-1 -top-1 z-10 bg-green-500 p-0 hover:bg-green-500">
                    <CheckIcon className="text-white" size={14} />
                  </Badge>
                )}

                <Button
                  disabled={gameWins.get(id)}
                  variant="secondary"
                  className="h-16 w-16 rounded-lg border"
                  onClick={() => selectGame(id)}
                >
                  <Icon size={32} />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="capitalize">{id}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

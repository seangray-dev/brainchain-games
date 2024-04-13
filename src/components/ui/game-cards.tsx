"use client";

import { Badge } from "@/components/ui/badge";
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
import { useState } from "react";
import { Button } from "./button";

interface Game {
  id: string;
  Icon: typeof LockKeyholeOpenIcon;
}

const games: Game[] = [
  { id: "hangman", Icon: SkullIcon },
  { id: "memory", Icon: SendToBackIcon },
  { id: "decryption", Icon: LockKeyholeOpenIcon },
  { id: "trivia", Icon: MessageCircleQuestionIcon },
  { id: "word-search", Icon: SearchIcon },
];

export default function GameCards({
  selectGame,
}: {
  selectGame: (id: string) => void;
}) {
  const [gameWins] = useAtom(gameWinsAtom);
  const [hoveredGame, setHoveredGame] = useState<Game | null>(null);

  return (
    <div className="relative my-auto">
      <div
        className="ease fixed left-1/2 top-40 -translate-x-1/2 transform bg-opacity-90 py-4 transition-opacity duration-700"
        style={{ opacity: hoveredGame ? 1 : 0 }}
      >
        <div className="flex flex-col items-center gap-10 opacity-50">
          {hoveredGame && (
            <>
              <hoveredGame.Icon size={64} className="opacity-30" />
              <span className="text-xl font-semibold uppercase">
                {hoveredGame.id}
              </span>
            </>
          )}
        </div>
      </div>
      <p className="mb-6 mt-14 text-center text-muted-foreground">
        Select a game to play
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        {games.map((game) => (
          <div
            onFocus={() => setHoveredGame(game)}
            onMouseEnter={() => setHoveredGame(game)}
            onMouseLeave={() => setHoveredGame(null)}
            key={game.id}
            className="relative"
          >
            {gameWins.get(game.id) && (
              <Badge className="absolute -right-1 -top-1 z-10 bg-green-500 p-0 hover:bg-green-500">
                <CheckIcon className="text-white" size={14} />
              </Badge>
            )}
            <Button
              disabled={gameWins.get(game.id)}
              variant="secondary"
              className="h-16 w-16 rounded-lg border"
              onClick={() => selectGame(game.id)}
            >
              <game.Icon size={32} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

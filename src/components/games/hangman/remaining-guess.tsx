import { FrownIcon, MinusIcon } from "lucide-react";
import React from "react";

export default function RemainingGuesses({
  wrongGuessesCount,
}: {
  wrongGuessesCount: number;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-36 w-full items-center justify-center">
        <div className="relative flex scale-150 flex-col items-center justify-center">
          {/* Head */}
          {wrongGuessesCount > 0 && <FrownIcon />}
          {/* Torso */}
          {wrongGuessesCount > 1 && (
            <MinusIcon size={32} className="absolute top-4 rotate-90" />
          )}
          {/* Left Arm */}
          {wrongGuessesCount > 2 && (
            <MinusIcon
              size={28}
              className="absolute right-1 top-5 -rotate-[45deg]"
            />
          )}
          {/* Right Arm */}
          {wrongGuessesCount > 3 && (
            <MinusIcon
              size={28}
              className="absolute left-1 top-5 rotate-[45deg]"
            />
          )}
          {/* Left Leg */}
          {wrongGuessesCount > 4 && (
            <MinusIcon
              size={28}
              className="absolute right-0 top-9 -rotate-[75deg]"
            />
          )}
          {/* Right Leg */}
          {wrongGuessesCount > 5 && (
            <MinusIcon
              size={28}
              className="absolute left-0 top-9 rotate-[75deg]"
            />
          )}
        </div>
      </div>
    </div>
  );
}

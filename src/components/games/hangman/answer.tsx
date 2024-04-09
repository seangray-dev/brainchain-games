import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LightbulbIcon } from "lucide-react";
import React, { ReactElement, useEffect, useState } from "react";

export default function Answer({
  answer,
  hint,
  guessedLetters,
}: {
  answer: string;
  hint: string;
  guessedLetters: Set<string>;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [displayedAnswer, setDisplayedAnswer] = useState<ReactElement[]>(
    answer.split("").map((char, index) => (
      <span key={index} className={char === " " ? "mx-2" : ""}>
        {char === " " ? "\u00A0" : ""}
      </span>
    )),
  );

  useEffect(() => {
    const updatedDisplayedAnswer = answer.split("").map((char, index) => (
      <span
        key={index}
        className={`letter flex h-12 w-12 items-center justify-center ${char === " " ? "bg-transparent" : "bg-primary"} font-bold text-primary-foreground`}
      >
        {guessedLetters.has(char.toUpperCase()) || char === " " ? char : ""}
      </span>
    ));
    setDisplayedAnswer(updatedDisplayedAnswer);
  }, [guessedLetters, answer]);

  return (
    <div className="flex w-full flex-1 items-start justify-between">
      <Dialog>
        <DialogTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <LightbulbIcon
                  onClick={() => {
                    dialogOpen;
                  }}
                  size={28}
                  className="mt-2 text-muted-foreground transition-all duration-150 hover:text-white"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Hint</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Here is your hint, cheater...</DialogTitle>
            <DialogDescription>{hint}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="flex flex-1 justify-center space-x-2">
        {displayedAnswer}
      </div>
    </div>
  );
}

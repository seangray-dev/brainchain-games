import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { gameWinsAtom } from "@/lib/jotai/gameWins";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { TerminalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { GameProps } from "../constants";
import GameWon from "../game-won";
import HintDialog from "./hint-dialog";
import { SelectCategory } from "./select-category";

export default function Decryption({ onSelectDifferentGame }: GameProps) {
  const { toast } = useToast();
  const [userInput, setUserInput] = useState("");
  const [gameWins, setGameWins] = useAtom(gameWinsAtom);
  const [gameWon, setGameWon] = useState(false);
  const [category, setCategory] = useState("");
  const [originalMessage, setOriginalMessage] = useState("");
  const [hint, setHint] = useState("");
  const [cipheredMessage, setCipheredMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [animatedCipher, setAnimatedCipher] = useState("");

  function randomizeMessage(message: string) {
    const characters = message.split("");
    for (let i = characters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [characters[i], characters[j]] = [characters[j], characters[i]]; // Swap
    }
    return characters.join("");
  }

  function shuffleString(str: string) {
    const arr = str.split("");
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr.join("");
  }

  useEffect(() => {
    if (cipheredMessage) {
      const animationDuration = 2000; // Duration of the animation in milliseconds
      const shuffleInterval = 100; // Interval between each shuffle in milliseconds

      let remainingTime = animationDuration;

      const interval = setInterval(() => {
        // Shuffle and display the message
        setAnimatedCipher(shuffleString(cipheredMessage));

        remainingTime -= shuffleInterval;

        if (remainingTime <= 0) {
          clearInterval(interval);
          setAnimatedCipher(cipheredMessage); // Set to the final ciphered message
        }
      }, shuffleInterval);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [cipheredMessage]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (userInput.trim() === originalMessage) {
      setGameWins(new Map(gameWins.set("decryption", true)));
      setGameWon(true);
    } else {
      toast({
        variant: "destructive",
        title: "Wrong answer",
        description: "Please try again.",
      });
    }
  };

  useEffect(() => {
    if (gameWon) {
      setGameWins((prevWins: Map<string, boolean>) => {
        const newWins = new Map(prevWins);
        newWins.set("decryption", true);
        Cookies.set("gameWins", JSON.stringify(Array.from(newWins.entries())), {
          expires: 7,
        });
        return newWins;
      });
    }
  }, [gameWon, setGameWins]);

  useEffect(() => {
    const blockCopyShortcut = (e: any) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "c") {
        e.preventDefault();
        toast({
          variant: "destructive",
          title: "Nice try...😈",
          description: "You cant copy and paste this",
        });
      }
    };

    document.addEventListener("keydown", blockCopyShortcut);

    return () => {
      document.removeEventListener("keydown", blockCopyShortcut);
    };
  }, [toast]);

  function handleCategorySelected(selectedCategory: string) {
    setCategory(selectedCategory);
    setIsLoading(true);

    setAnimatedCipher(shuffleString("Loading..."));

    const animationInterval = setInterval(() => {
      setAnimatedCipher((prev) => shuffleString(prev));
    }, 100);

    fetch("/decryption", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: selectedCategory }),
    })
      .then((response) => response.json())
      .then(({ message, hint }) => {
        clearInterval(animationInterval);
        setOriginalMessage(message);
        const randomizedMessage = randomizeMessage(message);
        setCipheredMessage(randomizedMessage);
        setAnimatedCipher(randomizedMessage);
        setHint(hint);
      })
      .catch((error) => {
        console.error("Error:", error);
        clearInterval(animationInterval);
        toast({
          variant: "destructive",
          title: "Fetch error",
          description: "There was an error fetching the data.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const reshuffleMessage = () => {
    const reshuffled = randomizeMessage(cipheredMessage);
    setAnimatedCipher(reshuffled);
  };

  return (
    <section className="flex w-full flex-1 flex-col items-center justify-center">
      <h2 className="mb-10 text-5xl font-bold">Decryption</h2>

      {/* Show SelectCategory only if no category has been selected or isLoading is true. */}
      {!category || isLoading ? (
        <div className="flex w-1/2 flex-1 flex-col justify-center">
          <SelectCategory
            onCategorySelected={handleCategorySelected}
            isLoading={isLoading}
          />
        </div>
      ) : (
        // Show the decryption form only if a category has been selected and isLoading is false.
        <form
          className="flex w-full flex-1 flex-col items-center justify-center gap-10"
          onSubmit={handleSubmit}
        >
          <Alert className="flex flex-col items-center gap-4">
            <div className="flex justify-center gap-2">
              <TerminalIcon className="h-4 w-4" />
              <AlertTitle>Decode the encrypted message below</AlertTitle>
            </div>
            <AlertDescription className="select-none text-2xl">
              {animatedCipher}
            </AlertDescription>
          </Alert>
          <Textarea
            className="resize-none"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Decipher the message here"
            rows={3}
            disabled={isLoading} // Optionally disable input while loading
          />
          <div className="flex gap-2">
            <Button
              variant={"secondary"}
              type="button"
              onClick={() => setHintOpen(true)}
              disabled={isLoading}
            >
              Hint
            </Button>
            <Button
              type="button"
              variant={"secondary"}
              onClick={reshuffleMessage}
            >
              Shuffle
            </Button>
            <Button variant={"default"} type="submit" disabled={isLoading}>
              Decrypt
            </Button>
          </div>
        </form>
      )}

      {/* Modals */}
      <GameWon
        gameWon={gameWon}
        onSelectDifferentGame={onSelectDifferentGame}
      />
      <HintDialog
        hint={hint}
        isHintOpen={hintOpen}
        setIsHintOpen={setHintOpen}
      />
    </section>
  );
}

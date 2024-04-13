"use client";

import ErrorCompletion from "@/components/ui/error-completion";
import Cookies from "js-cookie";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ClaimNFTPage() {
  const [hasCompletedAllGames, setHasCompletedAllGames] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const gameWins = Cookies.get("gameWins");
    const gameWinsData = gameWins ? JSON.parse(gameWins) : {};

    const completedGamesCount =
      Object.values(gameWinsData).filter(Boolean).length;

    if (completedGamesCount === 5) {
      setHasCompletedAllGames(true);
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container flex w-full flex-1 flex-col items-center justify-center py-20">
      <div>
        {!hasCompletedAllGames ? (
          <div className="flex flex-col items-center gap-2">
            <Link className="flex items-center gap-1 hover:underline" href="/">
              <ArrowLeftIcon size={18} />
              Go back
            </Link>
            <ErrorCompletion />
          </div>
        ) : (
          <>
            <h2 className="mb-10 text-center text-5xl font-bold">
              Congratulations!
            </h2>
            <p className="text-center">
              You have completed all the games and can now claim your NFT!
            </p>
          </>
        )}
      </div>
    </section>
  );
}

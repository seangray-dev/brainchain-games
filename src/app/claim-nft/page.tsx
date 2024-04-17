"use client";

import { Button } from "@/components/ui/button";
import ErrorCompletion from "@/components/ui/error-completion";
import { CONTRACT, chain, client } from "@/lib/thirdweb";
import Cookies from "js-cookie";
import { ArrowLeftIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  prepareContractCall,
  sendAndConfirmTransaction,
  sendTransaction,
  simulateTransaction,
  toWei,
} from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import {
  ConnectButton,
  MediaRenderer,
  useActiveAccount,
  useActiveWallet,
} from "thirdweb/react";

interface Metadata {
  name: string;
  symbol: string;
  description: string;
  image: string;
  seller_fee_basis_points: number;
  fee_recipient: string;
  [key: string]: any;
}

export default function ClaimNFTPage() {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [hasCompletedAllGames, setHasCompletedAllGames] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const account = useActiveAccount();
  const wallet = useActiveWallet();

  const contract = CONTRACT;

  useEffect(() => {
    const initContract = async () => {
      const fetchedMetadata = await getContractMetadata({ contract });
      setMetadata(fetchedMetadata);
    };

    initContract();

    const gameWins = Cookies.get("gameWins");
    const gameWinsData = gameWins ? JSON.parse(gameWins) : {};
    const completedGamesCount =
      Object.values(gameWinsData).filter(Boolean).length;

    if (completedGamesCount === 5) {
      setHasCompletedAllGames(true);
    }

    setIsPageLoading(false);
  }, []);

  const handleClaim = async () => {
    const mintAmount = BigInt(1);
    await wallet?.connect({ chain, client });

    if (!wallet) {
      console.error("no wallet found");
      return;
    }

    if (!account?.address) {
      console.error("no account address");
      return;
    }

    try {
      console.log("wallet", wallet);
      console.log("account", account);

      const transaction = prepareContractCall({
        contract,
        method: "function mintTo(address to, uint256 amount)",
        params: [account.address, mintAmount],
      });
      console.log("transaction", transaction);
      const result = await simulateTransaction({ transaction });
      console.log("simulation result", result);
    } catch (err) {
      console.error(err);
    }
  };

  if (isPageLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <Loader2Icon size={32} className="animate-spin" />
          Loading...
        </div>
      </div>
    );
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
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center">
              <MediaRenderer
                client={client}
                src={metadata?.image}
                className="h-[300px] w-[300px]"
              />
            </div>
            <h2 className="text-center text-5xl font-bold">{metadata?.name}</h2>
            <p className="max-w-xl text-center">{metadata?.description}</p>
            <div className="flex items-center gap-2">
              <ConnectButton client={client} chain={chain} />
              {wallet && <Button onClick={handleClaim}>Claim</Button>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

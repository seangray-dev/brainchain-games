"use client";

import { Button } from "@/components/ui/button";
import ErrorCompletion from "@/components/ui/error-completion";
import { useToast } from "@/components/ui/use-toast";
import { CONTRACT, chain, client } from "@/lib/thirdweb";
import Cookies from "js-cookie";
import { ArrowLeftIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { NFT, sendAndConfirmTransaction } from "thirdweb";
import {
  balanceOf,
  getNFT,
  mintAdditionalSupplyTo,
} from "thirdweb/extensions/erc1155";
import {
  ConnectButton,
  MediaRenderer,
  useActiveAccount,
  useActiveWallet,
} from "thirdweb/react";

export default function ClaimNFTPage() {
  const { toast } = useToast();
  const [NFT, setNFT] = useState<NFT | null>(null);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [hasCompletedAllGames, setHasCompletedAllGames] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const contract = CONTRACT;

  useEffect(() => {
    const initContract = async () => {
      const nft = await getNFT({ contract, tokenId: BigInt("0") });
      setNFT(nft);
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

    const userBalance = await balanceOf({
      contract,
      owner: account?.address,
      tokenId: BigInt("0"),
    });

    if (userBalance >= 1) {
      toast({
        variant: "destructive",
        title: "Looks like you've already claimed this NFT",
        description: "Only one NFT per address is allowed",
      });
      return;
    }

    try {
      setTransactionLoading(true);
      toast({
        title: "Transaction Sent!",
        description: "Please wait...",
      });
      const transaction = mintAdditionalSupplyTo({
        contract,
        to: account.address,
        tokenId: BigInt("0"),
        supply: mintAmount,
      });

      const receipt = await sendAndConfirmTransaction({ transaction, account });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Uh oh, something went wrong...",
        description: `${err.message}`,
      });
      setTransactionLoading(false);
    } finally {
      toast({
        title: "Success!",
        description: "You have successfully claimed your NFT",
      });
      setTransactionLoading(false);
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
          <div className="flex max-w-xl flex-col items-center gap-6">
            <div className="flex flex-col items-center">
              <MediaRenderer
                client={client}
                src={NFT?.metadata?.image}
                className="h-[300px] w-[300px]"
              />
            </div>
            <h2 className="text-center text-5xl font-bold">
              {NFT?.metadata.name}
            </h2>
            <p className="text-center">{NFT?.metadata.description}</p>
            <div className="flex w-full items-center justify-center gap-2">
              <ConnectButton client={client} chain={chain} />
              {wallet && (
                <Button className="w-[150px] py-[31px]" onClick={handleClaim}>
                  {transactionLoading ? (
                    <Loader2Icon className="h-6 w-6 animate-spin" />
                  ) : (
                    <p>Claim</p>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

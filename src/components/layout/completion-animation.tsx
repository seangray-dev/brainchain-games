"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { gameWinsAtom } from "@/lib/jotai/gameWins";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useReward } from "react-rewards";
import { Button } from "../ui/button";

export default function CompletionAnimation() {
  const { reward, isAnimating } = useReward("rewardId", "emoji", {
    emoji: ["💵", "💸", "＄", "🤑", "💰"],
    lifetime: 3000,
    elementCount: 50,
    spread: 90,
    startVelocity: 35,
    decay: 0.9,
  });
  const [gameWins] = useAtom(gameWinsAtom);
  const [open, setOpen] = useState(gameWins.size === 5);

  useEffect(() => {
    if (open) {
      reward();
    }
  }, [open, reward]);

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        id="rewardId"
        className="flex flex-col items-center justify-center"
      >
        <DialogHeader>
          <DialogTitle>Congratulations!</DialogTitle>
          <DialogDescription>
            You successfully completed all 5 games and can now claim your NFT!
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild onClick={handleClose} />
        <DialogFooter>
          <Link href={"/claim-nft"}>
            <Button>Claim NFT</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

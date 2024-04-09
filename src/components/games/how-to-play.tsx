import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircleIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

interface HowToPlayProps {
  instructions: JSX.Element;
}

export default function HowToPlay({ instructions }: HowToPlayProps) {
  const [howToOpen, setHowToOpen] = useState(false);
  return (
    <Drawer open={howToOpen} onOpenChange={setHowToOpen}>
      <DrawerTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={() => {
                setHowToOpen(true);
              }}
            >
              <HelpCircleIcon className="text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>How to play</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>How To Play</DrawerTitle>
          <DrawerDescription>{instructions}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button className="w-full">Got it</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

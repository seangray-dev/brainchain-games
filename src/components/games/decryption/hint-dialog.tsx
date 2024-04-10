import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Add a new prop for updating the open state
export default function HintDialog({
  hint,
  isHintOpen,
  setIsHintOpen, // Add this prop to allow the parent to pass a function for updating the state
}: {
  hint: string;
  isHintOpen: boolean;
  setIsHintOpen: (isOpen: boolean) => void; // This function is used to update the isHintOpen state
}) {
  return (
    <Dialog open={isHintOpen} onOpenChange={setIsHintOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Here is your hint...</DialogTitle>
          <DialogDescription>{hint}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

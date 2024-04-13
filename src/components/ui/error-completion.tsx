import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function ErrorCompletion() {
  return (
    <Alert className="bg-destructive">
      <AlertCircleIcon className="h-4 w-4" />
      <AlertTitle>Oops!</AlertTitle>
      <AlertDescription>
        It looks like you haven't completed all the games yet. Please finish all
        games before claiming your NFT.
      </AlertDescription>
    </Alert>
  );
}

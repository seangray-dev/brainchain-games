import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast, useToast } from "@/components/ui/use-toast";
import { gameWinsAtom } from "@/lib/jotai/gameWins";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GameProps } from "../constants";
import { SelectCategory } from "../decryption/select-category";
import GameWon from "../game-won";

const FormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
});

export default function Quiz({ onSelectDifferentGame }: GameProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { toast } = useToast();
  const [gameWins, setGameWins] = useAtom(gameWinsAtom);
  const [gameWon, setGameWon] = useState(false);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);

  async function handleCategorySelected(selectedCategory: string) {
    setCategory(selectedCategory);
    setIsLoading(true);

    try {
      const response = await fetch("/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: selectedCategory }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      let quizData = "";

      const processChunk = async () => {
        const processChunk = async () => {
          const { done, value } = await reader.read();
          if (done) {
            setIsLoading(false);
            console.log("Stream complete");
            const parsedQuiz = JSON.parse(quizData);
            console.log(parsedQuiz);
            setQuiz(parsedQuiz); // Update the quiz state with the parsed data
            return;
          }

          if (value) {
            const textChunk = new TextDecoder().decode(value);
            quizData += textChunk;
            processChunk(); // Continue processing the next chunk
          }
        };
      };

      processChunk(); // Start processing the stream
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to fetch quiz:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load the quiz. Please try again.",
      });
    }
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <section className="flex w-full flex-1 flex-col items-center justify-center">
      <h2 className="mb-10 text-5xl font-bold">Quiz</h2>

      {!category || isLoading ? (
        <div className="flex w-1/2 flex-1 flex-col justify-center">
          <SelectCategory
            onCategorySelected={handleCategorySelected}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Notify me about...</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="all" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            All new messages
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="mentions" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Direct messages and mentions
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="none" />
                          </FormControl>
                          <FormLabel className="font-normal">Nothing</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          <Card className="w-full">
            {quiz && (
              <>
                <CardHeader>
                  <CardTitle>Q: {quiz.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  {quiz.options.map((option, index) => (
                    <div key={index} className="mb-4">
                      <RadioGroupItem value={option} />
                      <label className="ml-2">{option}</label>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button>Submit Answer</Button>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      )}

      {/* Modals */}
      <GameWon
        gameWon={gameWon}
        onSelectDifferentGame={onSelectDifferentGame}
      />
    </section>
  );
}

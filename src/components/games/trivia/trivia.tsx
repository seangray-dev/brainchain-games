import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { useToast } from "@/components/ui/use-toast";
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
  answer: z.string(),
});

interface Question {
  correct_index: number;
  options: string[];
  question: string;
}

export default function Trivia({ onSelectDifferentGame }: GameProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [gameWins, setGameWins] = useAtom(gameWinsAtom);
  const { toast } = useToast();
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const fetchQuestions = async (category: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/trivia`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
      });
      const data = await response.json();
      if (response.ok) {
        setQuestions(data.questions);
        questions;
        setCurrentQuestionIndex(0);
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (category) {
      fetchQuestions(category);
    }
  }, [category]);

  useEffect(() => {
    if (gameWon) {
      setGameWins((prevWins) => {
        const newWins = new Map(prevWins);
        newWins.set("trivia", true);
        return newWins;
      });
    }
  }, [gameWon, setGameWins]);

  const handleCategorySelected = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const correctOption = questions[currentQuestionIndex].correct_index;
    const isCorrect =
      questions[currentQuestionIndex].options[correctOption] === data.answer;

    if (isCorrect) {
      toast({ title: "Correct!", description: "Well done!" });

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        // if last question and all answered right
        if (correctAnswers + 1 === questions.length) {
          setGameWon(true);
          toast({
            title: "Congratulations!",
            description:
              "You've successfully answered all questions correctly!",
          });
        }
      }
      // increase correct answers count on correct response
      setCorrectAnswers((prev) => prev + 1);
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect",
        description: "Please try again.",
      });
    }
  }

  return (
    <section className="flex w-full flex-1 flex-col items-center justify-center">
      <h2 className="mb-10 text-5xl font-bold">Trivia</h2>
      {!category || isLoading ? (
        <div className="flex w-1/2 flex-1 flex-col justify-center">
          <SelectCategory
            onCategorySelected={handleCategorySelected}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-10">
          <Card className="w-full bg-secondary">
            <CardHeader>
              <CardTitle>
                <h3>{questions[currentQuestionIndex]?.question}</h3>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                <p>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </CardDescription>
            </CardContent>
          </Card>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        name="answer"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {questions[currentQuestionIndex]?.options.map(
                          (option, index: number) => (
                            <Card className="bg-secondary hover:border-primary">
                              <CardContent className="py-0">
                                <FormItem
                                  key={index}
                                  className="flex h-full w-full items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <RadioGroupItem value={option} />
                                  </FormControl>
                                  <FormLabel className="font-norma w-full p-4">
                                    {option}
                                  </FormLabel>
                                </FormItem>
                              </CardContent>
                            </Card>
                          ),
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
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

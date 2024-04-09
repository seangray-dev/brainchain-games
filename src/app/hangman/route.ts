import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `Generate a random word or sentence suitable for a hangman game and provide a single hint. Make it unique. Format the response as follows: {"word": "the_word", "hint": "the_hint"}.`,
      max_tokens: 30,
      temperature: 1,
    });

    const text = response.choices[0].text.trim();
    const { word, hint } = JSON.parse(text);
    console.log(word, hint);
    return NextResponse.json({ word, hint });
  } catch (error: any) {
    console.error("Error fetching word from OpenAI:", error);
    return new NextResponse(
      JSON.stringify({ status: "error", message: error.message }),
      { status: 500 },
    );
  }
}

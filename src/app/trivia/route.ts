import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const category = body.category;

  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `Generate five trivia questions about ${category}, each with four options. Return a JSON-formatted array where each element is an object with 'question', 'options' (an array), and 'correct_index' (an integer indicating the correct option).`,
      max_tokens: 1024,
      temperature: 0.7,
      n: 1,
    });

    const text = response.choices[0].text.trim();
    console.log("OpenAI Response:", text);

    // Attempt to parse JSON safely
    try {
      const questions = JSON.parse(text);
      return NextResponse.json({ questions });
    } catch (jsonError) {
      console.error("Failed to parse JSON:", jsonError);
      return NextResponse.json(
        { error: "Failed to parse trivia questions as JSON." },
        { status: 500 },
      );
    }
  } catch (error: any) {
    console.error("Error fetching trivia from OpenAI:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

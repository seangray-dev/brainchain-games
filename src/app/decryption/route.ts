import { openai } from "@/lib/openai";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const category = body.category as string;

    const promptText = `Provide a message related to ${category} that could be intriguing to decrypt in a game, along with a hint to aid in its decryption. The message should be simple, concise and reltatively easy to solve (maximum 3-4 words). The hint should be helpful. Format the response as: {"message": "the_message", "hint": "the_hint"}.`;

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: promptText,
      max_tokens: 40,
      temperature: 0.7,
    });

    const text = response.choices[0].text.trim();
    const { message, hint } = JSON.parse(text);
    console.log("message:", message);
    console.log("hint:", hint);
    return NextResponse.json({ message, hint });
  } catch (error: any) {
    console.error("Error fetching word from OpenAI:", error);
    return new NextResponse(
      JSON.stringify({ status: "error", message: error.message }),
      { status: 500 },
    );
  }
}

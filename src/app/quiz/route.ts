import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const category = body.category as string;

    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: "system",
          content: `Provide a question related to ${category} that could be intriguing to a trivia game, along with 4 options to the answers. Only one option will be correct. The quiz should be simple, concise and relatively easy to solve. Format the response as: {"question": "the_question", "options": ["option1", "option2", "option3", "option4"], "correct_option": "the_correct_option"}.`,
        },
      ],
    });

    let responseText = "";

    for await (const data of stream) {
      const content = data.choices[0]?.delta.content;
      if (content) {
        responseText += content;
      }
    }

    // Once all data has been received, send the response
    return new NextResponse(responseText, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching quiz from OpenAI:", error);
    return new NextResponse(
      JSON.stringify({ status: "error", message: error.message }),
      { status: 500 },
    );
  }
}

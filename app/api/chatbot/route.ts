import { InferenceClient } from "@huggingface/inference";
import { NextResponse } from "next/server";

const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY as string);

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    const chatCompletion = await client.chatCompletion({
      provider: "novita",
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [
        {
          role: "system",
          content: "You are a concise NASA assistant. Provide clear, complete answers but keep them brief and to the point. Aim for 2-3 sentences unless more detail is explicitly requested.",
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: "No response generated" }, { status: 500 });
    }

    return NextResponse.json({ answer: content });
  } catch (error) {
    console.error("Hugging Face API error:", error);
    return NextResponse.json({ error: "Failed to get response from Hugging Face API" }, { status: 500 });
  }
}

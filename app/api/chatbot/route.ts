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
          role: "user",
          content: question,
        },
      ],
    });

    const answer = chatCompletion.choices[0].message.content;

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Hugging Face API error:", error);
    return NextResponse.json({ error: "Failed to get response from Hugging Face API" }, { status: 500 });
  }
}

import { InferenceClient } from "@huggingface/inference";
import { NextResponse } from "next/server";

const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY as string);

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    // Create a new TransformStream for streaming the response
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const encoder = new TextEncoder();

    // Start the streaming response
    const streamingResponse = new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });

    // Process the chat completion in the background
    (async () => {
      try {
        const chatCompletion = await client.chatCompletion({
          provider: "novita",
          model: "meta-llama/Llama-3.1-8B-Instruct",
          messages: [
            {
              role: "system",
              content:
                "You are a concise NASA assistant. Provide clear, complete answers but keep them brief and to the point. Aim for 2-3 sentences unless more detail is explicitly requested. Refuse to answer questions that are not related to NASA or space exploration.",
            },
            {
              role: "user",
              content: question,
            },
          ],
        });

        const content = chatCompletion.choices[0]?.message?.content;
        if (!content) {
          await writer.write(encoder.encode("event: error\ndata: No response generated\n\n"));
          return;
        }

        // Stream the content word by word
        const words = content.split(" ");
        for (const word of words) {
          await writer.write(encoder.encode(`data: ${word} \n\n`));
          // Add a small delay between words for a more natural effect
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        // Send the end event
        await writer.write(encoder.encode("event: done\ndata: complete\n\n"));
      } catch (error) {
        console.error("Hugging Face API error:", error);
        await writer.write(encoder.encode("event: error\ndata: Failed to get response from Hugging Face API\n\n"));
      } finally {
        await writer.close();
      }
    })();

    return streamingResponse;
  } catch (error) {
    console.error("Request processing error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

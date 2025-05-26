"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon, ArrowLeft } from "lucide-react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function ChatbotPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      // Clear the question input after successful response
      setQuestion("");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let currentAnswer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const word = line.slice(6);
            // Don't add the completion marker to the displayed text
            if (word.trim() !== "complete") {
              currentAnswer += word;
              setAnswer(currentAnswer);
            }
          } else if (line.startsWith("event: error")) {
            throw new Error("Error from server");
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setAnswer("Sorry, there was an error processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col relative pt-12">
      <Link
        href="/"
        className="absolute top-4 left-4 flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>
      <div className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Ask NASA AI Assistant</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Ask anything about NASA, space exploration, astronomy..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyPress}
              rows={4}
              className="resize-none"
            />
            <Button
              onClick={askQuestion}
              className="w-full sm:w-auto"
              disabled={!question.trim() || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Thinking...
                </>
              ) : (
                <>
                  <SendIcon className="mr-2 h-4 w-4" />
                  Ask Question
                </>
              )}
            </Button>
            {answer && (
              <div className="mt-6 rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {answer}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

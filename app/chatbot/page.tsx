"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon } from "lucide-react";

export default function ChatbotPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askQuestion = async () => {
    if (!question.trim()) return;

    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <Card className="max-w-2xl min-w-2xl">
        <CardHeader>
          <CardTitle>Ask NASA AI Assistant</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Ask anything about NASA, space exploration, astronomy..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <Button
            onClick={askQuestion}
            className="w-full sm:w-auto"
            disabled={!question.trim()}
          >
            <SendIcon className="mr-2 h-4 w-4" />
            Ask Question
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
  );
}

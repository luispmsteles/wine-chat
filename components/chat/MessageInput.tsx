"use client";

import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props {
  onSendMessage: (input: string) => void;
  isGenerating: boolean;
}

export default function MessageInput({ onSendMessage, isGenerating }: Props) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  // const pasteText = (text: string) => {
  //   if (textareaRef.current) {
  //     setInput(text);
  //     textareaRef.current.focus();
  //   }
  // };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-main text-dark">What would you like to know?</p>
      <form onSubmit={handleSubmit} className="flex flex gap-2">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a question..."
          rows={3}
          className="resize-y py-3 px-4 border rounded-md focus:outline-none"
          disabled={isGenerating}
        />
        <Button type="submit" className="self-start" disabled={isGenerating}>
          {isGenerating ? "Thinking..." : "Send"}
        </Button>
      </form>
    </div>
  );
}

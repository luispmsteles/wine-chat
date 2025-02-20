"use client";
import { useEffect, useReducer, useRef } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

type ChatState = { messages: Message[]; isGenerating: boolean };
type ChatAction =
  | { type: "ADD_MESSAGE"; payload: Message }
  | { type: "SET_GENERATING"; payload: boolean };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "SET_GENERATING":
      return { ...state, isGenerating: action.payload };
    default:
      return state;
  }
};

export default function Chat({ initialPrompt }: { initialPrompt?: string }) {
  const [state, dispatch] = useReducer(chatReducer, { messages: [], isGenerating: false });
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const initialPromptSent = useRef(false); // Prevents duplicate prompt sending

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages]);

  // Send the initial prompt only once
  useEffect(() => {
    if (initialPrompt && !initialPromptSent.current) {
      initialPromptSent.current = true; // Mark as sent
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = async (input: string) => {
    if (!input.trim()) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content: input };
    dispatch({ type: "ADD_MESSAGE", payload: userMessage });
    dispatch({ type: "SET_GENERATING", payload: true });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: input }] }),
      });

      if (!response.ok) throw new Error("Failed to fetch AI response");

      const data = await response.json();
      const aiResponse: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
      };

      dispatch({ type: "ADD_MESSAGE", payload: aiResponse });
    } catch (error) {
      console.error("Error:", error);
      dispatch({
        type: "ADD_MESSAGE",
        payload: { id: crypto.randomUUID(), role: "assistant", content: "Error generating response." },
      });
    } finally {
      dispatch({ type: "SET_GENERATING", payload: false });
    }
  };

  return (
    <div className="flex flex-col gap-12 w-full bg-light">
      <MessageList messages={state.messages} />
      <div ref={chatEndRef} />
      <MessageInput onSendMessage={handleSendMessage} isGenerating={state.isGenerating} />
    </div>
  );
}

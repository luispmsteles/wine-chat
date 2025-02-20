import { useState } from "react";

interface Props {
  onSendMessage: (input: string) => void;
  isGenerating: boolean;
}

export default function MessageInput({ onSendMessage, isGenerating }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput(""); // Clear input after sending
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-main text-dark">What would you like to know?</p>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow py-3 px-4 border rounded-md focus:outline-none"
            disabled={isGenerating}
          />
          <button
            type="submit"
            className="px-4 py-3 bg-dark hover:bg-light text-light hover:text-dark border border-dark-secondary hover:border-light-secondary rounded-md disabled:opacity-50"
            disabled={isGenerating}
          >
            {isGenerating ? "..." : "Send"}
          </button>
        </form>

      </div>
    </>
  );
}

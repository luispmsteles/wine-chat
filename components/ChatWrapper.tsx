"use client";
import { useState } from "react";
import Chat from "./Chat";
import Image from "next/image";

export default function ChatWrapper() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [prompt, setPrompt] = useState("");

    // Example suggested prompts
    const suggestions = [
        { prompt: "What wine pairs well with steak?", user: "João Silva", location: "Porto" },
        { prompt: "Tell me about French wines", user: "Ana Pereira", location: "Lisboa" },
        { prompt: "Best wines for beginners?", user: "Carlos Mendes", location: "Coimbra" },
        { prompt: "Difference between red and white wines?", user: "Sofia Rodrigues", location: "Faro" }
    ];

    // Handles user input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    };

    // Handles user submission (Enter key)
    const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && prompt.trim() !== "") {
            setIsChatOpen(true);
        }
    };

    // Handles clicking a suggestion
    const handleSuggestionClick = (text: string) => {
        setPrompt(text);
        setIsChatOpen(true);
    };

    return (
        <div className="w-full">
            {/* Hero Section (Always Visible, But Adjusts on Chat Open) */}
            <div
                className={`bg-neutral-tertiary text-center w-full transition-all duration-300 ${isChatOpen ? "pt-2 pb-[26px]" : "min-h-[437px] pt-[160px]"
                    }`}
            >
                <div className="max-w-screen-2xl mx-auto px-4 md:px-8 flex flex-col gap-8 justify-between items-center">
                    <div className="space-y-2">
                        <h1 className={`text-dark transition-all duration-300 ${isChatOpen ? "text-h2" : "text-h1"}`}>
                            Everything about wine
                        </h1>
                        <h3 className={`text-neutral-quaternary transition-all duration-300 ${isChatOpen ? "text-h5" : "text-h3"}`}>
                            What would you like to know?
                        </h3>
                    </div>

                    {/* Input disappears when chat opens */}
                    {!isChatOpen && (
                        <input
                            type="text"
                            value={prompt}
                            onChange={handleInputChange}
                            onKeyDown={handleInputSubmit}
                            placeholder="Type your question..."
                            className="mb-[53px] w-full md:w-[60%] px-4 py-3 border border-light-secondary rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    )}
                </div>
            </div>

            {/* Suggestions Section (Disappears when Chat Opens) */}
            {!isChatOpen && (
                <div className="bg-light w-full">
                    <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-16 flex flex-col gap-12 items-start justify-start">
                        <div className="flex flex-col gap-2">
                            <h4 className="text-h4 text-dark">Suggestions</h4>
                            <p className="text-main text-neutral-quaternary">Get an immediate answer</p>
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion.prompt)}
                                    className="p-6 w-full flex flex-col items-start justify-between gap-6 border rounded-md cursor-pointer hover:bg-neutral-tertiary transition"
                                >
                                    <h4 className="text-h4 text-dark">{suggestion.prompt}</h4>
                                    <div className="flex gap-3">
                                        <Image
                                            src="/images/user.png"
                                            height={40}
                                            width={40}
                                            alt="user"
                                            className="rounded-full object-cover"
                                        />
                                        <div className="flex flex-col gap-[2px]">
                                            <p className="text-strong text-neutral-quaternary">{suggestion.user}</p>
                                            <p className="text-main text-neutral-secondary">{suggestion.location}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Chat Component (Only Shows After Input or Suggestion Click) */}
            {isChatOpen && <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-16 flex flex-col gap-12"><Chat initialPrompt={prompt} /></div>}
        </div>
    );
}

"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Chat from "./Chat";
import Suggestions from "./Suggestions";

interface Question {
    question: string;
    location: string;
}

export default function ChatWrapper() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [suggestions, setSuggestions] = useState<Question[]>([]);

    useEffect(() => {
        const fetchLatestQuestions = async () => {
            try {
                const response = await fetch("/api/latest-questions");
                if (!response.ok) throw new Error("Failed to fetch questions");

                const data: Question[] = await response.json();
                setSuggestions(data);
            } catch (error) {
                console.error("Error fetching latest questions:", error);
            }
        };

        fetchLatestQuestions();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    };

    const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && prompt.trim() !== "") {
            setIsChatOpen(true);
        }
    };

    const handleSuggestionClick = (text: string) => {
        setPrompt(text);
        setIsChatOpen(true);
    };

    return (
        <div className="w-full">

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`bg-neutral-tertiary text-center w-full transition-all duration-300 ${isChatOpen ? "pt-2 pb-[26px]" : "min-h-[437px] pt-[160px]"}`}
            >
                <div className="max-w-screen-2xl mx-auto px-4 md:px-8 flex flex-col gap-8 justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-2"
                    >
                        <h1 className={`text-dark transition-all duration-300 ${isChatOpen ? "text-h2" : "text-h1"}`}>
                            Everything about wine
                        </h1>
                        <h3 className={`text-neutral-quaternary transition-all duration-300 ${isChatOpen ? "text-h5" : "text-h3"}`}>
                            What would you like to know?
                        </h3>
                    </motion.div>
                    
                    {!isChatOpen && (
                        <motion.input
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            type="text"
                            value={prompt}
                            onChange={handleInputChange}
                            onKeyDown={handleInputSubmit}
                            placeholder="Type your question..."
                            className="mb-[53px] w-full md:w-[60%] px-4 py-3 border border-light-secondary rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    )}
                </div>
            </motion.div>

            {/* Suggestions Section */}
            {!isChatOpen && (
                <div className="bg-light w-full">
                    <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-16 flex flex-col gap-12 min-h-[350px]">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="flex flex-col gap-2"
                        >
                            <h4 className="text-h4 text-dark">Suggestions</h4>
                            <p className="text-main text-neutral-quaternary">Get an immediate answer</p>
                        </motion.div>
                        {suggestions.length > 0 && (
                            <Suggestions suggestions={suggestions} onSuggestionClick={handleSuggestionClick} />
                        )}
                    </div>
                </div>
            )}

            {/* Chat Component */}
            {isChatOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="max-w-screen-2xl mx-auto px-8 md:px-16 py-16 flex flex-col gap-12"
                >
                    <Chat initialPrompt={prompt} />
                </motion.div>
            )}
        </div>
    );
}

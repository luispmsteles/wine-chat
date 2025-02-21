"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface Question {
  question: string;
  location: string;
}

interface SuggestionsProps {
  suggestions: Question[];
  onSuggestionClick: (text: string) => void;
}

export default function Suggestions({ suggestions, onSuggestionClick }: SuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              onClick={() => onSuggestionClick(suggestion.question)}
              className="p-6 w-full flex flex-col items-start justify-between gap-6 border rounded-md cursor-pointer hover:bg-neutral-tertiary transition"
            >
              <h4 className="text-h4 text-dark">{suggestion.question}</h4>
              <div className="flex gap-3">
                <Image
                  src="/images/user.png"
                  height={40}
                  width={40}
                  alt="user"
                  className="rounded-full object-cover"
                />
                <div className="flex flex-col gap-[2px]">
                  <p className="text-strong text-neutral-quaternary">Username</p>
                  <p className="text-main text-neutral-secondary">{suggestion.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
    </>
  );
}

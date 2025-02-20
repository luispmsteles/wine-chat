import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface Props {
  role: "user" | "assistant";
  content: string;
}

export default function MessageBubble({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} // Start hidden and slightly below
      animate={{ opacity: 1, y: 0 }} // Fade in and move up
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`py-2 rounded-lg ${
        isUser ? "text-h4 text-dark" : "text-main text-dark"
      }`}
    >
      {isUser ? (
        content
      ) : (
        <ReactMarkdown>{content}</ReactMarkdown>
      )}
    </motion.div>
  );
}

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface Props {
  role: "user" | "assistant";
  content: string;
}

export default function MessageBubble({ role, content }: Props) {
  const isUser = role === "user";
  const paragraphs = content.split("\n");
  const sentences = content.match(/[^.!?]+[.!?]/g) || [];
  const secondSentence = sentences.length > 1 ? sentences[1].trim() : null;

  // For copying the sentence to prompt input on click
  //
  // const handleSentenceClick = () => {
  //   if (secondSentence) {
  //     if (navigator.clipboard) {
  //       navigator.clipboard.writeText(secondSentence);
  //       const textarea = document.querySelector<HTMLTextAreaElement>("textarea");
  //       if (textarea) {
  //         textarea.value = secondSentence; // Paste into input field
  //         textarea.focus(); // Focus input for better UX
  //       }
  //     }
  //   }
  // };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`py-2 rounded-lg ${isUser ? "text-h4 text-dark" : "text-main text-dark"}`}
    >
      {isUser ? (
        content
      ) : (
        <motion.div
          className="flex flex-col gap-4 mb-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* {sentences.map((sentence, index) => ( // For copying the sentence and paste it the input field
            <motion.span
              key={index}
              className={index === 1 ? "cursor-pointer text-blue-500 underline" : ""}
              onClick={index === 1 ? handleSentenceClick : undefined}
            >
              {sentence + (index < sentences.length - 1 ? ". " : "")}
            </motion.span>
          ))} */}
          {paragraphs.map((line, index) => (
            <motion.div key={index} variants={lineVariants}>
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h6 className="text-h6">{children}</h6>,
                  h2: ({ children }) => <h6 className="text-h6">{children}</h6>,
                  h3: ({ children }) => <h6 className="text-h6">{children}</h6>,
                  h4: ({ children }) => <h6 className="text-h6">{children}</h6>,
                  h5: ({ children }) => <h6 className="text-h6">{children}</h6>,
                  h6: ({ children }) => <h6 className="text-h6">{children}</h6>,
                }}
              >
                {line}
              </ReactMarkdown>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

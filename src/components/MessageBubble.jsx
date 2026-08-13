import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import 'katex/dist/katex.min.css';

const MessageBubble = ({ sender, message }) => {
  const isUser = sender === "USER";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col w-full min-w-0 ${isUser ? "items-end" : "items-start"}`}
    >
      
      <motion.div 
        animate={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`text-base min-w-0 leading-relaxed transition-all duration-200 overflow-x-auto ${
          isUser 
            ? "mt-2 mb-5 px-4 py-2.5 max-w-[80%] cursor-default border border-transparent bg-white/10 text-white rounded-2xl rounded-tr-sm hover:bg-white/[0.14] hover:border-white/5" 
            : "text-white/80 w-full"
        }`}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap wrap-break-word">
            {message}
          </div>
        ) : (
          <div className="prose prose-invert max-w-none prose-p:text-white/80 prose-base">
            <ReactMarkdown 
              remarkPlugins={[[remarkGfm, { singleTilde: false }], remarkMath]}
              rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: false, errorColor: 'inherit' }]]}
            >
              {message}
            </ReactMarkdown>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MessageBubble;
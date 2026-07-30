import React from "react";
import { motion } from "framer-motion";

const MessageBubble = ({ sender, message }) => {
  const isUser = sender === "USER";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
    >
      
      {/* Upgraded inner capsule to motion.div for localized micro-interactions */}
      <motion.div 
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`px-4 py-2.5 text-sm leading-relaxed max-w-[80%] cursor-default transition-all duration-200 border border-transparent ${
          isUser 
            ? "bg-white/10 text-white rounded-2xl rounded-tr-sm hover:bg-white/[0.14] hover:border-white/5" 
            : "bg-white/5 text-white/80 rounded-2xl rounded-tl-sm hover:bg-white/8 hover:border-white/5"
        }`}
      >
        {message}
      </motion.div>
    </motion.div>
  );
};

export default MessageBubble;
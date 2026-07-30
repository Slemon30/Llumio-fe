import React from "react";

const ChatHistory = ({ chatHistory, oldChatCallback }) => {

  const loadChat = (chatId) => (e) => {
    e.preventDefault();
    oldChatCallback(chatId);
  }

  return (
    <nav className="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar">
      <p className="px-2 text-[10px] text-white/20 uppercase tracking-widest mb-3">
        Recent
      </p>
      {chatHistory.map((chat) => (
        <button
          key={chat._id}
          onClick={loadChat(chat._id)}
          className="w-full text-left px-2 py-2 rounded-lg hover:bg-white/5 text-xs text-white/50 hover:text-white/80 transition-colors truncate flex items-center justify-between group"
        >
          <span className="truncate">{chat.messages[0].message}</span>
          
          {/* Optional: Added a subtle timestamp that appears on hover for a premium feel */}
          <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-2 text-white/30">
            {chat.latestModel}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default ChatHistory;
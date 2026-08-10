import ChatHistory from "./ChatHistory";
import { useState, useEffect } from "react";
import API from "../api";

const Sidebar = ({newChat, callback, selectedChatCallback}) => {
  const [chatHistoryList, setChatHistoryList] = useState([]);
  const [chatHistoryExists, setChatHistoryExists] = useState(false);

const handleChatHistoryList = async () => {
    try {
      const chatList = await API.get('/chat/allchats', {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      });
      setChatHistoryList(chatList.data.chats);
      console.log(chatList);
    } catch (error) {
      console.log(`Failed to fetch chat history list : ${error.message}`);
    }
  }

  useEffect(() => {
    handleChatHistoryList();
  }, [newChat])


  const createNewChat = (e) => {
    e.preventDefault();
    if (newChat) {
      return;
    }
    callback(true);
  }

  const handleSelectedChat = (chatId) => {
    selectedChatCallback(chatId);
    callback(false);
  }
  return (
    <aside className="w-56 bg-[#0F0F0F] border-r border-white/5 flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="object-center text-md font-bold tracking-[0.18em] uppercase text-white/90">
            Llum<span className="text-center text-white/40 font-medium">io</span>
          </span>
        </div>
      </div>

      {/* New Chat */}
      <button 
        onClick={createNewChat}
        className="mx-4 mt-4 py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-white/80 transition-colors"
      >
        + New chat
      </button>
      <ChatHistory 
      chatHistory={chatHistoryList}
      oldChatCallback={handleSelectedChat}
       />

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/5">
        <button className="w-full text-left text-xs text-white/20 hover:text-white/40 transition-colors">
          Settings
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
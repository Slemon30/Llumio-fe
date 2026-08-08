import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";
import PromptWindow from "./PromptWindow";
import Wallet from "./Wallet";
import ModelSelector from "./ModelSelector";
import Sidebar from "./Sidebar";
import { modelsList } from "../constants/Models";
import API from "../api";

const Dashboard = () => {
  const [walletBalance, setWalletBalance] = useState(242.30);
  const [activeModel, setActiveModel] = useState("gemini-2.5-flash");
  const [activeProvider, setActiveProvider] = useState("gemini");
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isNewChatPresent, setIsNewChatPresent] = useState(true);
  const [inputTokens, setInputTokens] = useState(0);
  const [outputTokens, setOutputTokens] = useState(0);
  const [chatId, setChatId] = useState("");
  const [insufficientTokens, setInsufficientTokens] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
  if (insufficientTokens) {
    const timer = setTimeout(() => {
      setInsufficientTokens(false);
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [insufficientTokens]);

  useEffect(() => {
    async function fetchUserBalance() {
    try {
      const userBalance = await API.get('user/balance', {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      });

      if (userBalance.data.statusCode === 200) {
        setWalletBalance(userBalance.data.walletBalance);
      }
    } catch (error) {
      console.log(`Failed to retrieve user balance : ${error.message}`);
    }
  }
  fetchUserBalance();
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleModelResponse = (data) => {

    if (data.statusCode === 402) {
      setInsufficientTokens(true);
      return;
    }
    const updatedMessages = [
      ...messages,
      {sender: "USER", message: inputText},
      {sender: "LLM", message: data.llmResponse}
    ];
    setMessages(updatedMessages);
    setInputText("");
    setInputTokens(data.inputTokens);
    setOutputTokens(data.outputTokens);
    setWalletBalance(data.walletBalance);
  };

  const handleNewChat = (response) => {
    setIsNewChatPresent(response);
    if (response === true) {
      setMessages([]);
      setInputText("");
      setChatId("");
    }
  };

  const loadOldChat = async (chatId) => {
    try {
      const selectedChat = await API.get(`chat/${chatId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      });

      if (selectedChat.data.statusCode === 200) {
        setMessages(selectedChat.data.chat.messages);
        setInputText("");
        setActiveModel(selectedChat.data.chat.latestModel);
        setActiveProvider(selectedChat.data.chat.latestProvider);
        setIsNewChatPresent(false);
        setChatId(chatId);
      }
      
    } catch (error) {
      console.log(`Failed to load chat: ${error.message}`);
    }
  }

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white font-sans antialiased overflow-hidden">
      
      {/* Sleek Custom Scrollbar Style Engine */}
      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.08) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 9999px;
          transition: background 0.2s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>
      
        <AnimatePresence>
        {insufficientTokens && (
          <motion.div
            initial={{ opacity: 0, x: 50, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-950/80 border border-red-500/30 text-red-200 text-sm shadow-2xl backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Low funds: Please top up your wallet.</span>
            <button
              onClick={() => setInsufficientTokens(false)}
              className="ml-2 text-red-400 hover:text-white transition-colors text-xs"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= SIDEBAR ================= */}
      <Sidebar
      newChat = {isNewChatPresent}
      callback = {handleNewChat}
      selectedChatCallback={loadOldChat}
      />

      {/* ================= MAIN ================= */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0A0A0A]">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0A0A0A]">
          {/* Models */}
            <ModelSelector 
            modelsList={modelsList}
            activeModel={activeModel}
            selectedModel={setActiveModel}
            selectedProvider={setActiveProvider}
            isStreaming={isStreaming}
          />

          {/* Decoupled Wallet Widget */}
          <Wallet
            balance={walletBalance} 
            onTopUp={(amt) => setWalletBalance((prev) => prev + amt)}
          />
        </div>

        {/* Messages Viewport */}
        <section className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
          <div className="max-w-3xl mx-auto min-h-full flex flex-col">
            {messages?.length === 0 ? (
              <div className="flex-1 flex items-center justify-center select-none pointer-events-none">
                <motion.h1 
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-4xl md:text-5xl font-medium tracking-tight bg-linear-to-r from-white via-white/90 to-white/30 bg-clip-text text-transparent text-center px-4 py-2 leading-tight"
                >
                  What's on your mind today?
                </motion.h1>
              </div>
            ) : (
              <div className="space-y-4 w-full flex-1">
                {messages.map((msg, index) => (
                  <MessageBubble
                    key={index}
                    sender={msg.sender}
                    message={msg.message}
                  />
                ))}
                
                {isStreaming && (
                  <div className="flex items-center gap-2 text-xs text-white/20 font-mono pl-4">
                    <span className="w-1 h-1 rounded-full bg-white/20 animate-pulse" />
                    <span>Streaming...</span>
                  </div>
                )}
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </section>

        {/* Input */}
        <PromptWindow
          value={inputText}
          model={activeModel}
          provider={activeProvider}
          onChange={setInputText}
          modelCallback={handleModelResponse}
          newChat={isNewChatPresent}
          newChatCallback={handleNewChat}
          chatId={chatId}
          chatIdCallback={setChatId}
        />

      </main>
    </div>
  );
};

export default Dashboard;
import { useRef, useEffect, useState } from "react";
import API from "../api";
import { modelsList } from "../constants/Models";
const PromptWindow = ({
  value,
  model,
  provider,
  onChange,
  modelCallback,
  newChat,
  newChatCallback,
  chatId,
  chatIdCallback,
}) => {
  const textareaRef = useRef(null);
  const [llmResponseLoading, setLlmResponseLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(chatId);
  const currentModel = (modelsList.find((m) => m.model === model && m.provider === provider))

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 180);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [value]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLlmResponseLoading(true);
    try {
      if (!value.trim()) {
        return;
      }
      let response;
      if (newChat === true) {
        response = await API.post('chat/newchat', {
          model: model,
          provider: provider,
          message: value
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`
          }
        }
      );
        newChatCallback(false);
        chatIdCallback(response.data.chatId);
        setCurrentChatId(response.data.chatId);
      }
      else {
        response = await API.post('chat/chat', {
          chatId: currentChatId,
          model: model,
          provider: provider,
          message: value,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`
          }
        })
      }
      
      if (response.data.statusCode === 201 || response.data.statusCode === 200) {
        modelCallback(response.data);
        console.log('Message sent successfully');
      }

    } catch (error) {
      console.log(`Failed to send message to model : ${error.message}`);
      if(error.response.status === 402) {
        console.log("Insufficient credits");
        modelCallback(error.response.data);
      }
    }
    setLlmResponseLoading(false);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="px-6 py-4 border-t border-white/5 bg-[#0A0A0A]">
      <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
        <div className="relative bg-white/5 rounded-xl border border-white/5 focus-within:border-white/10 transition-colors">
          {/* Applied the .custom-scrollbar class here */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full bg-transparent outline-none text-sm text-white placeholder-white/20 px-4 py-3 resize-none min-h-11 max-h-45 custom-scrollbar"
          />
          
          <div className="flex items-center justify-between px-4 pb-2.5">
            <div className="text-[10px] text-white/20 font-mono">
              Input Price ${currentModel.inputPrice}  · Output Price ${currentModel.outputPrice}
            </div>
            <button
              type="submit"
              disabled={!value.trim() || llmResponseLoading}
              className="px-4 py-1 text-xs rounded bg-white/10 hover:bg-white/20 disabled:opacity-20 text-white/60 hover:text-white transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PromptWindow;
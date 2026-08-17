import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ShareWindow = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

  // Example placeholder link
  const shareUrl = "https://your-app.com/share/c/8f92a1b4";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

    return (
        <div>

        <motion.div
              animate={{ y: 0 }}
              transition={{ ease: "easeInOut", duration: 0.5, opacity: {ease: "linear"} }}
            className="relative">
              
              <button className="flex items-center gap-1.5 px-4 py-1.5 bg-white/4 border border-white/5 hover:bg-white/8 rounded-full text-xs font-medium text-white transition-all duration-200"
              onClick={() => setIsOpen(true)}>
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-6L12 3m0 0l4.5 7.5M12 3v13.5" />
                </svg>
                <span>Share</span>
              </button>
            </motion.div>

            {isOpen && (
            <AnimatePresence>
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                    {/* Click outside to close backdrop */}
          <div 
            className="absolute inset-0" 
            onClick={() => setIsOpen(false)} />

          {/* Modal Container */}
          <div className="relative w-full max-w-md bg-[#121212] border border-white/10 rounded-2xl p-6 shadow-2xl text-white z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white/90">Share public link</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content Description */}
            <p className="text-sm text-white/60 mb-5">
              Anyone with this link will be able to view this chat.
            </p>

            {/* Link Box & Copy Button */}
            <div className="flex items-center gap-2 p-2 bg-black/40 border border-white/10 rounded-xl mb-6">
              <input 
                type="text" 
                readOnly 
                value={shareUrl} 
                className="w-full bg-transparent px-2 text-xs text-white/70 focus:outline-none truncate"
              />
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black hover:bg-white/90 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5" />
                    </svg>
                    <span>Copy link</span>
                  </>
                )}
              </button>
            </div>

            {/* Footer / Info */}
            <div className="text-xs text-white/40 border-t border-white/5 pt-4">
              Link updated automatically when new messages are added.
            </div>
          </div>
        </div>
            </AnimatePresence>
            )}
        </div>
    )
}

export default ShareWindow;
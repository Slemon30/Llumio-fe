import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ModelSelector = ({ modelsList, activeModel, selectedModel, selectedProvider, isStreaming }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const currentModel = modelsList.find((m) => m.model === activeModel);

  // Close dropdown on outside click and reset search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        // Optional: clear search on close so it's fresh next time
        setTimeout(() => setSearchQuery(""), 200); 
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter models based on search input (checks both label and sub-text)
  const filteredModels = useMemo(() => {
    if (!searchQuery.trim()) return modelsList;
    const lowerQuery = searchQuery.toLowerCase();
    return modelsList.filter(
      (m) =>
        m.model.toLowerCase().includes(lowerQuery) ||
        m.provider.toLowerCase().includes(lowerQuery)
    );
  }, [modelsList, searchQuery]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => !isStreaming && setIsOpen(!isOpen)}
        disabled={isStreaming}
        className="flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-xs transition-all duration-200 min-w-40 disabled:opacity-50"
      >
        <div className="flex flex-col items-start">
          <span className="text-[9px] text-white/40 uppercase tracking-wider mb-0.5">Engine</span>
          <span className="text-white/90 font-medium">
            {currentModel ? currentModel.model : "Select Model"}
          </span>
        </div>
        
        {/* Animated Chevron */}
        <svg 
          className={`w-3.5 h-3.5 text-white/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute left-0 mt-2 w-64 bg-[#0F0F0F] border border-white/5 rounded-lg shadow-2xl shadow-black/50 z-50 overflow-hidden flex flex-col"
          >
            {/* Search Header (Sticky) */}
            <div className="p-2 border-b border-white/5 bg-[#0F0F0F]">
              <div className="relative flex items-center">
                <svg 
                  className="w-3.5 h-3.5 text-white/40 absolute left-2.5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search engines..."
                  className="w-full bg-white/5 border border-transparent focus:border-white/10 hover:bg-white/10 transition-colors outline-none text-xs text-white placeholder-white/30 rounded-md py-1.5 pl-8 pr-3"
                />
              </div>
            </div>

            {/* Scrollable Model List */}
            <div className="max-h-80 overflow-y-auto custom-scrollbar p-1.5 space-y-0.5">
              {filteredModels.length > 0 ? (
                filteredModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      selectedModel(model.model);
                      selectedProvider(model.provider);
                      setIsOpen(false);
                      setSearchQuery(""); // Reset on select
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-md text-xs transition-colors flex items-center justify-between ${
                      activeModel === model.model
                        ? "bg-white/10 text-white"
                        : "text-white/50 hover:bg-white/5 hover:text-white/90"
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">{model.model}</span>
                      <span className="text-[10px] opacity-50">{model.provider}</span>
                    </div>
                    
                    {/* Active Indicator Dot */}
                    {activeModel === model.model && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                    )}
                  </button>
                ))
              ) : (
                <div className="px-3 py-6 text-center text-xs text-white/40">
                  No engines found matching "{searchQuery}"
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModelSelector;
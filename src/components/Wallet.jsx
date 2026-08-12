import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Wallet = ({ balance, onTopUp }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSimulateTopUp = (amount) => {
    onTopUp(amount);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/4 border border-white/5 hover:bg-white/8 text-xs transition-all duration-200"
      >
        <span className="text-white/40 font-medium tracking-wide">Balance:</span>
        <span className="font-mono font-semibold text-white/90">{balance.toFixed(2)}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute right-0 mt-2 w-56 bg-[#0F0F0F] border border-white/5 rounded-lg p-4 shadow-xl z-50"
          >
            <p className="text-xs text-white/40 mb-3">Add funds</p>
            <div className="grid grid-cols-3 gap-1.5">
              {[100, 250, 500].map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleSimulateTopUp(amt)}
                  className="py-1.5 rounded bg-white/5 hover:bg-white/10 text-xs text-white/60 transition-colors"
                >
                  {amt}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wallet;
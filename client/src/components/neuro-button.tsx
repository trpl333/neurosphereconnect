import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Activity, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NeuroButtonProps {
  onStateChange?: (state: 'idle' | 'listening' | 'processing') => void;
}

export function NeuroButton({ onStateChange }: NeuroButtonProps) {
  const [state, setState] = useState<'idle' | 'listening' | 'processing'>('idle');

  const handlePress = () => {
    if (state === 'idle') {
      setState('listening');
      onStateChange?.('listening');
    } else if (state === 'listening') {
      setState('processing');
      onStateChange?.('processing');
      // Mock processing delay
      setTimeout(() => {
        setState('idle');
        onStateChange?.('idle');
      }, 2000);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-64 h-64" data-testid="neuro-button-container">
      {/* Outer Rings - Animated */}
      <AnimatePresence>
        {state === 'listening' && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0.2, 0.5, 0], scale: [1, 1.4, 1.6] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border border-primary/50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0.2, 0.4, 0], scale: [1, 1.2, 1.4] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 0.5 }}
              className="absolute inset-0 rounded-full border border-primary/30"
            />
          </>
        )}
      </AnimatePresence>

      {/* Processing Ring */}
      {state === 'processing' && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="absolute inset-0 rounded-full border-t-2 border-primary opacity-100"
        />
      )}

      {/* Core Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePress}
        className={cn(
          "relative z-10 flex items-center justify-center w-40 h-40 rounded-full transition-all duration-500",
          "bg-gradient-to-b from-zinc-800 to-black border-4 border-zinc-800/50 shadow-2xl",
          state === 'idle' && "shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)] border-zinc-700",
          state === 'listening' && "shadow-[0_0_60px_-10px_rgba(6,182,212,0.8)] border-primary",
          state === 'processing' && "shadow-[0_0_30px_-10px_rgba(6,182,212,0.5)] border-primary/50"
        )}
        data-testid="button-main-interaction"
      >
        <div className={cn(
          "absolute inset-2 rounded-full bg-gradient-to-br from-zinc-900 to-black opacity-90 flex items-center justify-center overflow-hidden",
          state === 'listening' && "from-zinc-900 to-zinc-950"
        )}>
           {/* Inner Glow/Texture */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),transparent_70%)]" />
           
           {/* Icon */}
           <motion.div
             animate={{ 
               scale: state === 'listening' ? [1, 1.1, 1] : 1,
               opacity: state === 'processing' ? 0.5 : 1
             }}
             transition={{ repeat: state === 'listening' ? Infinity : 0, duration: 1.5 }}
           >
             {state === 'processing' ? (
               <Loader2 className="w-12 h-12 text-primary animate-spin" />
             ) : (
               <Mic className={cn(
                 "w-12 h-12 transition-colors duration-300",
                 state === 'listening' ? "text-primary drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" : "text-zinc-400"
               )} />
             )}
           </motion.div>
        </div>
      </motion.button>

      {/* Status Text Below */}
      <div className="absolute -bottom-12 font-tech text-lg tracking-widest text-primary/80 uppercase">
        {state === 'idle' && 'Hold to Talk'}
        {state === 'listening' && 'Listening...'}
        {state === 'processing' && 'Processing...'}
      </div>
    </div>
  );
}

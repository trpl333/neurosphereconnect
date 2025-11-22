import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="relative flex items-center justify-center w-[340px] h-[340px]" data-testid="neuro-button-container">
      
      {/* Outer Glow - Ambient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/20 via-pink-600/20 to-orange-600/20 blur-3xl animate-pulse" />

      {/* SVG for Curved Text */}
      <div className="absolute inset-0 z-20 pointer-events-none animate-[spin_60s_linear_infinite]">
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <defs>
            <path id="textPathTop" d="M 75,150 A 75,75 0 0,1 225,150" />
            <path id="textPathBottom" d="M 75,150 A 75,75 0 0,0 225,150" />
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          
          <text className="font-display font-bold text-[13px] tracking-[0.25em] fill-white/80 uppercase" style={{ filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.8))' }}>
            <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
              Enter The
            </textPath>
          </text>
          
          <text className="font-display font-bold text-[10px] tracking-[0.2em] fill-white/60 uppercase" style={{ filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.8))' }}>
             <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
               NeuroSphere Universe
             </textPath>
          </text>
        </svg>
      </div>

      {/* Portal Ring - The "Neon Portal" */}
      <motion.div 
        className="absolute inset-[45px] rounded-full z-10"
        style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 45%, #f59e0b 100%)',
          padding: '6px', // Thickness of the neon ring
          boxShadow: '0 0 30px -5px rgba(219, 39, 119, 0.6), inset 0 0 20px -5px rgba(219, 39, 119, 0.4)'
        }}
        animate={state === 'listening' ? { 
          boxShadow: ['0 0 30px -5px rgba(219, 39, 119, 0.6)', '0 0 60px -5px rgba(245, 158, 11, 0.8)', '0 0 30px -5px rgba(219, 39, 119, 0.6)'],
          scale: [1, 1.02, 1]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Inner Black Void */}
        <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
           {/* Inner Shadow/Depth */}
           <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_10px_rgba(0,0,0,0.8)] z-20 pointer-events-none" />
           
           {/* Button Interaction Surface */}
           <button
             onClick={handlePress}
             className="relative z-30 w-full h-full rounded-full flex items-center justify-center group active:scale-95 transition-transform duration-200 outline-none"
             data-testid="button-main-interaction"
           >
              {/* The "NS" Logo */}
              <div className="flex flex-col items-center justify-center">
                <h1 className="font-display text-7xl font-bold tracking-tighter neon-gradient-text drop-shadow-lg select-none group-hover:scale-105 transition-transform">
                  NS
                </h1>
                
                {/* State Indicator (Text below NS) */}
                <AnimatePresence mode="wait">
                  {state === 'listening' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-[70%] font-tech text-xs tracking-widest text-pink-500 uppercase"
                    >
                      Listening
                    </motion.div>
                  )}
                   {state === 'processing' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-[70%] font-tech text-xs tracking-widest text-orange-500 uppercase animate-pulse"
                    >
                      Thinking
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
           </button>
        </div>
      </motion.div>

      {/* Pulse Rings (When Listening) */}
      <AnimatePresence>
        {state === 'listening' && (
           <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.3, 0], scale: 1.3 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
              className="absolute inset-[50px] rounded-full border border-pink-500/50 z-0"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.2, 0], scale: 1.5 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut", delay: 0.3 }}
              className="absolute inset-[50px] rounded-full border border-purple-500/40 z-0"
            />
           </>
        )}
      </AnimatePresence>

    </div>
  );
}

import { motion, AnimatePresence } from 'framer-motion';

interface TranscriptionViewProps {
  state: 'idle' | 'listening' | 'processing';
}

export function TranscriptionView({ state }: TranscriptionViewProps) {
  return (
    <div className="h-32 w-full max-w-2xl mx-auto flex items-center justify-center px-4 text-center mb-8" data-testid="transcription-area">
      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.p
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-zinc-600 font-tech text-lg tracking-wide"
          >
            System Ready. Awaiting Input.
          </motion.p>
        )}
        {state === 'listening' && (
          <motion.div
             key="listening"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="flex gap-1 items-center h-8"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [10, 24, 10] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                className="w-1 bg-primary/50 rounded-full"
              />
            ))}
          </motion.div>
        )}
        {state === 'processing' && (
          <motion.p
            key="processing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-primary font-mono text-sm"
          >
            &gt; Analyzing voice pattern...
            <br/>
            &gt; Querying neural core...
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

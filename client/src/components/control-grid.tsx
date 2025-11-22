import { motion } from 'framer-motion';
import { 
  Phone, Brain, FileText, Tv, Clapperboard, 
  Home, Shield, Users, Sliders, Book 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureButtonProps {
  icon: React.ElementType;
  label: string;
  delay?: number;
}

function FeatureButton({ icon: Icon, label, delay = 0 }: FeatureButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-primary/50 transition-all group"
      data-testid={`feature-btn-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <Icon className="w-6 h-6 text-zinc-400 group-hover:text-primary transition-colors mb-2" />
      <span className="font-tech text-xs tracking-wider text-zinc-500 group-hover:text-zinc-300 uppercase text-center">
        {label}
      </span>
    </motion.button>
  );
}

export function ControlGrid() {
  const features = [
    { icon: Phone, label: 'Call Control' },
    { icon: Brain, label: 'Memory' },
    { icon: FileText, label: 'Intelligence' },
    { icon: Tv, label: 'Cast to TV' },
    { icon: Clapperboard, label: 'Scene ID' },
    { icon: Home, label: 'Automation' },
    { icon: Shield, label: 'Insurance' },
    { icon: Users, label: 'CRM' },
    { icon: Sliders, label: 'Personality' },
    { icon: Book, label: 'Knowledge' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-4xl mx-auto px-4">
      {features.map((feature, index) => (
        <FeatureButton 
          key={feature.label} 
          icon={feature.icon} 
          label={feature.label} 
          delay={0.5 + (index * 0.05)}
        />
      ))}
    </div>
  );
}

import { useState } from 'react';
import { NeuroButton } from '@/components/neuro-button';
import { StatusDisplay } from '@/components/status-display';
import { ControlGrid } from '@/components/control-grid';
import { TranscriptionView } from '@/components/transcription-view';
import bgImage from '@assets/generated_images/dark_high-tech_abstract_background_for_enterprise_interface.png';

export default function Home() {
  const [appState, setAppState] = useState<'idle' | 'listening' | 'processing'>('idle');

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden relative font-sans">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Radial Gradient Overlay for Depth */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <StatusDisplay />

        <main className="flex-1 flex flex-col items-center justify-center py-12 gap-12">
          {/* Header Section */}
          <div className="text-center space-y-2">
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tighter glow-text text-white">
              NEURO<span className="text-primary">SPHERE</span>
            </h1>
            <p className="font-tech text-zinc-400 tracking-[0.3em] text-sm md:text-base uppercase">
              Unified AI Assistant Interface
            </p>
          </div>

          {/* Central Interaction Zone */}
          <div className="flex flex-col items-center gap-8">
            <NeuroButton onStateChange={setAppState} />
            <TranscriptionView state={appState} />
          </div>

          {/* Footer Controls */}
          <div className="w-full mt-auto pt-12 pb-8">
             <ControlGrid />
          </div>
        </main>
      </div>
    </div>
  );
}

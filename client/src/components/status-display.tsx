import { ShieldCheck, Wifi, Battery } from 'lucide-react';

export function StatusDisplay() {
  return (
    <div className="w-full flex items-center justify-between px-6 py-4 bg-black/20 backdrop-blur-sm border-b border-white/5">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-tech text-sm tracking-[0.2em] text-zinc-400 uppercase">
          NeuroSphere Core: <span className="text-emerald-500">Connected</span>
        </span>
      </div>

      <div className="flex items-center gap-6 text-zinc-500">
        <div className="flex items-center gap-2" title="Secure Connection">
          <ShieldCheck className="w-4 h-4" />
          <span className="font-mono text-xs hidden md:block">AES-256</span>
        </div>
        <div className="flex items-center gap-2" title="Network Status">
          <Wifi className="w-4 h-4" />
          <span className="font-mono text-xs hidden md:block">5G ULTRA</span>
        </div>
        <div className="flex items-center gap-2" title="System Power">
          <Battery className="w-4 h-4" />
          <span className="font-mono text-xs hidden md:block">100%</span>
        </div>
      </div>
    </div>
  );
}

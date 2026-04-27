import { motion } from 'motion/react';
import { Megaphone, ExternalLink, X } from 'lucide-react';
import { useState } from 'react';

export default function AdBanner() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-28 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-40"
    >
      <div className="bg-brand text-black p-4 md:p-6 rounded-[2rem] shadow-2xl flex items-center justify-between gap-6 overflow-hidden relative group">
         <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Megaphone className="w-24 h-24" />
         </div>
         
         <div className="flex items-center gap-6 flex-1 min-w-0">
            <div className="w-16 h-16 bg-black/10 rounded-2xl flex items-center justify-center shrink-0">
               <Zap className="w-8 h-8" />
            </div>
            <div className="min-w-0">
               <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-black text-brand px-2 py-0.5 rounded">Sponsored</span>
                  <h4 className="text-sm md:text-lg font-display font-black uppercase italic tracking-tight truncate">Level Up Your Production with Synth-X</h4>
               </div>
               <p className="text-xs md:text-sm font-medium opacity-70 truncate italic">"Exclusive 50% discount for Beatnest users. Code: NEST50"</p>
            </div>
         </div>

         <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-2 bg-black text-brand px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
               Claim Now
               <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setShow(false)}
              className="p-3 bg-black/10 rounded-xl hover:bg-black/20 transition-colors"
            >
               <X className="w-4 h-4" />
            </button>
         </div>
      </div>
      
      <p className="text-[9px] text-white/30 text-center mt-3 uppercase tracking-widest font-bold">
        Beatnest Free Tier Support • <button className="text-brand hover:underline">Go Pro to Remove Ads</button>
      </p>
    </motion.div>
  );
}

function Zap(props: any) {
  return (
    <svg 
      {...props}
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

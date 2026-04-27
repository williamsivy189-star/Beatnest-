import { motion } from 'motion/react';
import { Users, UserPlus, MessageSquare, Mic2, Music, Clock, Lock, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Collab() {
  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Artist Collaboration</h1>
          <p className="text-gray-500 mt-2 max-w-md">Find your next creative partner. Real-time collaboration made simple.</p>
        </div>
        <button className="bg-brand text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-brand/20">
          <UserPlus className="w-5 h-5" />
          Create Collab Request
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-3">
             <Clock className="w-5 h-5 text-brand" />
             <h2 className="text-xl font-bold uppercase tracking-tight">Active Sessions</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[1, 2].map(i => (
              <CollabSessionCard key={i} index={i} />
            ))}
          </div>

          <div className="flex items-center gap-3 pt-8">
             <Globe className="w-5 h-5 text-accent" />
             <h2 className="text-xl font-bold uppercase tracking-tight">Open Requests</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {[1, 2, 3, 4].map(i => (
               <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[32px] space-y-6 hover:border-brand/30 transition-all cursor-pointer group shadow-xl hover:shadow-brand/5">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 overflow-hidden p-0.5 group-hover:border-brand/30 transition-colors">
                        <img src={`https://i.pravatar.cc/100?u=collab${i}`} alt="Artist" className="w-full h-full rounded-[14px] object-cover" />
                     </div>
                     <div>
                        <h4 className="text-sm font-bold tracking-tight">Vocalist_Needed_32</h4>
                        <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest mt-0.5">Posted 2h ago • Synthwave</p>
                     </div>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed italic">"Looking for a powerful female vocal for a dark synth track. Must have own recording setup. Let's make magic!"</p>
                  <div className="flex gap-2">
                     <span className="text-[9px] font-bold bg-white/5 px-3 py-1.5 rounded-lg text-gray-500 uppercase tracking-widest border border-white/5">Logic Pro</span>
                     <span className="text-[9px] font-bold bg-white/5 px-3 py-1.5 rounded-lg text-gray-500 uppercase tracking-widest border border-white/5">120 BPM</span>
                  </div>
                  <button className="w-full bg-white/5 hover:bg-brand text-gray-300 hover:text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border border-white/10 group-hover:border-brand/40">
                     Apply to Collab
                  </button>
               </div>
             ))}
          </div>
        </div>

        {/* Global Chat / Activity */}
        <div className="space-y-6">
           <div className="glass-panel rounded-3xl flex flex-col h-[600px]">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                 <h3 className="font-bold flex items-center gap-2 uppercase tracking-tight italic">
                    <MessageSquare className="w-4 h-4 text-brand" />
                    Artist Hub Chat
                 </h3>
                 <span className="flex items-center gap-1.5 text-[10px] font-bold text-brand uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
                    42 Online
                 </span>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                 {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                   <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-border shrink-0" />
                      <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                         <p className="text-[10px] font-bold text-brand mb-1">User_{i}</p>
                         <p className="text-xs text-white/80 leading-relaxed">Anyone down for a quick jungle session? Got some sick breaks ready.</p>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="p-4 border-t border-white/5">
                 <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Say something..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-xs focus:outline-none focus:border-brand/40"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand text-black rounded-lg">
                       <MessageSquare className="w-4 h-4" />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function CollabSessionCard({ index }: { index: number, key?: any }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white/5 border border-white/10 p-8 rounded-[32px] flex items-center gap-8 group hover:border-brand/40 transition-all shadow-xl hover:shadow-brand/10 hover:bg-white/10"
    >
      <div className="w-20 h-20 bg-white/5 rounded-2xl overflow-hidden relative shadow-2xl border border-white/10">
         <img src={`https://picsum.photos/seed/collab${index}/200/200`} alt="Project" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
         <div className="absolute inset-0 bg-brand/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="flex-1 min-w-0">
         <div className="flex items-center gap-3 mb-2">
            <h3 className="font-bold text-xl truncate tracking-tight">Project_Quantum_Ghost</h3>
            <span className="flex items-center gap-1.5 text-[9px] font-bold text-brand bg-brand/10 px-3 py-1 rounded-full uppercase tracking-widest shrink-0 border border-brand/20 shadow-sm animate-pulse">
               <span className="w-1 h-1 bg-brand rounded-full" />
               Live
            </span>
         </div>
         <p className="text-xs text-gray-500 font-medium italic">Editing in Studio B • 3 collaborators active</p>
      </div>
      <div className="flex -space-x-4">
         {[1, 2, 3].map(i => (
           <div key={i} className="w-10 h-10 rounded-full border-2 border-[#030305] bg-surface-soft overflow-hidden ring-2 ring-transparent group-hover:ring-brand/30 transition-all shadow-lg">
              <img src={`https://i.pravatar.cc/100?u=u${i}`} alt="User" className="w-full h-full object-cover" />
           </div>
         ))}
      </div>
      <button className="bg-brand text-white px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-brand/20 hover:scale-105 active:scale-95 transition-all ml-4">
         Join Session
      </button>
    </motion.div>
  );
}

import { motion } from 'motion/react';
import { Heart, MessageSquare, Send, BarChart2, User, HelpCircle, LayoutGrid, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function Community() {
  const [activeView, setActiveView] = useState('feed');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="flex items-center justify-between bg-white/5 p-2 rounded-2xl border border-white/5 w-fit">
         {['feed', 'polls', 'q&a'].map(view => (
           <button
             key={view}
             onClick={() => setActiveView(view)}
             className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
               activeView === view ? 'bg-brand text-black shadow-lg' : 'text-white/40 hover:text-white'
             }`}
           >
             {view}
           </button>
         ))}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {activeView === 'feed' && <FeedView />}
          {activeView === 'polls' && <PollsView />}
          {activeView === 'q&a' && <QAView />}
        </div>

        <div className="space-y-6">
           <div className="glass-panel p-6 rounded-3xl space-y-4">
              <h3 className="font-bold flex items-center gap-2 uppercase tracking-tight italic">
                 <Sparkles className="w-4 h-4 text-brand" />
                 Top Supporters
              </h3>
              <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-surface-border" />
                         <div className="text-[10px]">
                            <p className="font-bold">Elite_Fan_{i}</p>
                            <p className="text-white/40 tracking-wider">124 Badges</p>
                         </div>
                      </div>
                      <div className="text-[10px] font-mono text-brand font-bold bg-brand/10 px-2 rounded">MVP</div>
                   </div>
                 ))}
              </div>
              <button className="w-full text-[10px] font-bold text-white/40 hover:text-brand transition-colors pt-2 border-t border-white/5">
                 VIEW LEADERBOARD
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function FeedView() {
  return (
    <div className="space-y-6">
       {[1, 2].map(i => (
         <div key={i} className="glass-panel rounded-3xl overflow-hidden group">
            <div className="p-6">
               <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-brand" />
                     </div>
                     <div>
                        <h4 className="text-sm font-bold">Ivy_Official</h4>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Artist • Platinum Tier</p>
                     </div>
                  </div>
                  <button className="p-2 text-white/20 hover:text-white transition-colors">
                     <LayoutGrid className="w-4 h-4" />
                  </button>
               </div>
               <p className="text-sm text-white/80 leading-relaxed italic italic mb-4">"Just shared a raw sample of the new project. What do we think of the bassline? Should I go more industrial? 🎹💨"</p>
               <div className="aspect-video bg-surface-border rounded-2xl mb-4 relative overflow-hidden group/img cursor-pointer">
                  <img src={`https://picsum.photos/seed/fan${i}/800/450`} alt="Post" className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                     <Heart className="w-10 h-10 text-brand" />
                  </div>
               </div>
               <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex gap-6">
                     <button className="flex items-center gap-2 text-xs font-bold text-white/40 hover:text-brand transition-colors">
                        <Heart className="w-4 h-4" /> 1.2k
                     </button>
                     <button className="flex items-center gap-2 text-xs font-bold text-white/40 hover:text-brand transition-colors">
                        <MessageSquare className="w-4 h-4" /> 48
                     </button>
                  </div>
                  <button className="text-white/40 hover:text-white transition-colors">
                     <Send className="w-4 h-4" />
                  </button>
               </div>
            </div>
         </div>
       ))}
    </div>
  );
}

function PollsView() {
  return (
    <div className="space-y-6">
       {[1, 2].map(i => (
         <div key={i} className="glass-panel p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-2 text-brand font-bold text-[10px] uppercase tracking-widest">
               <BarChart2 className="w-4 h-4" />
               Current Fan Poll
            </div>
            <h3 className="text-xl font-display font-black uppercase italic tracking-tight">"NEXT GENRE FOCUS?"</h3>
            <div className="space-y-3">
               {[
                 { label: 'Hyperpop / Glitch', votes: 65 },
                 { label: 'Deep Melodic Techno', votes: 20 },
                 { label: 'Drill / Orchestral', votes: 15 },
               ].map((opt, idx) => (
                 <div key={idx} className="space-y-2 group cursor-pointer">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                       <span className="text-white/60 group-hover:text-white transition-colors">{opt.label}</span>
                       <span className="text-brand">{opt.votes}%</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-lg overflow-hidden relative">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${opt.votes}%` }}
                         className="h-full bg-brand/20 group-hover:bg-brand/40 transition-colors" 
                       />
                       <div className="absolute inset-0 flex items-center px-4">
                          {idx === 0 && <span className="text-[8px] font-bold uppercase tracking-widest text-brand">Winning</span>}
                       </div>
                    </div>
                 </div>
               ))}
            </div>
            <p className="text-[10px] text-white/20 text-center font-bold uppercase tracking-widest">2,842 total votes • Ending in 2 days</p>
         </div>
       ))}
    </div>
  );
}

function QAView() {
  return (
    <div className="space-y-6">
       <div className="glass-panel p-6 rounded-3xl bg-brand/5 border-brand/20">
          <div className="flex items-center gap-3 mb-4">
             <HelpCircle className="w-5 h-5 text-brand" />
             <h3 className="font-bold uppercase italic tracking-tight">Ask Ivy Anything</h3>
          </div>
          <div className="relative">
             <textarea 
               placeholder="Write your question..."
               className="w-full bg-surface border border-white/10 rounded-xl p-4 text-xs focus:outline-none focus:border-brand/40 h-24 resize-none"
             />
             <button className="absolute bottom-3 right-3 bg-brand text-black px-4 py-1.5 rounded-lg text-[10px] font-black uppercase">
                Submit
             </button>
          </div>
       </div>

       <div className="space-y-4">
          {[1, 2, 3].map(i => (
             <div key={i} className="glass-panel p-6 rounded-3xl space-y-4">
                <div className="flex gap-4">
                   <div className="w-8 h-8 rounded-lg bg-surface-border shrink-0" />
                   <div>
                      <p className="text-[10px] font-bold text-white/40 mb-1">Fan_User_{i} asked:</p>
                      <p className="text-xs font-bold leading-relaxed">"What inspired the heavy cinematic strings in your latest beat?"</p>
                   </div>
                </div>
                <div className="ml-8 p-4 bg-white/5 rounded-2xl border-l-2 border-brand">
                   <p className="text-[10px] font-bold text-brand mb-1">Artist Response:</p>
                   <p className="text-xs text-white/60 italic">"I was binge-watching neo-noir films all weekend. The mood just stuck!"</p>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

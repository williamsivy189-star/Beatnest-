import { motion } from 'motion/react';
import { Radio, Users, Heart, MessageSquare, Send, Share2, Award, Zap } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { collection, query, where, orderBy, limit, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';

export default function LiveStream() {
  const { user, profile } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tenMinAgo = new Date(Date.now() - 10 * 60 * 1000);
    const q = query(
      collection(db, 'liveChats'),
      where('timestamp', '>', tenMinAgo),
      orderBy('timestamp', 'asc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'liveChats');
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim() || !user) return;

    try {
      await addDoc(collection(db, 'liveChats'), {
        userId: user.uid,
        userName: profile?.displayName || user.displayName || 'Guest',
        text: inputText,
        type: profile?.isPro ? 'artist' : 'fan',
        timestamp: serverTimestamp()
      });
      setInputText('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'liveChats');
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 h-[calc(100vh-14rem)]">
      {/* Video / Stream Area */}
      <div className="xl:col-span-3 flex flex-col gap-6">
        <div className="flex-1 bg-black rounded-[32px] relative overflow-hidden group shadow-2xl border border-white/10">
           <img 
             src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=2670" 
             alt="Live Stream" 
             className="w-full h-full object-cover opacity-60"
           />
           
           {/* Overlay UI */}
           <div className="absolute top-8 left-8 flex items-center gap-4">
              <div className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black flex items-center gap-2 animate-pulse tracking-widest uppercase">
                 <div className="w-1.5 h-1.5 bg-white rounded-full" />
                 Live Now
              </div>
              <div className="bg-black/40 backdrop-blur-xl px-4 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-2 border border-white/10 uppercase tracking-widest text-gray-200">
                 <Users className="w-3.5 h-3.5 text-white" />
                 1.4k Watching
              </div>
           </div>

           <div className="absolute top-8 right-8 flex gap-3">
              <button className="p-3 bg-black/40 backdrop-blur-xl rounded-2xl hover:bg-white/10 transition-colors border border-white/10 shadow-xl group">
                 <Share2 className="w-5 h-5 text-gray-300 group-hover:text-white" />
              </button>
           </div>

           <div className="absolute bottom-12 left-12 right-12 flex items-center justify-between pointer-events-none">
              <div className="pointer-events-auto">
                 <h2 className="text-4xl font-bold tracking-tight drop-shadow-2xl mb-2 text-white italic">Cooking Dark Techno Beats</h2>
                 <p className="text-gray-300 font-medium drop-shadow-md text-sm">Ivy Williams • 128 BPM • 01:24:12 elapsed</p>
              </div>
              <div className="flex gap-4 pointer-events-auto">
                 <button className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-xl shadow-2xl hover:scale-110 active:scale-95 transition-all hover:bg-white/20 group">
                    <Heart className="w-8 h-8 text-white group-hover:fill-current" />
                 </button>
              </div>
           </div>

           {/* Animated Floating Hearts (Visual Mock) */}
           <div className="absolute bottom-24 right-24 pointer-events-none">
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 0, x: 0 }}
                  animate={{ opacity: [0, 1, 0], y: -100, x: [0, 20, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                  className="absolute"
                >
                   <Heart className="w-6 h-6 text-brand fill-current" />
                </motion.div>
              ))}
           </div>
        </div>

        <div className="flex items-center justify-between p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-xl">
           <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full border-2 border-brand bg-white/5 overflow-hidden p-1 shadow-lg shadow-brand/20">
                 <img src="https://i.pravatar.cc/150?u=ivy" alt="Artist" className="w-full h-full rounded-full object-cover" />
              </div>
              <div>
                 <h3 className="text-xl font-bold tracking-tight">Ivy Williams</h3>
                 <p className="text-xs text-gray-500 font-mono uppercase tracking-widest mt-1">Techno Producer • Platinum Artist</p>
              </div>
           </div>
           <div className="flex gap-4">
              <button className="bg-white/5 border border-white/10 px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                 Follow Artist
              </button>
              <button className="bg-brand text-white px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-brand/20 hover:scale-105 active:scale-95 transition-all">
                 <Award className="w-4 h-4" />
                 Send Tip
              </button>
           </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-white/5 border border-white/10 flex flex-col rounded-[32px] overflow-hidden shadow-2xl backdrop-blur-xl">
         <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-[10px] font-bold flex items-center gap-2 uppercase tracking-widest text-gray-500">
               <MessageSquare className="w-4 h-4 text-brand" />
               Live Chat
            </h3>
            <div className="px-2 py-0.5 bg-brand/10 rounded text-[8px] font-bold text-brand uppercase tracking-widest">SLOW MODE</div>
         </div>
         
         <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
            {/* Top Donors / Badges */}
            <div className="p-4 bg-brand/5 border border-brand/20 rounded-2xl mb-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-brand" />
               </div>
               <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-3 h-3 text-brand" />
                  <span className="text-[10px] font-bold text-brand uppercase tracking-widest">Top Donation</span>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                     <span className="font-bold tracking-tight">TechnoVandal</span>
                     <span className="text-brand font-mono font-black">$50.00</span>
                  </div>
               </div>
            </div>

            {messages.map((m, i) => (
              <div key={m.id || i} className="flex gap-4 group">
                 <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 shrink-0" />
                 <div className="text-[12px] leading-relaxed">
                    <span className={cn(
                      "font-bold mr-2 tracking-tight",
                      m.type === 'artist' ? 'text-brand' : 'text-gray-400'
                    )}>
                       {m.userName}
                    </span>
                    <span className="text-gray-200">{m.text}</span>
                 </div>
              </div>
            ))}
            <div ref={chatEndRef} />
         </div>

         <div className="p-8 border-t border-white/5 bg-white/5">
            <div className="relative">
               <input 
                 type="text" 
                 value={inputText}
                 onChange={(e) => setInputText(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                 placeholder={user ? "Join the conversation..." : "Sign in to chat"}
                 disabled={!user}
                 className="w-full bg-surface-soft border border-white/10 rounded-xl py-4 pl-5 pr-14 text-xs focus:outline-none focus:border-brand/50 font-medium placeholder:text-gray-700 transition-colors"
               />
               <button 
                 onClick={sendMessage}
                 disabled={!user || !inputText.trim()}
                 className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand text-white rounded-lg shadow-lg shadow-brand/20 hover:scale-110 transition-transform disabled:opacity-50 disabled:scale-100"
               >
                  <Send className="w-5 h-5" />
               </button>
            </div>
            <div className="flex gap-2 mt-6">
               <button className="flex-1 bg-white/5 border border-white/10 py-3 rounded-xl text-[10px] font-bold hover:bg-brand/10 hover:text-brand hover:border-brand/30 transition-all uppercase tracking-widest text-gray-500">👏 Claps</button>
               <button className="flex-1 bg-white/5 border border-white/10 py-3 rounded-xl text-[10px] font-bold hover:bg-brand/10 hover:text-brand hover:border-brand/30 transition-all uppercase tracking-widest text-gray-500">🔥 Fire</button>
               <button className="flex-1 bg-white/5 border border-white/10 py-3 rounded-xl text-[10px] font-bold hover:bg-brand/10 hover:text-brand hover:border-brand/30 transition-all uppercase tracking-widest text-gray-500">🎸 Shred</button>
            </div>
         </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

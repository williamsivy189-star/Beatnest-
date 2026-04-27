import { motion } from 'motion/react';
import { Mic2, Sparkles, Wand2, History, Save, Play, Square, Settings2, Music, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, addDoc, serverTimestamp, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

export default function Studio() {
  const { user, profile } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [takes, setTakes] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    // Listen to projects
    const qProjects = query(
      collection(db, 'projects'),
      where('ownerId', '==', user.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubProjects = onSnapshot(qProjects, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'projects');
    });

    return () => unsubProjects();
  }, [user]);

  const saveProject = async () => {
    if (!user) return;
    const title = prompt('Enter project title:', `Project_${Math.random().toString(36).substring(7)}`);
    if (!title) return;
    
    try {
      await addDoc(collection(db, 'projects'), {
        title,
        ownerId: user.uid,
        artistName: profile?.displayName || 'Anonymous',
        isPublic: false,
        duration: '00:00:00',
        status: 'idle',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      alert('Project saved to cloud!');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'projects');
    }
  };

  const publishProject = async (projectId: string, currentPublic: boolean) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'projects', projectId), {
        isPublic: !currentPublic,
        artistName: profile?.displayName || 'Anonymous Artist',
        updatedAt: serverTimestamp()
      });
      alert(currentPublic ? 'Project unpublished.' : 'Project published to the global feed!');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `projects/${projectId}`);
    }
  };

  const isPro = profile?.isPro || false;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Virtual AI Studio</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium italic">Professional tools for the next-gen artist.</p>
        </div>
        <div className="flex gap-2">
           <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
              <Settings2 className="w-5 h-5 text-gray-400" />
           </button>
           <button 
             onClick={saveProject}
             disabled={!user}
             className="flex items-center gap-2 bg-brand text-black px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest shadow-lg shadow-brand/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
           >
              <Save className="w-4 h-4" />
              Save Project
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Recording Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-[16/9] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] relative overflow-hidden flex flex-col items-center justify-center p-12 shadow-2xl">
            {/* Visualizer Mock */}
            <div className="flex items-end gap-1.5 h-32 mb-12">
               {[...Array(32)].map((_, i) => (
                 <motion.div
                   key={i}
                    style={{
                      backgroundColor: isRecording ? '#C4FF0E' : 'rgba(255, 255, 255, 0.1)'
                    }}
                   animate={{ 
                     height: isRecording ? [20, 60, 30, 80, 20][i % 5] : 4 
                   }}
                   transition={{ 
                     repeat: Infinity, 
                     duration: 0.5, 
                     delay: i * 0.05,
                     ease: "easeInOut" 
                   }}
                   className="w-2 rounded-full shadow-[0_0_12px_rgba(196,255,14,0.3)]"
                 />
               ))}
            </div>

            <div className="flex flex-col items-center gap-6">
               <motion.button
                 onClick={() => setIsRecording(!isRecording)}
                 disabled={!user}
                 whileTap={{ scale: 0.95 }}
                 className={`w-28 h-28 rounded-full flex items-center justify-center transition-all ${
                   isRecording 
                    ? 'bg-red-500 shadow-[0_0_60px_rgba(239,68,68,0.4)]' 
                    : 'bg-brand shadow-[0_0_60px_rgba(196,255,14,0.4)]'
                 } disabled:opacity-50`}
               >
                 {isRecording ? <Square className="w-10 h-10 text-white fill-current" /> : <Mic2 className="w-10 h-10 text-black" />}
               </motion.button>
               <div className="text-center">
                 <p className="text-4xl font-mono font-black tracking-tighter text-white">{isRecording ? '00:12:45' : 'READY TO RECORD'}</p>
                 <p className="text-[10px] text-brand font-black mt-2 uppercase tracking-[0.3em]">{isRecording ? 'Recording Source: Focusrite 2i2' : 'Studio Cloud v2.4'}</p>
                 {!user && <p className="text-[8px] text-gray-500 mt-2 uppercase tracking-widest font-black">Sign in to start recording</p>}
               </div>
            </div>

            {/* AI Controls Overlay */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center">
              <div className="flex gap-3">
                 <button className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all">
                    <Sparkles className="w-3.5 h-3.5 text-brand" />
                    AI Auto-Tune
                 </button>
                 <button className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all">
                    <Wand2 className="w-3.5 h-3.5 text-brand" />
                    Clean Noise
                 </button>
              </div>
              <div className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl">Latency: 1.2ms</div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-[32px] space-y-6">
             <div className="flex items-center justify-between">
               <h3 className="font-black flex items-center gap-2 uppercase tracking-[0.3em] text-[10px] text-gray-400">
                 <History className="w-4 h-4 text-brand" />
                 Recent Sessions
               </h3>
             </div>
             <div className="space-y-4">
                {projects.length > 0 ? (
                  projects.map(p => (
                    <div key={p.id} className="flex items-center gap-4 p-5 bg-white/5 rounded-3xl border border-white/5 hover:border-brand/40 transition-all group relative overflow-hidden">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-brand/10 group-hover:border-brand/30 transition-all">
                         <Music className="w-5 h-5 text-brand" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-black tracking-tight text-white">{p.title}</p>
                          {p.isPublic && <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-brand/20 text-brand rounded-full border border-brand/30">Public</span>}
                        </div>
                        <p className="text-[10px] font-mono font-medium text-gray-500 mt-1 uppercase tracking-widest">Modified: {p.updatedAt?.toDate()?.toLocaleTimeString() ?? 'Syncing...'}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => publishProject(p.id, p.isPublic)}
                          className={cn(
                            "text-[10px] font-black px-4 py-2 rounded-xl tracking-widest uppercase transition-all shadow-lg",
                            p.isPublic 
                              ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30" 
                              : "bg-brand/20 text-brand border border-brand/30 hover:bg-brand/30"
                          )}
                        >
                          {p.isPublic ? 'Unpublish' : 'Publish'}
                        </button>
                        <button className="text-[10px] font-black bg-white/5 px-4 py-2 rounded-xl text-white border border-white/10 hover:bg-white/10 transition-all tracking-widest uppercase">Open</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-[2rem]">
                     <p className="text-xs text-gray-600 font-medium tracking-tight italic">No projects found. Create one to get started.</p>
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* AI Voice Generator Sidebar */}
        <div className="space-y-6">
          <div className="bg-brand/5 backdrop-blur-xl border border-brand/20 p-8 rounded-[32px] relative overflow-hidden group shadow-2xl shadow-brand/10">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-all duration-700">
               <Sparkles className="w-32 h-32 text-brand" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand mb-2">AI Voice Lab</h3>
            <h2 className="text-2xl font-bold tracking-tight">Voice Cloner</h2>
            <p className="text-gray-400 text-xs mt-3 leading-relaxed">Generate realistic vocals from text using custom artist clones.</p>
            
            <div className="mt-8 space-y-6 relative">
               {!isPro && (
                 <div className="absolute inset-x-[-8px] inset-y-[-8px] z-20 backdrop-blur-md bg-surface/40 flex flex-col items-center justify-center rounded-3xl border border-brand/20 p-6 text-center">
                    <div className="w-12 h-12 bg-brand/20 rounded-full flex items-center justify-center mb-4">
                       <Sparkles className="w-6 h-6 text-brand" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-2">Pro Tool Locked</h4>
                    <p className="text-[10px] text-gray-400 mb-4 px-4 leading-relaxed">Upgrade to Artist Pro to access custom voice cloning and infinite vocal generation.</p>
                    <button className="bg-brand text-white text-[10px] font-bold px-6 py-2.5 rounded-xl uppercase tracking-widest shadow-lg shadow-brand/20 hover:scale-105 active:scale-95 transition-all">
                       Upgrade Now
                    </button>
                 </div>
               )}
               <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block mb-2">Target Voice</label>
                  <select className="w-full bg-surface-soft border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-brand transition-colors text-gray-300">
                    <option>Drake (Glitch Edition)</option>
                    <option>The Weeknd (Synth Clone)</option>
                    <option>Ariana G (Cloud Pops)</option>
                    <option>Custom Voice #12</option>
                  </select>
               </div>
               <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block mb-2">Lyrics / Prompt</label>
                  <textarea 
                    placeholder="Enter melody progression or lyrics..."
                    className="w-full bg-surface-soft border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-brand h-32 resize-none text-gray-300 placeholder:text-gray-700 transition-colors"
                  />
               </div>
               <button className="w-full bg-brand text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-brand/20 hover:scale-105 active:scale-95 transition-all">
                  Generate Vocal Stem
               </button>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] space-y-6 shadow-xl relative overflow-hidden">
             <div className="absolute -top-12 -left-12 w-32 h-32 bg-brand/5 blur-3xl" />
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand">Publishing & Revenue</h3>
             <div className="space-y-4 relative z-10">
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                      <Music className="w-4 h-4 text-brand" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white">Share Your Sound</p>
                      <p className="text-[9px] text-gray-500 mt-1 leading-relaxed">Toggle "Publish" on any session to feature it on the <span className="text-brand font-bold cursor-pointer underline">Explore Feed</span>.</p>
                   </div>
                </div>
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                      <Plus className="w-4 h-4 text-green-500" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white">How You Get Paid</p>
                      <p className="text-[9px] text-gray-500 mt-1 leading-relaxed">Connect your Stripe account in the Settings menu. Revenue from sales and subscriptions goes directly to your balance.</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] space-y-6 shadow-xl">
             <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Presets & Sound Packs</h3>
             <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-brand/30 transition-all cursor-pointer group hover:bg-white/10">
                    <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                       <Music className="w-4 h-4 text-brand" />
                    </div>
                    <p className="text-[10px] font-bold tracking-widest text-gray-300">CYBERPUNK {i}</p>
                    <p className="text-[8px] font-mono text-gray-500 mt-1 uppercase tracking-widest">12 Loops • 24MB</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

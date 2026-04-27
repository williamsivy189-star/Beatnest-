import { motion } from 'motion/react';
import { Play, Heart, MessageSquare, Share2, Music, User, Flame } from 'lucide-react';
import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { cn } from '../../lib/utils';

export default function Explore() {
  const [publicProjects, setPublicProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'projects'),
      where('isPublic', '==', true),
      orderBy('updatedAt', 'desc'),
      limit(20)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setPublicProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'projects');
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-20">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-brand">
          <Flame className="w-5 h-5 fill-current" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Trending Now</span>
        </div>
        <h1 className="text-5xl font-black tracking-tight text-white">Global Discovery</h1>
        <p className="text-gray-500 font-medium italic">Listen to what the world is creating in real-time.</p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-video bg-white/5 rounded-[2.5rem] animate-pulse border border-white/5" />
          ))}
        </div>
      ) : publicProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publicProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative glass-panel rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-brand/40 transition-all shadow-xl hover:shadow-brand/5"
            >
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-brand/20 to-accent/20">
                <img 
                  src={`https://picsum.photos/seed/${project.id}/600/400`} 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
                  alt={project.title} 
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 rounded-full bg-brand flex items-center justify-center text-black shadow-2xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </motion.button>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                   <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white">Project</span>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-black tracking-tight text-white group-hover:text-brand transition-colors truncate">{project.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-5 h-5 rounded-full bg-white/10 overflow-hidden">
                       <img src={`https://i.pravatar.cc/150?u=${project.ownerId}`} alt="Artist" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{project.artistName || 'Anonymous'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1.5 text-gray-500 hover:text-brand transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-[10px] font-mono font-bold">{Math.floor(Math.random() * 100)}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-gray-500 hover:text-brand transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-[10px] font-mono font-bold">{Math.floor(Math.random() * 20)}</span>
                    </button>
                  </div>
                  <button className="text-gray-500 hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 glass-panel rounded-[3rem] border border-dashed border-white/10">
          <Music className="w-16 h-16 text-gray-800 mb-6" />
          <p className="text-xl font-bold text-gray-600">The global feed is quiet...</p>
          <p className="text-sm text-gray-700 mt-2">Be the first to publish a project in the Studio!</p>
        </div>
      )}

      {/* Featured Section */}
      <section className="mt-20 glass-panel p-12 rounded-[4rem] border border-brand/20 bg-brand/5 relative overflow-hidden group">
         <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand/10 blur-[100px] group-hover:bg-brand/20 transition-all duration-1000" />
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="px-4 py-1.5 bg-brand text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full">Editor's Choice</span>
              <h2 className="text-4xl font-black tracking-tighter text-white">Monetize Your Craft</h2>
              <p className="text-gray-400 font-medium leading-relaxed">Publish your projects to the marketplace and start earning from your unique sound. The money you earn goes directly to your connected Stripe account.</p>
              <div className="flex gap-4 pt-4">
                 <button className="px-8 py-4 bg-brand text-black rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-brand/20 hover:scale-105 active:scale-95 transition-all">Go to Marketplace</button>
                 <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">Learn More</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="aspect-square bg-white/5 rounded-3xl border border-white/5 group-hover:border-brand/20 transition-all shadow-2xl relative overflow-hidden">
                    <img src={`https://picsum.photos/seed/artist${i}/300/300`} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" alt="Artist" />
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}

import { useState } from 'react';
import { ShoppingBag, Search, Tag, Filter, CheckCircle2, DollarSign, Download, Music } from 'lucide-react';
import { motion } from 'motion/react';

export default function Marketplace() {
  const [category, setCategory] = useState('all');

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Beat & Sample Marketplace</h1>
          <p className="text-gray-500 mt-2 max-w-md">Purchase exclusive royalty-free beats and samples from top producers worldwide.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input 
                type="text" 
                placeholder="Search by mood, bpm, key..."
                className="bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-5 text-xs focus:outline-none focus:border-brand/50 transition-colors min-w-[320px] placeholder:text-gray-700"
              />
           </div>
           <button className="p-3.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
              <Filter className="w-5 h-5 text-gray-400 group-hover:text-white" />
           </button>
        </div>
      </header>

      <div className="flex flex-wrap gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl w-fit backdrop-blur-xl">
        {['all', 'hip-hop', 'lofi', 'techno', 'pop', 'cinematic'].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
              category === cat ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-gray-500 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
          <MarketplaceItem key={i} index={i} />
        ))}
      </div>
    </div>
  );
}

function MarketplaceItem({ index }: { index: number, key?: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="bg-white/5 border border-white/10 p-6 rounded-[32px] group hover:border-brand/40 transition-all flex flex-col gap-6 shadow-xl hover:shadow-brand/5"
    >
      <div className="aspect-[4/3] bg-white/5 rounded-3xl overflow-hidden relative border border-white/10 shadow-inner">
        <img 
          src={`https://picsum.photos/seed/market${index}/800/600`} 
          alt="Item" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
        />
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-xl border border-white/10 px-3 py-1 rounded-lg text-[9px] font-bold text-brand uppercase tracking-widest">
           Exclusive
        </div>
        <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-2xl">
           $24.99
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
           <h3 className="font-bold text-lg tracking-tight truncate">Midnight Echoes EP</h3>
           <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
        </div>
        <p className="text-xs text-gray-500 uppercase font-mono tracking-widest">Producer_Tag_02 • 140 BPM • Em Key</p>
      </div>

      <div className="flex flex-wrap gap-2">
         {['Dark', 'Spacey', 'Hard'].map(tag => (
           <span key={tag} className="text-[9px] font-bold text-gray-600 border border-white/10 px-2.5 py-1 rounded-lg uppercase tracking-tight group-hover:border-brand/30 transition-colors">#{tag}</span>
         ))}
      </div>

      <div className="flex gap-3 mt-auto">
         <button className="flex-1 bg-white/5 hover:bg-brand/10 border border-white/10 hover:border-brand/30 rounded-xl py-3 flex items-center justify-center gap-2 transition-all group/btn">
            <Music className="w-4 h-4 text-gray-500 group-hover/btn:text-brand" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover/btn:text-brand">Preview</span>
         </button>
         <button className="w-12 h-12 bg-brand text-white rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-brand/20">
            <ShoppingBag className="w-5 h-5 shadow-2xl" />
         </button>
      </div>
    </motion.div>
  );
}

import { motion } from 'motion/react';
import { ShoppingBag, Truck, CheckCircle2, Star, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export default function Merch() {
  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <header className="relative py-16 overflow-hidden rounded-[32px] bg-white/5 border border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/[0.02] opacity-20" />
        <div className="relative z-10 px-12">
          <div className="flex items-center gap-2 text-brand font-bold text-[10px] uppercase tracking-widest mb-4">
             <ShoppingBag className="w-4 h-4" />
             Artist Exclusives
          </div>
          <h1 className="text-6xl font-bold tracking-tight leading-[0.9] italic">
            Wear The<br />Wave
          </h1>
          <p className="text-gray-400 text-lg mt-6 max-w-md leading-relaxed">
            Limited edition apparel and accessories for the Beatnest community. Supporting artists directly with every purchase.
          </p>
        </div>

        {/* Decorative Element */}
        <div className="absolute right-0 top-0 bottom-0 w-[40%] bg-gradient-to-l from-brand/20 to-transparent flex items-center justify-center p-12">
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
             className="w-64 h-64 border-2 border-brand/20 border-dashed rounded-full flex items-center justify-center"
           >
              <div className="w-32 h-32 bg-brand rounded-full blur-3xl opacity-20" />
           </motion.div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <MerchItem key={i} index={i} />
        ))}
      </div>

      <section className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[32px] flex flex-col md:flex-row items-center gap-12 shadow-2xl">
         <div className="flex-1 space-y-8">
            <div>
              <h3 className="text-xs font-bold text-brand uppercase tracking-widest mb-2">Partner Program</h3>
              <h2 className="text-4xl font-bold tracking-tight">Merch Store Integration</h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-lg">
               Are you an artist? Set up your own merch store in seconds. We handle the production, shipping, and fulfillment while you focus on the music.
            </p>
            <div className="flex flex-col gap-4">
               {[
                 '100% Artist Revenue Share (minus production)',
                 'Custom Labeling & Packaging',
                 'Worldwide Shipping to Fans',
                 'Instant Analytics of Sales'
               ].map(benefit => (
                 <div key={benefit} className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-brand" />
                    <span className="text-sm font-bold tracking-tight text-gray-200">{benefit}</span>
                 </div>
               ))}
            </div>
            <button className="bg-brand text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-brand/20 hover:scale-105 active:scale-95 transition-all">
               Open Your Store
               <ArrowRight className="w-5 h-5" />
            </button>
         </div>
         <div className="w-full md:w-[450px] h-[450px] bg-white/5 border border-white/10 rounded-[32px] relative overflow-hidden p-8 flex items-center justify-center shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-transparent opacity-40" />
            <motion.div 
              animate={{ y: [0, -24, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-56 h-72 bg-white/10 border border-white/20 rounded-3xl relative z-10 flex flex-col p-5 shadow-[0_40px_80px_rgba(0,0,0,0.4)] backdrop-blur-md"
            >
               <div className="flex-1 rounded-2xl bg-white/5 border border-white/10 mb-5 overflow-hidden">
                  <img src="https://picsum.photos/seed/merch/400/600" alt="Mockup" className="w-full h-full object-cover" />
               </div>
               <div className="h-4 w-2/3 bg-white/10 rounded-full mb-3" />
               <div className="h-3 w-full bg-white/5 rounded-full" />
            </motion.div>
         </div>
      </section>
    </div>
  );
}

function MerchItem({ index }: { index: number, key?: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="bg-white/5 border border-white/10 p-6 rounded-[32px] group flex flex-col gap-6 hover:border-brand/40 transition-all shadow-xl hover:shadow-brand/5"
    >
      <div className="aspect-square bg-white/5 border border-white/10 rounded-[24px] overflow-hidden relative shadow-inner">
         <img src={`https://picsum.photos/seed/merch${index}/600/600`} alt="Merch" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
         <button className="absolute top-4 right-4 p-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-white/40 hover:text-brand hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
            <Heart className="w-4 h-4" />
         </button>
         {index === 1 && (
           <div className="absolute top-4 left-4 bg-brand text-white px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-lg shadow-brand/40 animate-pulse">
              New Drop
           </div>
         )}
      </div>

      <div className="space-y-1">
         <div className="flex items-center justify-between gap-4">
            <h3 className="font-bold text-lg tracking-tight truncate">Cyber Core Tee</h3>
            <p className="text-brand font-mono font-bold">$38.00</p>
         </div>
         <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Ivy Williams Official</p>
      </div>

      <div className="flex items-center gap-2 border-y border-white/5 py-5">
         <div className="flex items-center gap-1.5">
            <Star className="w-3 h-3 text-brand fill-brand" />
            <span className="text-[10px] font-bold text-gray-300">4.9</span>
         </div>
         <span className="text-white/10">•</span>
         <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">1.2k Sold</span>
         <div className="ml-auto flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand/30" />
            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Verified</span>
         </div>
      </div>

      <button className="w-full bg-white text-black py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-brand hover:text-white transition-all active:scale-95">
         Add to Bag
      </button>
    </motion.div>
  );
}

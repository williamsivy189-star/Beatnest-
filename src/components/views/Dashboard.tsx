import { motion } from 'motion/react';
import { 
  Play, 
  Flame, 
  Music, 
  Disc, 
  TrendingUp, 
  Users, 
  Wallet, 
  ArrowUpRight, 
  DollarSign, 
  ArrowRight 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const { profile } = useAuth();

  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight text-white">
            Welcome back, <span className="text-brand">{profile?.displayName || 'Artist'}</span>
          </h1>
          <p className="text-gray-500 font-medium italic">Your music business is growing. Keep creating.</p>
        </div>
      </header>

      {/* Revenue & Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className="glass-panel p-6 rounded-[2rem] border border-brand/20 bg-brand/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 blur-2xl" />
            <div className="relative z-10 flex items-center justify-between">
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Available Balance</p>
                  <h3 className="text-2xl font-black text-white mt-1">$1,240.50</h3>
                  <p className="text-[8px] text-brand font-bold mt-1 inline-flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Stripe Connected
                  </p>
               </div>
               <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-brand" />
               </div>
            </div>
         </div>
         <StatCard label="Monthly Streams" value="12.5k" icon={Music} />
         <StatCard label="Fan Downloads" value="248" icon={Disc} />
         <StatCard label="Revenue Today" value="$84.20" icon={DollarSign} color="text-green-400" />
      </div>

      {/* Hero Section */}
      <section className="relative h-[400px] rounded-[32px] overflow-hidden group border border-white/10 shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=2670" 
          alt="Studio Background"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 p-12 flex flex-col justify-center max-w-2xl bg-gradient-to-r from-black/80 to-transparent">
          <div className="flex items-center gap-2 text-brand font-bold text-xs uppercase tracking-widest mb-4">
            <Flame className="w-4 h-4" />
            Featured Weekly Release
          </div>
          <h1 className="text-6xl font-black tracking-tight leading-[0.9] mb-6 italic">
            GLITCHED<br />RENAISSANCE
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-md italic font-medium">
            The future of sound is here. Join the experimental movement.
          </p>
          <div className="flex gap-4">
            <button className="bg-brand text-black px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Stream Now
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/20 transition-all border border-white/10">
              Details
            </button>
          </div>
        </div>
      </section>

      {/* Grid Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-brand" />
              <h2 className="text-xl font-black uppercase tracking-tight text-white">Trending Beats</h2>
            </div>
            <button className="text-[10px] font-black text-gray-500 hover:text-brand transition-colors tracking-widest uppercase">VIEW ALL</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <TrackCard key={i} index={i} />
            ))}
          </div>
        </section>

        <section className="space-y-6 px-6 py-8 bg-surface-soft/50 rounded-[32px] border border-white/5 shadow-xl">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-brand" />
            <h2 className="text-xl font-black uppercase tracking-tight text-white">Collaborators</h2>
          </div>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all group cursor-pointer border border-transparent hover:border-white/10">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10 p-0.5 group-hover:border-brand/50 transition-colors">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Artist" className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-black truncate tracking-tight text-white">Artist_{i}</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Future Trap • 4.2k Fans</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-brand transition-colors" />
              </div>
            ))}
          </div>
          <button className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 border border-white/5 rounded-2xl hover:bg-white/5 transition-all">
            Find More Partners
          </button>
        </section>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color = "text-brand" }: any) {
  return (
    <div className="glass-panel p-6 rounded-[2rem] border border-white/5 bg-white/5">
       <div className="flex items-center justify-between">
          <div>
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{label}</p>
             <h3 className="text-2xl font-black text-white mt-1">{value}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
             <Icon className={cn("w-5 h-5", color)} />
          </div>
       </div>
    </div>
  );
}

function TrackCard({ index }: { index: number, key?: any }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white/5 border border-white/10 rounded-[24px] p-4 flex flex-col gap-4 group transition-all hover:bg-white/10 hover:border-brand/40 hover:shadow-2xl"
    >
      <div className="aspect-square rounded-[18px] bg-white/5 overflow-hidden relative shadow-inner">
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <Play className="w-10 h-10 text-white fill-current drop-shadow-brand" />
        </div>
        <img src={`https://picsum.photos/seed/beat${index}/300/300`} alt="Beat" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      </div>
      <div className="min-w-0 px-1">
        <h4 className="text-sm font-black truncate tracking-tight text-white">Soundscape_{index}</h4>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Producer_Name</p>
      </div>
    </motion.div>
  );
}

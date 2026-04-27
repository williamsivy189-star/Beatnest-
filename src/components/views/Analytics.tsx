import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, Play, DollarSign, ArrowUpRight, ArrowDownRight, Music } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

const DATA = [
  { name: 'Mon', streams: 4000, revenue: 2400 },
  { name: 'Tue', streams: 3000, revenue: 1398 },
  { name: 'Wed', streams: 2000, revenue: 9800 },
  { name: 'Thu', streams: 2780, revenue: 3908 },
  { name: 'Fri', streams: 1890, revenue: 4800 },
  { name: 'Sat', streams: 2390, revenue: 3800 },
  { name: 'Sun', streams: 3490, revenue: 4300 },
];

export default function Analytics() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">Artist Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Deep insights into your performance and revenue.</p>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Streams" 
          value="24.8M" 
          change="+12.5%" 
          isPositive={true} 
          icon={Play}
        />
        <StatCard 
          label="Est. Revenue" 
          value="$12,450" 
          change="+8.2%" 
          isPositive={true} 
          icon={DollarSign}
        />
        <StatCard 
          label="Followers" 
          value="842K" 
          change="-2.1%" 
          isPositive={false} 
          icon={Users}
        />
        <StatCard 
          label="Tracks Active" 
          value="128" 
          change="+4" 
          isPositive={true} 
          icon={Music}
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white/5 border border-white/10 p-8 rounded-[32px] h-[450px] flex flex-col shadow-2xl">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-[10px] font-bold flex items-center gap-2 uppercase tracking-widest text-gray-500">
               <TrendingUp className="w-4 h-4 text-brand" />
               Streaming Performance
             </h3>
             <div className="flex gap-2">
                <button className="text-[10px] font-bold text-gray-500 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 uppercase tracking-widest transition-colors">7D</button>
                <button className="text-[10px] font-bold text-brand px-3 py-1.5 rounded-lg bg-brand/10 border border-brand/20 uppercase tracking-widest shadow-lg shadow-brand/10">30D</button>
             </div>
          </div>
          <div className="flex-1 -ml-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA}>
                <defs>
                  <linearGradient id="colorStreams" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#525252" fontSize={10} axisLine={false} tickLine={false} dy={10} fontVariant="mono" />
                <YAxis stroke="#525252" fontSize={10} axisLine={false} tickLine={false} dx={-10} fontVariant="mono" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#08080C', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#6366f1', fontWeight: 'bold' }}
                  cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="streams" stroke="#6366f1" fillOpacity={1} fill="url(#colorStreams)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] flex flex-col shadow-2xl">
           <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-8">Top Regions</h3>
           <div className="space-y-6 flex-1">
              {[
                { country: 'United States', percentage: 45 },
                { country: 'United Kingdom', percentage: 22 },
                { country: 'Canada', percentage: 12 },
                { country: 'Germany', percentage: 8 },
                { country: 'Japan', percentage: 5 },
              ].map((item, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex justify-between text-[11px] font-bold tracking-tight">
                    <span className="text-gray-300">{item.country}</span>
                    <span className="text-brand font-mono">{item.percentage}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className="h-full bg-brand rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]" 
                    />
                  </div>
                </div>
              ))}
           </div>
           
           <div className="pt-8 border-t border-white/5 mt-8">
             <div className="bg-brand/10 border border-brand/20 p-5 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
                   <TrendingUp className="w-12 h-12 text-brand" />
                </div>
                <p className="text-[10px] font-bold text-brand uppercase tracking-widest mb-1 italic">Pro Insight</p>
                <p className="text-xs text-gray-400 leading-relaxed italic">Your track "Neon Ghost" is trending in Tokyo. Consider a targeted campaign there for maximum ROI.</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, change, isPositive, icon: Icon }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] space-y-4 group hover:border-brand/40 transition-all shadow-xl hover:shadow-brand/5">
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300 group-hover:bg-brand/10 group-hover:border-brand/30">
          <Icon className="w-5 h-5 text-gray-500 group-hover:text-brand" />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border shadow-sm",
          isPositive ? "text-brand bg-brand/10 border-brand/20" : "text-pink-500 bg-pink-500/10 border-pink-500/20"
        )}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-[10px] uppercase font-bold tracking-widest text-gray-600 mb-1">{label}</p>
        <p className="text-3xl font-mono font-bold tracking-tighter text-gray-100">{value}</p>
      </div>
    </div>
  );
}

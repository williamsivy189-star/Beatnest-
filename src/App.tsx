import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Bell, 
  User, 
  Plus,
  Share2,
  Play, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Repeat, 
  Shuffle, 
  Crown,
  LayoutGrid,
  Mic2,
  Heart
} from 'lucide-react';
import { cn } from './lib/utils';
import { NAV_ITEMS, SECONDARY_NAV } from './constants';

// Views
import Dashboard from './components/views/Dashboard';
import Explore from './components/views/Explore';
import Studio from './components/views/Studio';
import Marketplace from './components/views/Marketplace';
import Analytics from './components/views/Analytics';
import Collab from './components/views/Collab';
import Community from './components/views/Community';
import LiveStream from './components/views/LiveStream';
import Merch from './components/views/Merch';
import ProTier from './components/views/ProTier';
import AdBanner from './components/AdBanner';

import { useAuth } from './context/AuthContext';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './lib/firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const { user, profile, signIn, logOut } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (sessionId && user) {
      const updateProStatus = async () => {
        try {
          await updateDoc(doc(db, 'users', user.uid), {
            isPro: true,
            updatedAt: serverTimestamp()
          });
          // Remove query param from URL
          const newUrl = window.location.pathname;
          window.history.replaceState({}, '', newUrl);
          alert('Celebration! 🚀 Your Artist Pro subscription is now active.');
        } catch (error) {
          console.error('Error updating pro status:', error);
        }
      };
      updateProStatus();
    }
  }, [user]);

  const renderView = () => {
    switch (activeTab) {
      case 'home': return <Dashboard />;
      case 'explore': return <Explore />;
      case 'studio': return <Studio />;
      case 'marketplace': return <Marketplace />;
      case 'analytics': return <Analytics />;
      case 'collab': return <Collab />;
      case 'community': return <Community />;
      case 'live': return <LiveStream />;
      case 'merch': return <Merch />;
      case 'pro': return <ProTier />;
      default: return <Dashboard />;
    }
  };

  const isPro = profile?.isPro || false;

  return (
    <div className="flex h-screen bg-surface overflow-hidden font-sans spotify-gradient selection:bg-brand selection:text-white">
      {/* Sidebar */}
      <aside className="w-72 border-r border-surface-border flex flex-col bg-surface-soft/80 backdrop-blur-xl z-20 shrink-0">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-brand to-accent rounded-xl flex items-center justify-center shadow-lg shadow-brand/20 font-bold text-xl">B</div>
            BEATNEST
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold px-3 py-2 mt-2">Discover</div>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium",
                  activeTab === item.id 
                    ? "bg-brand text-white shadow-lg shadow-brand/20" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {'premium' in item && item.premium && activeTab !== item.id && !isPro && (
                  <Crown className="w-3 h-3 text-brand ml-auto" />
                )}
              </button>
            ))}

          <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold px-3 py-2 mt-6">My Library</div>
          {SECONDARY_NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium",
                activeTab === item.id 
                  ? "bg-brand text-white shadow-lg shadow-brand/20" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-surface-border">
          {isPro && (
            <div className="bg-brand/10 border border-brand/20 rounded-2xl p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[10px] font-bold text-brand uppercase tracking-widest">Artist Pro</h3>
                <span className="text-[10px] bg-brand text-white px-1.5 py-0.5 rounded shadow-lg shadow-brand/20">ACTIVE</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full mb-2">
                <div className="w-2/3 h-full bg-brand rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
              </div>
              <p className="text-[10px] text-gray-500">Unlimited streams and AI credits</p>
            </div>
          )}

          {user ? (
            <button 
              onClick={() => {
                if (confirm('Logout?')) logOut();
              }}
              className="w-full group relative overflow-hidden bg-white/5 border border-white/10 rounded-xl p-3 transition-all hover:border-brand/30"
            >
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-surface-border flex items-center justify-center overflow-hidden border-2 border-brand/30">
                  <img src={profile?.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold truncate max-w-[120px]">{profile?.displayName || 'User'}</p>
                  <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">{isPro ? 'Artist Pro' : 'Free Member'}</p>
                </div>
              </div>
            </button>
          ) : (
            <button 
              onClick={signIn}
              className="w-full h-16 bg-brand text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              Sign In
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-16 flex items-center justify-between px-8 bg-surface-soft/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-10">
          <div className="flex-1 max-w-md relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-brand transition-colors" />
            <input 
              type="text" 
              placeholder="Search tracks, artists, or beats..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand/50 transition-all font-medium placeholder:text-gray-600"
            />
          </div>

          <div className="flex items-center gap-4 ml-4">
            <button 
              onClick={() => {
                const url = window.location.href;
                navigator.clipboard.writeText(url);
                alert('App link copied to clipboard! Share this with your fans.');
              }}
              className="p-2 text-gray-400 hover:text-white transition-colors relative"
              title="Share App"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand rounded-full border-2 border-surface shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
            </button>
            <button 
              onClick={() => setActiveTab('studio')}
              className="hidden sm:flex items-center gap-2 bg-brand text-black px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand/20"
            >
              <Plus className="w-4 h-4" />
              Upload Work
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="p-8"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>

        {!isPro && <AdBanner />}

        {/* Global Player */}
        <div className="h-20 bg-surface-soft border-t border-white/10 px-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-4 w-[30%]">
            <div className="w-12 h-12 bg-white/5 rounded-xl overflow-hidden flex-shrink-0 group relative cursor-pointer shadow-lg border border-white/10">
               <img src="https://picsum.photos/seed/music9/200/200" alt="Current track" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <Plus className="w-5 h-5 text-white" />
               </div>
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-bold truncate hover:underline cursor-pointer tracking-tight">Neon City Streets</h4>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Editing • AI Studio</p>
            </div>
            <button className="text-gray-500 hover:text-brand transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1 max-w-xl">
            <div className="flex items-center gap-6">
              <button className="text-gray-500 hover:text-white transition-colors"><Shuffle className="w-4 h-4" /></button>
              <button className="text-gray-400 hover:text-white transition-colors"><SkipBack className="w-5 h-5 fill-current" /></button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white text-xl bg-white/5 hover:scale-110 active:scale-95 transition-all shadow-xl hover:border-brand/40"
              >
                {isPlaying ? (
                  <div className="w-3 h-3 flex gap-1">
                    <div className="w-1 bg-white rounded-full h-full" />
                    <div className="w-1 bg-white rounded-full h-full" />
                  </div>
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5 text-white" />
                )}
              </button>
              <button className="text-gray-400 hover:text-white transition-colors"><SkipForward className="w-5 h-5 fill-current" /></button>
              <button className="text-gray-500 hover:text-white transition-colors"><Repeat className="w-4 h-4" /></button>
            </div>
            <div className="w-full flex items-center gap-3 text-gray-600 text-[10px] font-mono tracking-tighter">
              <span className="w-8 text-right">1:24</span>
              <div className="flex-1 h-1 bg-white/10 rounded-full relative overflow-hidden group cursor-pointer">
                <div className="absolute top-0 left-0 bottom-0 w-[45%] bg-brand group-hover:bg-brand/80 transition-colors shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
              </div>
              <span className="w-8">3:45</span>
            </div>
          </div>

          <div className="flex items-center gap-6 w-[30%] justify-end">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold text-brand uppercase tracking-widest">Subscription</p>
              <p className="text-xs font-medium text-gray-400">Artist Pro Active</p>
            </div>
            <button className="text-gray-500 hover:text-white transition-colors"><LayoutGrid className="w-4 h-4" /></button>
            <div className="flex items-center gap-2 w-24">
              <Volume2 className="w-4 h-4 text-gray-500" />
              <div className="flex-1 h-1 bg-white/10 rounded-full relative cursor-pointer group">
                <div className="absolute top-0 left-0 bottom-0 w-[80%] bg-white/60 group-hover:bg-brand transition-colors" />
                <div className="absolute left-[80%] top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(196, 255, 14, 0.2);
        }
      `}</style>
    </div>
  );
}

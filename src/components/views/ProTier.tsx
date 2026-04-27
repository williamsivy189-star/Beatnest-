import { motion } from 'motion/react';
import { Crown, CheckCircle2, Zap, Star, ShieldCheck, ArrowRight, Music, Users, Mic2, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { cn } from '../../lib/utils';
import { getStripe } from '../../lib/stripe';
import { useState } from 'react';

export default function ProTier() {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpgrade = async (tier: string) => {
    if (!user) {
      alert("Please sign in to upgrade.");
      return;
    }
    
    setLoading(tier);
    try {
      const priceId = import.meta.env.VITE_STRIPE_PRO_PRICE_ID || 'price_placeholder';
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId: user.uid,
        }),
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      const stripe = await getStripe();
      if (stripe) {
        const { error } = await (stripe as any).redirectToCheckout({
          sessionId: session.id,
        });
        if (error) throw error;
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(`Checkout failed: ${error.message}. Make sure you've added your Stripe keys to the Settings menu.`);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-12 py-8 max-w-6xl mx-auto">
      <header className="text-center space-y-4">
        <h1 className="text-6xl font-display font-black uppercase italic tracking-tighter">Level Up Your Sound</h1>
        <p className="text-white/40 text-lg max-w-2xl mx-auto">Choose a plan that fits your journey. Unlock professional tools, unlimited storage, and direct monetization.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard 
          tier="FREE" 
          price="$0" 
          description="Perfect for listeners and new creators starting out."
          features={[
            'Standard Music Streaming',
            'Community Access',
            'Basic Artist Profile',
            'Ad-Supported Experience'
          ]}
          cta={profile?.isPro ? "Downgrade (Demo)" : "Current Plan"}
          isCurrent={!profile?.isPro}
          onClick={() => {
             if (profile?.isPro && user) {
                updateDoc(doc(db, 'users', user.uid), { isPro: false });
             }
          }}
        />
        <PricingCard 
          tier="PRO" 
          price="$12.99" 
          description="For dedicated listeners and emerging artists."
          features={[
            'High-Fidelity Audio',
            'Ad-Free Experience',
            'Unlimited Playlists',
            'AI Voice Gen (5/mo)',
            'Advanced Analytics'
          ]}
          cta={profile?.isPro ? "Active" : "Go Pro"}
          isFeatured={true}
          isCurrent={profile?.isPro}
          isLoading={loading === 'PRO'}
          icon={Crown}
          onClick={() => handleUpgrade('PRO')}
        />
        <PricingCard 
          tier="ARTIST" 
          price="$29.99" 
          description="The ultimate suite for professional creators."
          features={[
            'Unlimited AI Voice Gen',
            'Marketplace Lower Fees',
            'Live Stream Capabilities',
            'Merch Store Integration',
            'Priority Support'
          ]}
          cta={profile?.isPro ? "Active" : "Become an Artist"}
          icon={Zap}
          isLoading={loading === 'ARTIST'}
          isCurrent={profile?.isPro}
          onClick={() => handleUpgrade('ARTIST')}
        />
      </div>

      {/* Feature Comparison */}
      <section className="glass-panel rounded-[3rem] p-12 mt-12 bg-white/[0.02]">
         <h3 className="text-3xl font-display font-black uppercase italic tracking-tight mb-8">Artist vs Pro: Detailed Comparison</h3>
         <div className="space-y-4">
            {[
              { f: 'Audio Resolution', p: '24-bit HD', a: '32-bit Studio' },
              { f: 'Marketplace Commission', p: '15%', a: '5%' },
              { f: 'Collab Slots', p: '5 Active', a: 'Unlimited' },
              { f: 'Custom Domain', p: 'No', a: 'Yes' },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 p-4 border-b border-white/5 text-sm">
                 <span className="font-bold text-white/40 uppercase tracking-widest text-[10px]">{row.f}</span>
                 <span className="font-medium">{row.p}</span>
                 <span className="font-bold text-brand">{row.a}</span>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}

function PricingCard({ tier, price, description, features, cta, isFeatured, isCurrent, isLoading, icon: Icon, onClick }: any) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={cn(
        "glass-panel p-8 rounded-[2.5rem] flex flex-col gap-8 relative overflow-hidden transition-all",
        isFeatured ? "border-brand/40 bg-brand/5 shadow-[0_10px_40px_rgba(196,255,14,0.1)]" : "border-white/5",
        isCurrent && tier !== 'FREE' && "opacity-80"
      )}
    >
      {isFeatured && (
        <div className="absolute top-0 right-0 p-6 opacity-10">
           <Star className="w-24 h-24 text-brand" />
        </div>
      )}

      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <span className={cn(
              "text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border",
              isFeatured ? "bg-brand text-black border-brand" : "text-white/40 border-white/10"
            )}>
               {tier}
            </span>
            {Icon && <Icon className={cn("w-6 h-6", isFeatured ? "text-brand" : "text-white/40")} />}
         </div>
         <div className="flex items-baseline gap-1">
            <span className="text-5xl font-mono font-black">{price}</span>
            <span className="text-xs text-white/40 font-bold uppercase tracking-widest italic">/ month</span>
         </div>
         <p className="text-xs text-white/60 font-medium leading-relaxed">{description}</p>
      </div>

      <div className="space-y-3 flex-1">
         {features.map((f: string) => (
           <div key={f} className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-brand/60 shrink-0" />
              <span className="text-xs font-bold text-white/80">{f}</span>
           </div>
         ))}
      </div>

      <button 
        onClick={onClick}
        disabled={isLoading || (isCurrent && tier !== 'FREE')}
        className={cn(
        "w-full py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group",
        isFeatured 
          ? "bg-brand text-black shadow-xl hover:scale-105" 
          : "bg-white/5 border border-white/10 text-white hover:bg-white/10",
        (isCurrent && tier !== 'FREE' || isLoading) && "cursor-default pointer-events-none opacity-50"
      )}>
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : cta}
        {!isLoading && (!isCurrent || tier === 'FREE') && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
      </button>
    </motion.div>
  );
}

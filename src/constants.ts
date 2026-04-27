import { 
  Home, 
  Mic2, 
  Music, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  Radio, 
  Users, 
  Plus, 
  Heart,
  Search,
  Bell,
  User,
  Crown
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'explore', label: 'Explore Feed', icon: Search },
  { id: 'studio', label: 'Recording Studio', icon: Mic2, premium: true },
  { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, premium: true },
  { id: 'collab', label: 'Artist Collab', icon: Users },
  { id: 'community', label: 'Community', icon: Heart },
  { id: 'live', label: 'Live Stream', icon: Radio },
] as const;

export const SECONDARY_NAV = [
  { id: 'favorites', label: 'Favorites', icon: Heart },
  { id: 'playlists', label: 'Playlists', icon: Music },
  { id: 'merch', label: 'Merch Store', icon: ShoppingBag },
  { id: 'pro', label: 'Go Pro', icon: Crown },
] as const;

export interface Track {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
  duration: number;
}

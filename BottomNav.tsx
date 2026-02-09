
import React from 'react';
import { Home, LayoutGrid, User, QrCode } from 'lucide-react';
import { Language } from '../types';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: any) => void;
  lang: Language;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate, lang }) => {
  const tabs = [
    { id: 'home', icon: Home, label: lang === 'bn' ? 'হোম' : 'Home' },
    { id: 'packages', icon: LayoutGrid, label: lang === 'bn' ? 'প্যাক' : 'Packs' },
    { id: 'scan', icon: QrCode, label: lang === 'bn' ? 'স্ক্যান' : 'Scan' },
    { id: 'profile', icon: User, label: lang === 'bn' ? 'ইউজার' : 'User' },
  ];

  return (
    <nav className="md:hidden fixed bottom-6 left-6 right-6 z-[100] h-16 glass-nav rounded-3xl flex items-center justify-around px-4 shadow-2xl shadow-red-950/20">
      {tabs.map((tab) => {
        const isActive = currentPage === tab.id;
        const Icon = tab.icon;
        
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            aria-label={tab.label}
            className={`flex flex-col items-center justify-center gap-1 transition-all active:scale-90 relative ${isActive ? 'text-red-600' : 'text-zinc-500'}`}
          >
            {isActive && (
              <span className="absolute -top-1 w-1 h-1 bg-red-600 rounded-full animate-pulse"></span>
            )}
            <Icon size={isActive ? 22 : 20} className={isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]'} />
            <span className={`text-[9px] font-black uppercase tracking-widest ${lang === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;

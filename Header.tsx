
import React, { useState, useEffect } from 'react';
import { Language, Theme, TranslationStrings } from '../types';
import { Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  theme: Theme;
  onLangToggle: () => void;
  onThemeToggle: () => void;
  onNavigate: (page: 'home' | 'packages' | 'auth' | 'profile') => void;
  currentPage: string;
  t: TranslationStrings;
}

const Header: React.FC<HeaderProps> = ({ lang, theme, onLangToggle, onThemeToggle, onNavigate, currentPage, t }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: 'home' | 'packages' | 'auth' | 'profile') => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 h-16 flex items-center ${scrolled ? 'glass-header border-b border-zinc-100/50 dark:border-zinc-800/50' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <button onClick={() => handleNav('home')} className="text-2xl font-black text-red-600 tracking-tightest font-english">GOTI.</button>

        <nav className="hidden md:flex items-center space-x-8">
          {['home', 'packages', 'profile'].map(p => (
            <button 
              key={p} 
              onClick={() => handleNav(p as any)} 
              className={`text-[10px] font-black uppercase tracking-widest transition-colors ${currentPage === p ? 'text-red-600' : 'text-zinc-500 hover:text-red-600'}`}
            >
              {p === 'home' ? (lang === 'bn' ? 'হোম' : 'Home') : p === 'packages' ? (lang === 'bn' ? 'সার্ভিস' : 'Services') : (lang === 'bn' ? 'একাউন্ট' : 'Account')}
            </button>
          ))}
          <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-full border border-zinc-200 dark:border-zinc-700">
            <button onClick={onLangToggle} className="px-3 py-1 rounded-full bg-white dark:bg-zinc-950 text-[8px] font-black shadow-sm font-english">{lang.toUpperCase()}</button>
            <button onClick={onThemeToggle} className="p-1.5 text-zinc-500">{theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}</button>
          </div>
        </nav>

        <button onClick={() => setIsMenuOpen(true)} className="md:hidden p-2 text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 rounded-xl">
          <Menu size={20} />
        </button>
      </div>

      <div className={`fixed inset-0 z-[100] md:hidden transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 h-full w-72 bg-white dark:bg-zinc-900 p-8 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className="flex items-center justify-between mb-12">
             <span className="text-2xl font-black text-red-600 font-english">GOTI.</span>
             <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-zinc-50 dark:bg-zinc-950 rounded-xl"><X size={20}/></button>
           </div>
           <div className="space-y-2">
             {['home', 'packages', 'profile'].map(p => (
               <button key={p} onClick={() => handleNav(p as any)} className={`w-full flex items-center justify-between p-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${currentPage === p ? 'bg-red-600 text-white' : 'text-zinc-500 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
                 <span>{p}</span>
                 <ArrowRight size={14} />
               </button>
             ))}
           </div>
           <div className="mt-auto absolute bottom-8 left-8 right-8 flex gap-2">
              <button onClick={onLangToggle} className="flex-1 py-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl text-[9px] font-black uppercase tracking-widest border border-zinc-100 dark:border-zinc-800">Switch Lang</button>
              <button onClick={onThemeToggle} className="flex-1 py-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl text-[9px] font-black uppercase tracking-widest border border-zinc-100 dark:border-zinc-800">Toggle Mode</button>
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

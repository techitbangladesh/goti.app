
import React from 'react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
  theme: 'light' | 'dark';
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="bg-transparent text-zinc-400 py-8 px-6 text-center transition-all duration-500">
      <div className="max-w-7xl mx-auto space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-500 text-[8px] font-black uppercase tracking-widest font-english">Network Node Active</span>
        </div>
        <p className="text-[9px] font-black uppercase tracking-[0.4em] font-english opacity-40">
          © Goti Network • Techit Bangladesh
        </p>
      </div>
    </footer>
  );
};

export default Footer;

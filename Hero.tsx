
import React from 'react';
import { Language, TranslationStrings } from '../types';
import { ArrowRight, ShoppingBag, UserCircle } from 'lucide-react';

interface HeroProps {
  lang: Language;
  t: TranslationStrings;
  isLoggedIn: boolean;
  onCta: () => void;
  onLoginClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ lang, t, isLoggedIn, onCta, onLoginClick }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-white dark:bg-zinc-950 py-10 px-5 transition-colors duration-500">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_#E10600_0%,_transparent_60%)] opacity-[0.03] dark:opacity-[0.07]"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-20 relative z-10 w-full">
        <div className="flex-[1.2] text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-500 dark:text-zinc-400 font-english uppercase tracking-widest text-[7px]">
             <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
             Direct Fiber Optic Core
          </div>

          <h1 className={`text-4xl md:text-7xl lg:text-8xl font-black leading-[0.95] text-zinc-900 dark:text-zinc-100 tracking-tightest ${lang === 'en' ? 'font-english uppercase' : 'font-bengali'}`}>
            {lang === 'en' ? (
              <>SPEED <span className="text-red-600 italic">LIMITLESS</span> POWER.</>
            ) : (
              <>নির্ভীক <span className="text-red-600 italic">গতি</span> সীমাহীন শক্তি</>
            )}
          </h1>

          <p className={`text-sm md:text-lg text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium ${lang === 'bn' ? 'font-bengali' : 'font-english opacity-80'}`}>
            {t.heroSubheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-4">
            <button onClick={onCta} className="w-full sm:w-auto px-8 py-4 bg-red-600 text-white font-black rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-zinc-900 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 shadow-xl shadow-red-600/10 active:scale-95">
              <ShoppingBag size={18} />
              <span className={`text-[11px] font-black uppercase tracking-widest ${lang === 'bn' ? 'font-bengali' : 'font-english'}`}>{t.buyBtn}</span>
              <ArrowRight size={16} />
            </button>
            
            {!isLoggedIn && (
              <button onClick={onLoginClick} className="w-full sm:w-auto px-8 py-4 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-black rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800 active:scale-95">
                <UserCircle size={18} />
                <span className={`text-[11px] font-black uppercase tracking-widest ${lang === 'bn' ? 'font-bengali' : 'font-english'}`}>{t.loginBtn}</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 w-full max-w-sm lg:max-w-md relative group">
          <div className="relative aspect-square overflow-hidden rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800" alt="Fiber" className="w-full h-full object-cover dark:grayscale dark:brightness-[0.5] transition-all duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

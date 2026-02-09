
import React, { useState, useEffect, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PackageList from './components/PackageList';
import RamadanAd from './components/RamadanAd';
import Auth from './components/Auth';
import Profile from './components/Profile';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import QRScanner from './components/QRScanner';
import ActivePackagePanel from './components/ActivePackagePanel';
import { Language, Theme, User } from './types';
import { TRANSLATIONS, CONTACT_NUMBER } from './constants';
import { Zap, ShieldCheck, Banknote, Globe, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('bn');
  const [theme, setTheme] = useState<Theme>('dark');
  const [currentPage, setCurrentPage] = useState<'home' | 'packages' | 'auth' | 'profile' | 'scan'>('home');
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('goti_user_v2');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('goti_user_v2', JSON.stringify(user));
    } else {
      localStorage.removeItem('goti_user_v2');
    }
  }, [user]);

  useEffect(() => {
    document.documentElement.className = theme;
    const splash = document.getElementById('splash');
    setTimeout(() => document.body.classList.add('app-active'), 1000);
  }, [theme]);

  const toggleLanguage = () => setLang(prev => prev === 'en' ? 'bn' : 'en');
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleLogin = (name: string, email: string, phone: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        name,
        email,
        phone: phone || CONTACT_NUMBER,
        activePackage: "Welcome Pack",
        expiryTimestamp: Date.now() + 3600000 // 1 Hour Trial
      });
      setIsLoading(false);
      setCurrentPage('home');
    }, 1200);
  };

  const handleNavigate = (page: any) => {
    if ((page === 'profile' || page === 'scan') && !user) {
      setCurrentPage('auth');
    } else {
      setCurrentPage(page);
    }
    window.scrollTo(0, 0);
  };

  const BenefitIcon = ({ type }: { type: string }) => {
    const iconClass = "text-red-600 transition-transform group-hover:scale-110";
    switch(type) {
      case 'speed': return <Zap className={iconClass} size={32} />;
      case 'price': return <Banknote className={iconClass} size={32} />;
      case 'flex': return <ShieldCheck className={iconClass} size={32} />;
      default: return <Globe className={iconClass} size={32} />;
    }
  };

  if (currentPage === 'scan') {
    return <QRScanner lang={lang} onClose={() => handleNavigate('home')} />;
  }

  return (
    <div className={`min-h-full flex flex-col transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'}`}>
      <Header 
        lang={lang} 
        theme={theme} 
        onLangToggle={toggleLanguage} 
        onThemeToggle={toggleTheme} 
        onNavigate={handleNavigate} 
        currentPage={currentPage}
        t={TRANSLATIONS[lang]}
      />
      
      <main className="flex-1 pt-16">
        {isLoading ? (
          <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Establishing Secure Tunnel</p>
          </div>
        ) : (
          <Suspense fallback={<div className="h-screen flex items-center justify-center bg-zinc-950"><Loader2 className="animate-spin text-red-600 w-10 h-10" /></div>}>
            {currentPage === 'home' && (
              <div className="animate-in fade-in duration-700">
                <Hero lang={lang} t={TRANSLATIONS[lang]} isLoggedIn={!!user} onCta={() => handleNavigate('packages')} onLoginClick={() => handleNavigate('auth')} />
                <ActivePackagePanel user={user} lang={lang} onNavigate={handleNavigate} />
                <RamadanAd lang={lang} />
                <section className="py-20 px-6 pb-40">
                  <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <span className="text-red-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Core Infrastructure</span>
                        <h2 className={`text-4xl font-black text-zinc-900 dark:text-zinc-100 ${lang === 'bn' ? 'font-bengali' : 'font-english uppercase italic'}`}>
                          {lang === 'bn' ? 'কেন আমরা সেরা?' : 'Why Goti?'}
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                      {(Object.entries(TRANSLATIONS[lang].benefits) as [string, any][]).map(([key, benefit]) => (
                        <div key={key} className="bg-zinc-50 dark:bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 hover:border-red-600 transition-all">
                          <div className="mb-8 p-4 bg-white dark:bg-zinc-800 rounded-2xl w-fit shadow-lg"><BenefitIcon type={key} /></div>
                          <h3 className={`text-xl font-black mb-3 ${lang === 'bn' ? 'font-bengali' : 'font-english uppercase'}`}>{benefit.title}</h3>
                          <p className={`text-zinc-500 text-sm ${lang === 'bn' ? 'font-bengali' : 'font-english'}`}>{benefit.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}
            {currentPage === 'packages' && <div className="pb-40"><PackageList lang={lang} t={TRANSLATIONS[lang]} /></div>}
            {currentPage === 'auth' && <Auth lang={lang} t={TRANSLATIONS[lang]} onLogin={handleLogin} />}
            {currentPage === 'profile' && user && (
              <div className="pb-40">
                <Profile user={user} lang={lang} t={TRANSLATIONS[lang]} setUser={setUser} onThemeToggle={toggleTheme} onLangToggle={toggleLanguage} theme={theme} />
              </div>
            )}
          </Suspense>
        )}
      </main>

      <BottomNav currentPage={currentPage} onNavigate={handleNavigate} lang={lang} />
      <Footer lang={lang} theme={theme} />
    </div>
  );
};

export default App;


import React, { useState, useMemo } from 'react';
import { Language, TranslationStrings, Package, PackageCategory } from '../types';
import { PACKAGES, WHATSAPP_LINK } from '../constants';
import { Wifi, Zap, Users, ArrowUpRight, Clock, ShieldCheck, X, Check, Globe, Activity, Gift } from 'lucide-react';

interface PackageListProps {
  lang: Language;
  t: TranslationStrings;
}

const PackageList: React.FC<PackageListProps> = ({ lang, t }) => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [activeCategory, setActiveCategory] = useState<PackageCategory>('all');

  const categories = useMemo(() => [
    { id: 'all', en: 'All', bn: 'সব' },
    { id: '7d', en: '7 Days', bn: '৭ দিন' },
    { id: '1m', en: '1 Month', bn: '১ মাস' },
    { id: 'family', en: 'Family Pack', bn: 'ফ্যামিলি প্যাক' },
    { id: 'student', en: 'Student Pack', bn: 'স্টুডেন্ট প্যাক' },
    { id: 'free', en: 'Free Trial', bn: 'ফ্রি ট্রায়াল' },
  ], []);

  const filteredPackages = useMemo(() => {
    if (activeCategory === 'all') return PACKAGES;
    return PACKAGES.filter(pkg => pkg.category === activeCategory);
  }, [activeCategory]);

  const getIcon = (pkg: Package) => {
    if (pkg.isFreeTrial) return <Gift className="text-red-600" size={18} />;
    switch(pkg.category) {
      case 'student': return <Activity className="text-red-600" size={18} />;
      case 'family': return <Users className="text-red-600" size={18} />;
      case '7d': return <Zap className="text-red-600" size={18} />;
      default: return <Wifi className="text-red-600" size={18} />;
    }
  };

  return (
    <section className="py-16 md:py-24 px-5 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/10 rounded-full border border-red-600/20">
            <Globe size={10} className="text-red-600" />
            <span className="text-red-600 font-black font-english uppercase tracking-[0.3em] text-[8px]">Core Infrastructure</span>
          </div>
          <h2 className={`text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tightest ${lang === 'bn' ? 'font-bengali' : 'font-english uppercase italic'}`}>
            {t.packagesTitle}
          </h2>
        </div>

        {/* Categories Bar */}
        <div className="flex overflow-x-auto pb-4 mb-10 no-scrollbar -mx-5 px-5 md:mx-0 md:px-0 md:justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as PackageCategory)}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === cat.id 
                ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/20' 
                : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-100 dark:border-zinc-800 hover:border-red-600'
              } ${lang === 'bn' ? 'font-bengali text-xs' : 'font-english'}`}
            >
              {lang === 'en' ? cat.en : cat.bn}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
          {filteredPackages.map((pkg, index) => (
            <div 
              key={pkg.id} 
              className={`group relative bg-white dark:bg-zinc-900 border ${pkg.isFreeTrial ? 'border-dashed border-red-600 bg-red-600/5' : 'border-zinc-100 dark:border-zinc-800'} rounded-[2.5rem] p-8 transition-all duration-300 hover:-translate-y-1 flex flex-col shadow-sm`}
            >
              {pkg.isFreeTrial && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-5 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] shadow-xl font-english">
                  {lang === 'en' ? 'Try Before You Buy' : 'আগে যাচাই করুন'}
                </div>
              )}

              <div className="flex items-start justify-between mb-8">
                <div className={`w-14 h-14 ${pkg.isFreeTrial ? 'bg-red-600/10' : 'bg-zinc-50 dark:bg-zinc-800'} rounded-2xl flex items-center justify-center border border-zinc-100 dark:border-zinc-800`}>
                  {getIcon(pkg)}
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1.5 text-zinc-400 font-english mb-1">
                    <Clock size={10} className="text-red-600" />
                    <span className="text-[9px] font-black uppercase tracking-widest">{lang === 'en' ? pkg.durationEn : pkg.durationBn}</span>
                  </div>
                  <h3 className={`text-xl font-black text-zinc-900 dark:text-white ${lang === 'bn' ? 'font-bengali text-2xl' : 'font-english uppercase'}`}>
                    {lang === 'en' ? pkg.nameEn : pkg.nameBn}
                  </h3>
                </div>
              </div>

              <div className="flex items-baseline gap-1.5 mb-8">
                <span className="text-red-600 text-xl font-black font-english">৳</span>
                <span className="text-5xl font-black text-zinc-900 dark:text-white font-english tracking-tighter">{pkg.price}</span>
                <span className="text-zinc-400 font-english uppercase text-[8px] tracking-widest font-black ml-1">/ {pkg.isFreeTrial ? (lang === 'en' ? 'Session' : 'সেশন') : (lang === 'en' ? 'Month' : 'মাস')}</span>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {['Direct Fiber', 'Unlimited Data', pkg.isFreeTrial ? 'Speed Test Enabled' : 'Human Support'].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                    <Check size={14} className="text-red-600" />
                    <span className="text-xs font-bold tracking-tight uppercase font-english">{feat}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setSelectedPackage(pkg)}
                className={`w-full ${pkg.isFreeTrial ? 'bg-red-600 text-white' : 'bg-zinc-900 dark:bg-zinc-800 text-white'} hover:bg-black py-5 rounded-2xl font-black transition-all text-[10px] tracking-[0.2em] uppercase font-english shadow-lg active:scale-95`}
              >
                {pkg.price === 0 ? (lang === 'bn' ? 'শুরু করুন' : 'Start Trial') : (lang === 'bn' ? 'কিনুন' : 'Select Plan')}
              </button>
            </div>
          ))}
          {filteredPackages.length === 0 && (
            <div className="col-span-full py-20 text-center opacity-50">
              <p className="font-english uppercase tracking-widest text-[10px] font-black">{lang === 'en' ? 'No packages found in this category.' : 'এই ক্যাটাগরিতে কোনো প্যাকেজ নেই।'}</p>
            </div>
          )}
        </div>
      </div>

      {selectedPackage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md" onClick={() => setSelectedPackage(null)}></div>
          <div className="relative bg-white dark:bg-zinc-900 w-full max-w-sm rounded-[2.5rem] p-10 border border-zinc-100 dark:border-zinc-800 shadow-2xl animate-in zoom-in-95 duration-200">
            <button onClick={() => setSelectedPackage(null)} className="absolute top-8 right-8 p-2 text-zinc-400 hover:text-red-600 transition-colors"><X size={20} /></button>
            <div className="text-center space-y-8">
              <div className="w-20 h-20 bg-red-600/10 rounded-[2rem] flex items-center justify-center mx-auto text-red-600">
                <ShieldCheck size={40} />
              </div>
              <div className="space-y-2">
                <h3 className={`text-3xl font-black text-zinc-900 dark:text-white ${lang === 'bn' ? 'font-bengali' : 'font-english uppercase italic tracking-tight'}`}>
                  {selectedPackage.price === 0 ? (lang === 'bn' ? 'অ্যাক্টিভেশন' : 'Activation') : (lang === 'bn' ? 'পেমেন্ট গেটওয়ে' : 'Finalize')}
                </h3>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-english">Encrypted Connection</p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-left space-y-1">
                 <p className="text-[9px] font-black text-red-600 uppercase tracking-widest font-english">Plan Details</p>
                 <p className={`text-xl font-black text-zinc-900 dark:text-white ${lang === 'bn' ? 'font-bengali' : 'font-english uppercase'}`}>{lang === 'en' ? selectedPackage.nameEn : selectedPackage.nameBn}</p>
                 <p className="text-sm font-black text-zinc-400 font-english">Total: {selectedPackage.price === 0 ? (lang === 'en' ? 'FREE' : 'ফ্রি') : `৳${selectedPackage.price} BDT`}</p>
              </div>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-5 bg-red-600 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl shadow-red-600/20 active:scale-95">
                <span className={`text-[11px] uppercase tracking-widest font-english`}>{selectedPackage.price === 0 ? (lang === 'bn' ? 'ট্রায়াল শুরু করুন' : 'Begin Trial') : (lang === 'bn' ? 'পেমেন্ট করুন' : 'Purchase Plan')}</span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PackageList;


import React, { useState, useEffect, useMemo } from 'react';
import { User, Language } from '../types';
import { Zap, AlertCircle, RefreshCw, ShoppingBag, ShieldCheck, Activity, Clock } from 'lucide-react';

interface ActivePackagePanelProps {
  user: User | null;
  lang: Language;
  onNavigate: (page: any) => void;
}

const ActivePackagePanel: React.FC<ActivePackagePanelProps> = ({ user, lang, onNavigate }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.expiryTimestamp) {
      setTimeLeft(0);
      setIsExpired(true);
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = user.expiryTimestamp! - now;
      if (diff <= 0) {
        setTimeLeft(0);
        setIsExpired(true);
      } else {
        setTimeLeft(Math.floor(diff / 1000));
        setIsExpired(false);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [user?.expiryTimestamp]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!user || !user.activePackage) {
    return (
      <div className="px-6 py-4">
        <div className="bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 p-10 flex flex-col items-center gap-6 text-center shadow-sm">
          <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-950 rounded-[1.5rem] flex items-center justify-center text-zinc-300"><AlertCircle size={32} /></div>
          <div className="space-y-1">
             <h3 className={`text-xl font-black ${lang === 'bn' ? 'font-bengali' : 'font-english uppercase'}`}>{lang === 'bn' ? 'সক্রিয় প্যাকেজ নেই' : 'No Active Link'}</h3>
             <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest font-english">Purchase a plan to establish connection</p>
          </div>
          <button onClick={() => onNavigate('packages')} className="w-full py-5 bg-red-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-red-600/20 active:scale-95 transition-all">
            {lang === 'bn' ? 'প্যাকেজ দেখুন' : 'Browse Packages'}
          </button>
        </div>
      </div>
    );
  }

  const isWarning = timeLeft < 600; // 10 mins warning

  return (
    <div className="px-6 py-4">
      <div className="bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 p-10 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000"><Zap size={140} /></div>
        <div className="relative z-10 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center text-red-600"><Activity size={24} /></div>
              <div className="text-left">
                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest font-english mb-0.5">Live Connection</p>
                <h3 className={`text-lg font-black ${lang === 'bn' ? 'font-bengali' : 'font-english uppercase'}`}>{user.activePackage}</h3>
              </div>
            </div>
            <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ${isExpired ? 'bg-zinc-100 dark:bg-white/5 text-zinc-500' : isWarning ? 'bg-orange-500/10 text-orange-500 animate-pulse' : 'bg-green-500/10 text-green-500'}`}>
               <div className={`w-1.5 h-1.5 rounded-full ${isExpired ? 'bg-zinc-400' : 'bg-current animate-pulse'}`}></div>
               {isExpired ? (lang === 'bn' ? 'মেয়াদ শেষ' : 'Expired') : (lang === 'bn' ? 'সক্রিয়' : 'Active')}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-6 border-y border-zinc-50 dark:border-zinc-800">
             <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] font-english mb-3">Time Remaining</p>
             <div className={`text-6xl font-black font-english tracking-tightest tabular-nums ${isExpired ? 'text-zinc-300 dark:text-zinc-700' : isWarning ? 'text-orange-500' : 'text-zinc-900 dark:text-white'}`}>
                {formatTime(timeLeft)}
             </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {!isExpired && (
              <button onClick={() => onNavigate('profile')} className="py-5 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-2xl border border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">
                {lang === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard'}
              </button>
            )}
            <button onClick={() => onNavigate('packages')} className={`py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-xl ${isExpired ? 'bg-red-600 text-white col-span-2' : 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-900'}`}>
              {isExpired ? (lang === 'bn' ? 'নতুন প্যাক কিনুন' : 'Renew Link') : (lang === 'bn' ? 'টপ-আপ' : 'Extend')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivePackagePanel;

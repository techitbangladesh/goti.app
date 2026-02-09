
import React, { useState } from 'react';
import { Language, TranslationStrings, User } from '../types';
import { SOCIAL_LINKS, CONTACT_NUMBER } from '../constants';
import { 
  UserCircle, Mail, Phone, ShieldCheck, Activity, 
  Settings, LogOut, ChevronRight, Globe, Moon, 
  Save, ArrowLeft, Headphones, ExternalLink, Shield, Zap, Terminal, Plus, Hash
} from 'lucide-react';

interface ProfileProps {
  user: User;
  lang: Language;
  t: TranslationStrings;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  onThemeToggle: () => void;
  onLangToggle: () => void;
  theme: 'light' | 'dark';
}

type ProfileView = 'menu' | 'contact' | 'settings' | 'admin';

const Profile: React.FC<ProfileProps> = ({ user, lang, t, setUser, onThemeToggle, onLangToggle, theme }) => {
  const [activeView, setActiveView] = useState<ProfileView>('menu');
  const [formData, setFormData] = useState({ name: user.name, email: user.email });
  
  const [manualPackName, setManualPackName] = useState('');
  const [manualDurationValue, setManualDurationValue] = useState('1');
  const [manualDurationUnit, setManualDurationUnit] = useState<'mins' | 'hours' | 'days'>('hours');

  const handleSaveSettings = () => {
    setUser({ ...user, ...formData });
    setActiveView('menu');
  };

  const handleActivateManualPackage = () => {
    if (!manualPackName || !manualDurationValue) return;
    let ms = 0;
    const val = parseInt(manualDurationValue);
    if (manualDurationUnit === 'mins') ms = val * 60 * 1000;
    else if (manualDurationUnit === 'hours') ms = val * 60 * 60 * 1000;
    else if (manualDurationUnit === 'days') ms = val * 24 * 60 * 60 * 1000;
    
    setUser({
      ...user,
      activePackage: manualPackName,
      expiryTimestamp: Date.now() + ms
    });
    setActiveView('menu');
  };

  const SubPageHeader = ({ title, onBack }: { title: string; onBack: () => void }) => (
    <header className="p-8 flex items-center gap-6 sticky top-0 bg-white dark:bg-zinc-950 z-50">
      <button onClick={onBack} className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-900 dark:text-white active:scale-90 transition-all">
        <ArrowLeft size={20} />
      </button>
      <h2 className={`text-2xl font-black text-zinc-900 dark:text-white ${lang === 'bn' ? 'font-bengali' : 'font-english uppercase italic tracking-tightest'}`}>
        {title}
      </h2>
    </header>
  );

  if (activeView === 'admin') {
    return (
      <div className="animate-in slide-in-from-right duration-300 min-h-screen pb-40 bg-white dark:bg-zinc-950">
        <SubPageHeader title={lang === 'bn' ? 'অ্যাডমিন কন্ট্রোল' : 'Admin Terminal'} onBack={() => setActiveView('settings')} />
        <div className="px-8 space-y-10">
          <div className="bg-zinc-900 p-8 rounded-[3.5rem] border border-zinc-800 space-y-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none"><Hash size={120} className="text-white" /></div>
             <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-600/20"><Terminal size={28} /></div>
                <div>
                   <h3 className="text-white font-black font-english uppercase tracking-tightest text-xl italic">Manual Inject</h3>
                   <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-english">Override Network State</p>
                </div>
             </div>
             <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 font-english">Package Name</label>
                   <input type="text" placeholder="e.g. Ultra Fast 5G" value={manualPackName} onChange={e => setManualPackName(e.target.value)} className="w-full p-5 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm font-black text-white outline-none focus:border-red-600" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 font-english">Duration</label>
                      <input type="number" value={manualDurationValue} onChange={e => setManualDurationValue(e.target.value)} className="w-full p-5 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm font-black text-white outline-none focus:border-red-600" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 font-english">Unit</label>
                      <select value={manualDurationUnit} onChange={e => setManualDurationUnit(e.target.value as any)} className="w-full p-5 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm font-black text-white outline-none focus:border-red-600 appearance-none">
                         <option value="mins">Mins</option>
                         <option value="hours">Hours</option>
                         <option value="days">Days</option>
                      </select>
                    </div>
                </div>
                <button onClick={handleActivateManualPackage} className="w-full py-6 bg-white text-zinc-950 rounded-3xl font-black font-english uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 active:scale-95 transition-all">
                   <Plus size={22} /> Establish Connection
                </button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'settings') {
    return (
      <div className="animate-in slide-in-from-right duration-300 min-h-screen pb-40 bg-white dark:bg-zinc-950">
        <SubPageHeader title={lang === 'bn' ? 'কনফিগারেশন' : 'Configuration'} onBack={() => setActiveView('menu')} />
        <div className="px-8 space-y-12">
           <div className="space-y-4">
              <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] font-english ml-4">Preferences</p>
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800 overflow-hidden">
                <button onClick={onLangToggle} className="w-full flex items-center justify-between p-8 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                  <div className="flex items-center gap-6"><div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center"><Globe size={22} /></div><span className="text-sm font-black uppercase tracking-widest font-english">{lang === 'bn' ? 'ভাষা' : 'Language'}</span></div>
                  <span className="text-[10px] font-black text-red-600 uppercase font-english">{lang.toUpperCase()}</span>
                </button>
                <button onClick={onThemeToggle} className="w-full flex items-center justify-between p-8 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                  <div className="flex items-center gap-6"><div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-2xl flex items-center justify-center">{theme === 'dark' ? <Moon size={22} /> : <Globe size={22} />}</div><span className="text-sm font-black uppercase tracking-widest font-english">{lang === 'bn' ? 'থিম' : 'Theme'}</span></div>
                  <span className="text-[10px] font-black text-red-600 uppercase font-english">{theme.toUpperCase()}</span>
                </button>
              </div>
           </div>
           <div className="space-y-4">
              <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] font-english ml-4">Maintenance</p>
              <button onClick={() => setActiveView('admin')} className="w-full flex items-center justify-between p-8 bg-zinc-950 border border-zinc-800 rounded-[3rem] hover:border-red-600 transition-all">
                <div className="flex items-center gap-6"><div className="w-12 h-12 bg-white/5 text-white rounded-2xl flex items-center justify-center"><Terminal size={22} /></div><span className="text-sm font-black uppercase tracking-widest font-english text-white">Admin Terminal</span></div>
                <ChevronRight size={22} className="text-zinc-600" />
              </button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen px-8 pt-12 space-y-10">
      <div className="bg-zinc-900 rounded-[3.5rem] p-10 shadow-2xl relative overflow-hidden border border-zinc-800 group">
        <div className="absolute top-0 right-0 p-12 opacity-[0.05] group-hover:scale-125 transition-transform duration-1000"><Shield size={180} /></div>
        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-white border border-white/10"><UserCircle size={48} strokeWidth={1} /></div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em] font-english">Connected ID</p>
              <h2 className={`text-3xl font-black text-white ${lang === 'bn' ? 'font-bengali' : 'font-english uppercase italic'}`}>{user.name}</h2>
              <p className="text-[10px] font-black text-zinc-400 font-english uppercase tracking-widest">{user.phone}</p>
            </div>
          </div>
          <div className="bg-white/5 rounded-[2.5rem] p-6 border border-white/5 flex items-center justify-between">
             <div className="text-left"><p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest font-english">Active Protocol</p><p className={`text-sm font-black text-white ${lang === 'bn' ? 'font-bengali' : 'font-english uppercase'}`}>{user.activePackage || 'Offline'}</p></div>
             <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-red-600/20"><Zap size={20} fill="currentColor" /></div>
          </div>
        </div>
      </div>
      <div className="grid gap-3">
         {[
           { id: 'contact', icon: Headphones, label: lang === 'bn' ? 'যোগাযোগ' : 'Support Hub' },
           { id: 'settings', icon: Settings, label: lang === 'bn' ? 'সেটিংস' : 'Settings' }
         ].map(item => (
           <button key={item.id} onClick={() => setActiveView(item.id as any)} className="w-full flex items-center justify-between p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[3rem] group hover:border-red-600 transition-all shadow-sm">
             <div className="flex items-center gap-6"><div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-red-600 group-hover:text-white transition-all"><item.icon size={22} /></div><h4 className={`text-base font-black text-zinc-900 dark:text-white ${lang === 'bn' ? 'font-bengali' : 'font-english uppercase'}`}>{item.label}</h4></div>
             <ChevronRight size={22} className="text-zinc-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
           </button>
         ))}
         <button onClick={() => setUser(null)} className="w-full flex items-center justify-between p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[3rem] group hover:border-red-600 transition-all shadow-sm">
            <div className="flex items-center gap-6"><div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-red-600 group-hover:text-white transition-all"><LogOut size={22} /></div><h4 className={`text-base font-black text-zinc-900 dark:text-white ${lang === 'bn' ? 'font-bengali' : 'font-english uppercase'}`}>{lang === 'bn' ? 'লগ আউট' : 'Disconnect'}</h4></div>
            <ChevronRight size={22} className="text-zinc-300" />
         </button>
      </div>
    </section>
  );
};

export default Profile;

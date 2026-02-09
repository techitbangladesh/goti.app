
import React, { useState } from 'react';
import { Language, TranslationStrings } from '../types';
import { UserCircle, ShieldCheck, ArrowRight, Loader2, User, Mail, Phone } from 'lucide-react';

interface AuthProps {
  lang: Language;
  t: TranslationStrings;
  onLogin: (name: string, email: string, phone: string) => void;
}

const Auth: React.FC<AuthProps> = ({ lang, t, onLogin }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleStartLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError(lang === 'en' ? 'Please fill in all fields' : 'সবগুলো ঘর পূরণ করুন');
      return;
    }
    setIsProcessing(true);
    onLogin(name, email, phone);
  };

  return (
    <section className="py-12 md:py-20 px-5 flex items-center justify-center min-h-[85vh] bg-zinc-50 dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-sm w-full bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl p-8 border border-zinc-100 dark:border-zinc-800 text-center relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="w-16 h-16 bg-red-600/10 dark:bg-red-600/5 rounded-2xl flex items-center justify-center mx-auto text-red-600">
            <UserCircle size={32} />
          </div>
          
          <div className="space-y-1">
            <h2 className={`text-xl font-black text-zinc-900 dark:text-white ${lang === 'bn' ? 'font-bengali' : 'font-english uppercase tracking-tight'}`}>
              {lang === 'bn' ? 'নিরাপদ প্রবেশ' : 'Network Access'}
            </h2>
            <p className={`text-[10px] text-zinc-500 dark:text-zinc-400 font-medium tracking-wide uppercase font-english`}>
              {t.loginPrompt}
            </p>
          </div>

          <form onSubmit={handleStartLogin} className="space-y-3">
            {[
              { id: 'name', val: name, set: setName, icon: User, placeholder: lang === 'en' ? "Full Legal Name" : "আপনার পূর্ণ নাম" },
              { id: 'email', val: email, set: setEmail, icon: Mail, placeholder: lang === 'en' ? "Email Endpoint" : "ইমেইল এড্রেস", type: 'email' },
              { id: 'phone', val: phone, set: setPhone, icon: Phone, placeholder: lang === 'en' ? "Mobile Contact" : "মোবাইল নম্বর", type: 'tel' },
            ].map(field => (
              <div key={field.id} className="relative group">
                <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-red-600" size={14} />
                <input 
                  type={field.type || 'text'}
                  placeholder={field.placeholder}
                  value={field.val}
                  onChange={e => field.set(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:border-red-600 outline-none text-xs font-bold transition-all"
                />
              </div>
            ))}

            {error && <p className="text-red-600 font-bold text-[9px] uppercase tracking-widest font-english pt-1">{error}</p>}

            <button 
              type="submit"
              disabled={isProcessing}
              className="flex items-center justify-center gap-2 w-full py-5 bg-red-600 hover:bg-black text-white font-black rounded-xl transition-all shadow-xl shadow-red-600/20 active:scale-[0.98] mt-6"
            >
              {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${lang === 'bn' ? 'font-bengali text-sm' : 'font-english'}`}>
                {isProcessing ? (lang === 'bn' ? 'প্রক্রিয়া হচ্ছে' : 'Processing') : t.loginViaWA}
              </span>
              {!isProcessing && <ArrowRight size={14} />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Auth;


import React from 'react';
import { Language } from '../types';
import { ShieldCheck, Moon, Sparkles, Smartphone, Check, Zap } from 'lucide-react';

interface RamadanAdProps {
  lang: Language;
}

const RamadanAd: React.FC<RamadanAdProps> = ({ lang }) => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-10 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] w-full rounded-[3rem] md:rounded-[5rem] overflow-hidden bg-zinc-950 border border-white/5 shadow-[0_50px_100px_-20px_rgba(225,6,0,0.3)] group transition-all duration-1000">
          
          {/* Background Layer */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[radial-gradient(circle_at_50%_50%,_#E10600_0%,_transparent_60%)] opacity-[0.15] blur-[120px] group-hover:opacity-[0.25] transition-opacity duration-1000"></div>
            <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-[radial-gradient(circle_at_50%_50%,_#E10600_0%,_transparent_70%)] opacity-[0.05] blur-[100px]"></div>
            
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l2.5 7.5L40 10l-7.5 2.5L30 20l-2.5-7.5L20 10l7.5-2.5L30 0z' fill='%23FFFFFF' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '80px 80px'
            }}></div>

            <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent -rotate-12 translate-y-10"></div>
            <div className="absolute bottom-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/10 to-transparent rotate-12 -translate-y-20"></div>
          </div>

          {/* Content Layer */}
          <div className="relative z-10 h-full w-full flex flex-col lg:flex-row items-center justify-between p-8 md:p-16 lg:p-24 gap-8 md:gap-12">
            
            <div className="flex-1 space-y-8 md:space-y-12 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-6 md:px-8 py-2 md:py-3 bg-red-600/10 border border-red-600/20 rounded-full text-red-600 shadow-xl">
                <Moon size={18} fill="currentColor" />
                <span className="font-english font-black uppercase tracking-[0.3em] text-[8px] md:text-[10px]">Ramadan Kareem 1446</span>
              </div>

              <div className="space-y-6 md:space-y-8">
                <h2 className={`text-4xl md:text-7xl xl:text-8xl font-black text-white leading-[1.1] tracking-tightest ${lang === 'bn' ? 'font-bengali' : 'font-english uppercase'}`}>
                  {lang === 'bn' ? (
                    <>
                      আসছে রামাদানে আপনার ইন্টারনেটকে <br />
                      <span className="text-red-600">শুদ্ধ</span> করার জন্য গতি নিয়ে এলো <br />
                      <span className="text-white italic">Techit Shield</span>
                    </>
                  ) : (
                    <>
                      Purify your <br />
                      <span className="text-red-600">Digital Life</span> <br />
                      with Techit Shield
                    </>
                  )}
                </h2>
                <div className="h-1.5 md:h-2 w-32 md:w-48 bg-red-600 mx-auto lg:mx-0 rounded-full shadow-[0_0_20px_rgba(225,6,0,0.8)]"></div>
              </div>

              <p className={`text-lg md:text-2xl text-zinc-500 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed ${lang === 'bn' ? 'font-bengali' : 'font-english opacity-80'}`}>
                {lang === 'bn' 
                  ? 'আপনার পরিবারের জন্য একটি নিরাপদ এবং অনাকাঙ্ক্ষিত কন্টেন্ট মুক্ত ডিজিটাল পরিবেশ নিশ্চিত করুন।'
                  : 'Experience a distraction-free, spiritually safe internet environment for your family this holy month.'}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 pt-4">
                <button className="w-full sm:w-auto px-10 md:px-16 py-6 md:py-8 bg-red-600 hover:bg-white hover:text-black text-white font-black rounded-2xl md:rounded-3xl transition-all duration-700 shadow-[0_25px_50px_-12px_rgba(225,6,0,0.5)] group/btn flex items-center justify-center gap-4 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-4 focus:ring-offset-black">
                   <ShieldCheck size={28} />
                   <span className={`text-xl md:text-2xl ${lang === 'bn' ? 'font-bengali' : 'font-english uppercase tracking-widest'}`}>
                     {lang === 'bn' ? 'শিল্ড সক্রিয় করুন' : 'Activate Shield'}
                   </span>
                </button>
                <div className="flex items-center gap-3 text-zinc-400 font-english uppercase tracking-[0.4em] text-[10px] md:text-[11px] font-black">
                   <Sparkles size={16} className="text-red-600 animate-pulse" />
                   Priority Service Add-on
                </div>
              </div>
            </div>

            <div className="hidden xl:flex flex-col gap-8 w-[400px] relative">
              <div className="absolute -inset-10 bg-red-600/10 blur-[100px] rounded-full"></div>
              
              <div className="relative bg-white/5 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 shadow-3xl transform rotate-3 hover:rotate-0 transition-all duration-700 overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-20">
                  <Moon size={40} className="text-white" />
                </div>
                
                <Smartphone size={56} className="text-red-600 mb-10" />
                <h4 className="text-3xl font-black text-white mb-8 font-english uppercase tracking-tightest">Secure Core</h4>
                <ul className="space-y-6">
                  {[
                    { bn: 'অ্যাড ব্লকিং', en: 'Ad-Free Browsing' },
                    { bn: 'কন্টেন্ট ফিল্টারিং', en: 'Content Filtering' },
                    { bn: 'প্রাইভেসি প্রোটেকশন', en: 'Privacy Protection' }
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-5 text-zinc-300 group/item">
                      <div className="w-8 h-8 rounded-2xl bg-red-600/20 flex items-center justify-center text-red-600 group-hover/item:bg-red-600 group-hover/item:text-white transition-all shadow-lg">
                        <Check size={18} strokeWidth={4} />
                      </div>
                      <span className={`font-bold text-base ${lang === 'bn' ? 'font-bengali text-xl' : 'font-english'}`}>
                        {lang === 'bn' ? f.bn : f.en}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center gap-6 bg-red-600 p-8 rounded-[3rem] shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-700">
                 <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-red-600 shadow-xl">
                    <Zap size={32} fill="currentColor" />
                 </div>
                 <div>
                    <p className="text-white font-black font-english uppercase tracking-widest text-[10px] opacity-70 mb-1">Ramadan Promo</p>
                    <p className="text-3xl font-black text-white font-english tracking-tightest leading-none">FREE ACCESS</p>
                 </div>
              </div>
            </div>

          </div>
          
          <div className="absolute bottom-6 md:bottom-10 left-8 md:left-24 opacity-30">
            <p className="text-white font-english font-black uppercase tracking-[0.5em] text-[9px] md:text-[11px]">
              © Goti Network By Techit Bangladesh
            </p>
          </div>

          <div className="absolute bottom-8 right-8 flex gap-3 md:gap-4">
             <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-600 shadow-[0_0_15px_rgba(225,6,0,1)]"></div>
             <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-zinc-800"></div>
             <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-zinc-800"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RamadanAd;

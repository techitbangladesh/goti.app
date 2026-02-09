
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, AlertCircle, CheckCircle, Loader2, Scan, Image as ImageIcon, Camera, Zap } from 'lucide-react';
import jsQR from 'jsqr';
import { Language } from '../types';

interface QRScannerProps {
  lang: Language;
  onClose: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ lang, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<'select' | 'camera'>('select');
  const [status, setStatus] = useState<'idle' | 'requesting' | 'scanning' | 'connecting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const scanningRef = useRef<boolean>(false);
  const requestRef = useRef<number>(0);

  const processQRCode = (data: string) => {
    if (data.toLowerCase().includes('goti') || data.startsWith('WIFI:')) {
      setStatus('connecting');
      setTimeout(() => setStatus('success'), 1500);
      return true;
    }
    return false;
  };

  const scanFrame = useCallback(() => {
    if (!scanningRef.current || !videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imgData.data, imgData.width, imgData.height);
        if (code && processQRCode(code.data)) {
          scanningRef.current = false;
          return;
        }
      }
    }
    requestRef.current = requestAnimationFrame(scanFrame);
  }, []);

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (mode === 'camera') {
      setStatus('requesting');
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(s => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            videoRef.current.play().then(() => {
              setStatus('scanning');
              scanningRef.current = true;
              requestRef.current = requestAnimationFrame(scanFrame);
            });
          }
        })
        .catch(() => {
          setStatus('error');
          setErrorMessage(lang === 'en' ? 'Camera access failed.' : 'ক্যামেরা চালু করা যাচ্ছে না।');
        });
    }
    return () => {
      scanningRef.current = false;
      cancelAnimationFrame(requestRef.current);
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, [mode, scanFrame, lang]);

  if (mode === 'select') {
    return (
      <div className="fixed inset-0 z-[2000] bg-zinc-950 flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
        <button onClick={onClose} className="absolute top-12 right-8 p-4 text-zinc-500 hover:text-white"><X size={32} /></button>
        <div className="w-full max-w-sm space-y-12">
          <div className="text-center space-y-5">
            <div className="w-24 h-24 bg-red-600 rounded-[2.5rem] flex items-center justify-center text-white mx-auto shadow-2xl animate-bounce"><Scan size={44} /></div>
            <h2 className="text-white text-4xl font-black font-english uppercase tracking-tightest italic">Goti Scanner</h2>
          </div>
          <div className="space-y-4">
            <button onClick={() => setMode('camera')} className="w-full p-8 bg-zinc-900 border border-zinc-800 rounded-[3rem] flex items-center gap-6 group hover:border-red-600 transition-all">
              <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-zinc-950 group-hover:bg-red-600 group-hover:text-white"><Camera size={28} /></div>
              <div className="text-left"><h3 className="text-white font-black font-english uppercase text-lg">{lang === 'en' ? 'Camera' : 'ক্যামেরা'}</h3><p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">Instant Scan</p></div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[2000] bg-zinc-950 flex flex-col">
      <canvas ref={canvasRef} className="hidden" />
      {status === 'scanning' && <video ref={videoRef} playsInline muted className="w-full h-full object-cover" />}
      <div className="absolute top-12 left-0 w-full px-8 flex items-center justify-between z-[2001]">
         <div className="flex items-center gap-3"><div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white"><Scan size={20} /></div><p className="text-white font-black font-english uppercase tracking-widest text-[10px]">Node Explorer</p></div>
         <button onClick={onClose} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white"><X size={24} /></button>
      </div>
      {status === 'scanning' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 border-2 border-red-600 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-red-600/10 animate-pulse"></div>
            <div className="w-full h-1 bg-red-600 shadow-xl animate-[scan_2s_infinite_linear]"></div>
          </div>
        </div>
      )}
      {(status === 'connecting' || status === 'requesting') && (
        <div className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-6">
          <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
          <p className="text-white font-black uppercase text-[10px] tracking-widest">Processing Node</p>
        </div>
      )}
      {status === 'success' && (
        <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center p-8">
          <div className="bg-zinc-900 w-full max-w-sm p-12 rounded-[4rem] border border-green-500/30 text-center space-y-8 animate-in zoom-in-95">
             <div className="w-24 h-24 bg-green-500/10 rounded-[2.5rem] flex items-center justify-center text-green-500 mx-auto"><CheckCircle size={56} /></div>
             <h3 className="text-white text-3xl font-black uppercase italic">Authenticated</h3>
             <button onClick={onClose} className="w-full py-6 bg-white text-zinc-950 rounded-3xl font-black uppercase tracking-widest text-[12px]">Establish Link</button>
          </div>
        </div>
      )}
      <style>{`@keyframes scan { 0% { transform: translateY(0); } 100% { transform: translateY(256px); } }`}</style>
    </div>
  );
};

export default QRScanner;

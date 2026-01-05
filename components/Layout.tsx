
import React, { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (view: 'home' | 'app' | 'blog') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate }) => {
  const [hasPlan, setHasPlan] = useState(false);

  useEffect(() => {
    const checkSub = () => {
      const saved = localStorage.getItem('leveluresume_sub');
      if (saved) {
        const sub = JSON.parse(saved);
        setHasPlan(sub.credits > 0 || sub.plan === 'monthly');
      }
    };
    checkSub();
    const interval = setInterval(checkSub, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      {/* Fixed Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-black/40 backdrop-blur-xl border-b border-white/5 z-[100]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-9 h-9 bg-white text-black rounded-lg flex items-center justify-center text-[10px] font-black tracking-tighter">LR</div>
            <span className="text-xl font-bold tracking-tight">leveluresume</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-10">
            <button onClick={() => onNavigate('home')} className="text-xs font-medium text-zinc-400 hover:text-white transition-colors">Strategy</button>
            <button onClick={() => onNavigate('app')} className="text-xs font-medium text-zinc-400 hover:text-white transition-colors">AI Analyzer</button>
            <button onClick={() => onNavigate('blog')} className="text-xs font-medium text-zinc-400 hover:text-white transition-colors">Case Studies</button>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('app')}
              className="px-6 py-2.5 bg-white text-black rounded-full text-xs font-bold hover:bg-zinc-200 transition-all active:scale-95"
            >
              Start Analysis
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
            <div className="md:col-span-5">
              <div className="text-2xl font-bold mb-6 tracking-tight">leveluresume</div>
              <p className="text-zinc-500 max-w-sm leading-relaxed text-sm mb-8">
                Empowering the experienced global workforce. We neutralize age discrimination through forensic narrative design and 2026 neural ATS optimization.
              </p>
              <div className="flex gap-4">
                <a href="mailto:contact@leveluresume.com" className="text-xs font-bold text-zinc-400 hover:text-white transition-all underline decoration-zinc-800 underline-offset-4">
                  contact@leveluresume.com
                </a>
              </div>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">Products</h4>
              <ul className="space-y-4 text-zinc-500 text-sm">
                <li><button onClick={() => onNavigate('app')} className="hover:text-white transition-colors">Forensic AI Analyzer</button></li>
                <li><button onClick={() => onNavigate('app')} className="hover:text-white transition-colors">Cover Letter Agent</button></li>
                <li><button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">2026 Market Reports</button></li>
                <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Strategy Pricing</button></li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">Legal</h4>
              <ul className="space-y-4 text-zinc-500 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">2026 Refund Policy</a></li>
                <li><a href="mailto:contact@leveluresume.com" className="hover:text-white transition-colors">Strategy Support</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-[10px] font-medium tracking-widest">
            <span>© 2026 LEVELURESUME.COM — NARRATING THE FUTURE OF WORK.</span>
            <span>GUARANTEED INTERVIEWS IN 30 DAYS OR FULL REFUND.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;


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
    window.addEventListener('storage', checkSub);
    // Poll for changes since storage event only works across tabs
    const interval = setInterval(checkSub, 1000);
    return () => {
      window.removeEventListener('storage', checkSub);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="border-b border-zinc-800 sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div 
            className="text-2xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black text-xs font-black group-hover:bg-zinc-200 transition-colors">LR</div>
            <span className="tracking-tight">leveluresume</span>
          </div>
          <nav className="hidden md:flex space-x-10">
            <button onClick={() => onNavigate('home')} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Strategy</button>
            <button onClick={() => onNavigate('app')} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">AI Analyzer</button>
            <button onClick={() => onNavigate('blog')} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Case Studies</button>
          </nav>
          <div className="flex items-center gap-4">
            {hasPlan && (
              <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Plan Active
              </span>
            )}
            <button 
              onClick={() => onNavigate('app')}
              className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-all active:scale-95"
            >
              Analyze Resume
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-zinc-950 border-t border-zinc-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-2">
              <div className="text-xl font-bold mb-6 tracking-tight">leveluresume</div>
              <p className="text-zinc-500 max-w-sm leading-relaxed">
                Empowering the experienced workforce. We leverage cutting-edge LLMs to neutralize age discrimination and ensure your career narrative meets 2024 standards.
              </p>
              <div className="mt-8 flex gap-4">
                <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer">𝕏</div>
                <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer">in</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-sm uppercase tracking-widest text-zinc-400">Products</h4>
              <ul className="space-y-4 text-zinc-500 text-sm">
                <li><button onClick={() => onNavigate('app')} className="hover:text-white">AI Optimization</button></li>
                <li><button onClick={() => onNavigate('app')} className="hover:text-white">Cover Letter AI</button></li>
                <li><button onClick={() => onNavigate('blog')} className="hover:text-white">SEO Insights</button></li>
                <li><button onClick={() => onNavigate('home')} className="hover:text-white">Pricing</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-sm uppercase tracking-widest text-zinc-400">Legal</h4>
              <ul className="space-y-4 text-zinc-500 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Refund Policy</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-zinc-900 text-zinc-600 text-xs text-center">
            &copy; {new Date().getFullYear()} leveluresume.com - Built for the 40+ professional. Land interviews in 30 days or full refund.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;


import React, { useState } from 'react';
import Layout from './components/Layout';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import Pricing from './components/Pricing';
import Blog from './components/Blog';
import Button from './components/Button';

type View = 'home' | 'app' | 'blog';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');

  const renderHome = () => (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10 animate-soft-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1 mb-8 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.3em]">
            Elite Narrative Design 2026
          </div>
          <h1 className="text-6xl md:text-[100px] font-serif italic tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 leading-[1] pb-2">
            Experience <br className="hidden md:block" /> Mastered.
          </h1>
          <p className="text-base md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Don't let legacy dates define your future. We use 2026 forensic AI to neutralize age-bias and align your expertise with modern neural ATS standards.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" onClick={() => setCurrentView('app')} className="w-full sm:w-72 h-16 text-sm font-bold bg-white text-black rounded-2xl shadow-xl">
              Analyze My Resume
            </Button>
            <Button size="lg" variant="outline" onClick={() => setCurrentView('blog')} className="w-full sm:w-72 h-16 text-sm font-bold border-white/10 text-white rounded-2xl">
              2026 Market Insights
            </Button>
          </div>
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-500/5 blur-[150px] rounded-full -z-10 pointer-events-none"></div>
      </section>

      {/* Trust Banner */}
      <section className="py-16 border-y border-white/5 bg-zinc-950/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: "97%", label: "2026 Match Rate" },
              { val: "45k+", label: "Leaders Optimized" },
              { val: "14 Days", label: "Avg Interview Lead" },
              { val: "Tier-1", label: "Security Protocol" }
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl font-serif italic text-white/90">{stat.val}</div>
                <p className="text-zinc-600 uppercase tracking-[0.2em] text-[8px] font-black">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="animate-soft-fade-up">
              <h2 className="text-4xl md:text-5xl font-serif italic leading-tight mb-12">The Neural ATS <br />Architecture of 2026.</h2>
              <ul className="space-y-12">
                {[
                  { title: "Semantic Neutralization", desc: "Our 2026 models strip away the 'legacy triggers' that cause neural ATS filters to down-rank senior experience." },
                  { title: "Asset-Bridge Mapping", desc: "We translate 20+ years of 'proven history' into high-density 'future ROI' metrics that modern hiring managers crave." },
                  { title: "Digital Fluency Scoring", desc: "Inject specific 2026 technology benchmarks into your profile to prove you aren't just a survivor, but an orchestrator of tech." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-6">
                    <div className="text-2xl font-serif italic text-zinc-800">0{i+1}</div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                      <p className="text-zinc-500 text-sm leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative animate-soft-fade-up" style={{animationDelay: '0.2s'}}>
               <div className="aspect-[4/5] bg-zinc-900 rounded-[40px] overflow-hidden border border-white/5">
                 <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                    alt="Professional Confidence 2026" 
                    className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                  />
               </div>
            </div>
          </div>
        </div>
      </section>

      <Pricing />

      {/* CTA Final */}
      <section className="py-40 bg-gradient-to-b from-transparent to-zinc-950/40">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-serif italic mb-10 leading-tight text-white/90">The 2026 market doesn't wait. <br/>Narrate your value now.</h2>
          <Button size="lg" onClick={() => setCurrentView('app')} className="h-16 px-12 bg-white text-black text-sm font-bold rounded-2xl shadow-xl">Secure My Interview Invite</Button>
        </div>
      </section>
    </div>
  );

  return (
    <Layout onNavigate={setCurrentView}>
      {currentView === 'home' && renderHome()}
      {currentView === 'app' && <ResumeAnalyzer />}
      {currentView === 'blog' && <Blog />}
    </Layout>
  );
};

export default App;

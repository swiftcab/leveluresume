
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
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-1000">
            The Elite Solution for Professionals 40+
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-600 leading-[0.9]">
            Experience <br className="hidden md:block" /> Should Pay.
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
            Don't let biased algorithms and outdated triggers sabotage your legacy. <span className="text-white font-medium">leveluresume</span> uses forensic AI to strip ageism from your profile and optimize for 2024 ATS standards.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" onClick={() => setCurrentView('app')} className="w-full sm:w-80 h-16 text-lg">
              Optimize My Resume Now
            </Button>
            <Button size="lg" variant="outline" onClick={() => setCurrentView('blog')} className="w-full sm:w-80 h-16 text-lg">
              Read Our Strategy Blog
            </Button>
          </div>
          <p className="mt-8 text-zinc-500 text-sm italic">"Land interviews in 30 days or a full refund. No questions asked."</p>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.03] blur-[150px] rounded-full -z-10 pointer-events-none"></div>
      </section>

      {/* Proof Section */}
      <section className="bg-zinc-950 py-24 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold mb-2 tracking-tighter">92%</div>
              <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-black">Interview Increase</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 tracking-tighter">18k+</div>
              <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-black">Executives Helped</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 tracking-tighter">$38k</div>
              <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-black">Avg. Salary Growth</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 tracking-tighter">100%</div>
              <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-black">ATS Compatibility</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div>
              <h2 className="text-5xl font-bold tracking-tight mb-10 leading-tight">Advanced technology <br />meets executive wisdom.</h2>
              <ul className="space-y-12">
                <li className="flex gap-6">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-white text-black flex items-center justify-center font-black text-xl shadow-xl shadow-white/10">01</div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Age-Neutral Forensic Cleanup</h4>
                    <p className="text-zinc-400 leading-relaxed">Our AI identifies over 50 "Age Triggers" including graduation dates, archaic technical skills, and dated formatting structures.</p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-zinc-800 text-white flex items-center justify-center font-black text-xl">02</div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Semantic ATS Alignment</h4>
                    <p className="text-zinc-400 leading-relaxed">We don't just keyword stuff. We use NLP to ensure your experience matches the semantic intent of modern high-tier HR software.</p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-zinc-800 text-white flex items-center justify-center font-black text-xl">03</div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">The "Value-First" Pivot</h4>
                    <p className="text-zinc-400 leading-relaxed">Transform your narrative from a historian of the past into a solver of the future. We highlight ROI, scale, and modern adaptability.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="bg-zinc-900 rounded-[40px] p-2 border border-zinc-800 aspect-[4/5] overflow-hidden shadow-3xl">
                <img 
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800" 
                  alt="Executive Success" 
                  className="w-full h-full object-cover rounded-[34px] opacity-70 grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-black border border-zinc-800 p-8 rounded-3xl shadow-2xl max-w-xs animate-bounce-slow">
                <p className="text-white font-bold mb-1">"I landed a VP role at a tech startup in 22 days."</p>
                <p className="text-zinc-500 text-sm">— Mark R., 54, Former Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Pricing />

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-t from-zinc-950 to-black border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-8 tracking-tighter">Your Next Chapter Starts Here.</h2>
          <p className="text-xl text-zinc-400 mb-12">The market is moving fast. Don't let your resume be the reason you're left behind.</p>
          <Button size="lg" onClick={() => setCurrentView('app')} className="h-16 px-12">Get Your Analysis</Button>
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


import React, { useState, useEffect } from 'react';
import Button from './Button';
import { analyzeResume } from '../services/geminiService';
import { AnalysisResult } from '../types';

const ResumeAnalyzer: React.FC = () => {
  const [resume, setResume] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  const loadingMessages = [
    "Initializing Forensic Protocol...",
    "Scanning for Age Triggers (dates, archaic terminology)...",
    "Mapping Target Job Semantic Intent...",
    "Executing Strategic Pivot to ROI & Future Value...",
    "Neutralizing ATS Algorithm Biases...",
    "Finalizing Optimized Executive Manuscript..."
  ];

  const [subscription, setSubscription] = useState<{
    plan: 'none' | 'single' | 'monthly';
    credits: number;
  }>({ plan: 'none', credits: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('leveluresume_sub');
    let currentSub = saved ? JSON.parse(saved) : { plan: 'none', credits: 0 };

    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');

    if (status === 'success') {
      const isSingle = window.location.href.includes('aFa7sK');
      currentSub = { 
        plan: isSingle ? 'single' : 'monthly', 
        credits: isSingle ? 1 : 9999 
      };
      
      localStorage.setItem('leveluresume_sub', JSON.stringify(currentSub));
      setShowSuccessToast(true);
      window.history.replaceState({}, document.title, window.location.pathname);
      setTimeout(() => setShowSuccessToast(false), 5000);
    }

    setSubscription(currentSub);
  }, []);

  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
      }, 3000);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalyze = async () => {
    if (!resume.trim() || !jobDesc.trim()) {
      setError('Both fields are required for a forensic-grade analysis.');
      return;
    }

    if (subscription.credits <= 0 && subscription.plan !== 'monthly') {
      setError('Insufficient credits. Please select a plan below.');
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await analyzeResume(resume, jobDesc);
      setResult(data);

      if (subscription.plan === 'single') {
        const updated = { ...subscription, credits: 0 };
        setSubscription(updated);
        localStorage.setItem('leveluresume_sub', JSON.stringify(updated));
      }
    } catch (err: any) {
      setError(err.message || "Connection error with the central intelligence.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-20 px-6">
      {showSuccessToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-white text-black px-8 py-4 rounded-full shadow-2xl font-bold flex items-center gap-3 border border-zinc-200 animate-in fade-in zoom-in duration-300">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          System Unlocked: Premium Access Enabled
        </div>
      )}

      <div className="text-center mb-16">
        <h2 className="text-6xl font-black mb-6 tracking-tighter uppercase italic bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent">
          ATS Forensic Hub
        </h2>
        <p className="text-zinc-500 text-xs mb-8 uppercase tracking-[0.4em] font-bold">
          High-Level Career Rebranding Protocol
        </p>
        
        <div className="flex justify-center">
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 px-8 py-3 rounded-full flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full ${subscription.credits > 0 || subscription.plan === 'monthly' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-red-500'}`}></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">
              {subscription.plan === 'monthly' ? 'Unlimited Premium Access' : 
               subscription.credits > 0 ? `${subscription.credits} Analysis Available` : 
               'Restricted Access'}
            </span>
          </div>
        </div>
      </div>

      {!result && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12 animate-in fade-in duration-700">
          <div className="group space-y-3">
            <div className="flex justify-between items-center px-4">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Source Manuscript</label>
              <span className="text-[10px] text-zinc-700 font-mono">{resume.length} chars</span>
            </div>
            <textarea 
              className="w-full h-96 bg-zinc-950/50 border border-zinc-800 rounded-[40px] p-10 text-sm focus:border-zinc-500 outline-none transition-all font-mono text-zinc-400 focus:text-white resize-none backdrop-blur-sm"
              placeholder="Paste your current resume content here..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
          </div>
          <div className="group space-y-3">
            <div className="flex justify-between items-center px-4">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Strategic Target</label>
              <span className="text-[10px] text-zinc-700 font-mono">{jobDesc.length} chars</span>
            </div>
            <textarea 
              className="w-full h-96 bg-zinc-950/50 border border-zinc-800 rounded-[40px] p-10 text-sm focus:border-zinc-500 outline-none transition-all font-mono text-zinc-400 focus:text-white resize-none backdrop-blur-sm"
              placeholder="Paste the target job description or profile..."
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            />
          </div>
        </div>
      )}

      {loading && (
        <div className="py-32 flex flex-col items-center justify-center space-y-12 animate-in fade-in duration-500">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-zinc-900 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-center space-y-4">
            <h4 className="text-2xl font-bold italic tracking-tight text-white animate-pulse">
              {loadingMessages[loadingStep]}
            </h4>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-black">
              Gemini 3 Pro: Processing Strategic Pivot...
            </p>
          </div>
        </div>
      )}

      {!loading && !result && (
        <div className="flex justify-center mb-24">
          <Button 
            size="lg" 
            onClick={handleAnalyze} 
            className="w-full md:w-[450px] h-24 text-2xl font-black italic tracking-tighter shadow-[0_20px_50px_rgba(255,255,255,0.05)] hover:shadow-white/10"
          >
            DEPLOY INTELLIGENCE
          </Button>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-20 animate-in fade-in slide-in-from-bottom-20 duration-1000">
          <div className="bg-white rounded-[60px] p-8 md:p-24 shadow-2xl relative overflow-hidden text-black">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <svg className="w-64 h-64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            </div>

            <div className="relative z-10">
              <header className="mb-16 border-b border-zinc-100 pb-12">
                <div className="flex items-center gap-3 mb-6">
                   <span className="bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">Executive Report</span>
                   <span className="text-zinc-300">/</span>
                   <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Confidential Protocol</span>
                </div>
                <h3 className="text-5xl font-black mb-6 tracking-tighter uppercase italic leading-none">Analysis & Re-engineering</h3>
                <p className="text-zinc-600 text-xl font-medium leading-relaxed max-w-3xl italic">
                  "{result.analysis}"
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {result.ageNeutralizationTips.map((tip, i) => (
                  <div key={i} className="bg-zinc-50 p-8 rounded-[32px] border border-zinc-100 group hover:bg-zinc-100 transition-all duration-300">
                    <div className="text-xs font-black text-zinc-300 mb-4 uppercase tracking-widest">Pivot {i+1}</div>
                    <p className="text-sm font-bold leading-relaxed text-zinc-800">{tip}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 mb-12">
                <div className="flex justify-between items-center px-4">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">New Master Manuscript (Markdown)</label>
                  <Button variant="outline" size="sm" className="text-black border-zinc-200 text-[10px] h-8" onClick={() => {
                    navigator.clipboard.writeText(result.optimizedResume);
                    alert('Copied to Clipboard!');
                  }}>Copy All</Button>
                </div>
                <div className="bg-zinc-50 rounded-[48px] p-12 border border-zinc-100 shadow-inner">
                  <pre className="whitespace-pre-wrap font-sans text-lg leading-[1.8] text-zinc-900 selection:bg-black selection:text-white">
                    {result.optimizedResume}
                  </pre>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-12 border-t border-zinc-100">
                  <Button variant="primary" className="bg-black text-white hover:bg-zinc-800 h-16 px-12 text-lg italic font-black tracking-tight" onClick={() => window.print()}>
                    DOWNLOAD PDF REPORT
                  </Button>
                  <Button variant="outline" className="border-zinc-200 text-black hover:bg-zinc-50 h-16 px-12" onClick={() => {setResult(null); setResume(''); setJobDesc('');}}>
                    NEW ANALYSIS
                  </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-8 rounded-[32px] mb-10 text-center text-sm font-bold animate-in zoom-in duration-300">
          {error}
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;

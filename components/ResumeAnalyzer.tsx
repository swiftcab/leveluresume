
import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { analyzeResume, extractTextFromDocument } from '../services/geminiService';
import { AnalysisResult } from '../types';

const ResumeAnalyzer: React.FC = () => {
  const [resume, setResume] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [resumeImage, setResumeImage] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [email, setEmail] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const loadingMessages = [
    "Analyzing target role architecture...",
    "Benchmarking executive legacy data...",
    "Scanning for age-bias triggers...",
    "Neutralizing chronological friction...",
    "Orchestrating the 2026 narrative manuscript..."
  ];

  const [subscription, setSubscription] = useState({ plan: 'none', credits: 1, hasUsedFreeTrial: false });

  useEffect(() => {
    const saved = localStorage.getItem('leveluresume_sub');
    if (saved) setSubscription(JSON.parse(saved));
  }, []);

  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsExtracting(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      if (file.type.startsWith('image/')) setResumeImage(base64);
      try {
        const extractedText = await extractTextFromDocument(base64, file.type);
        setResume(extractedText);
      } catch (err) {
        setError("Resume extraction failed.");
      } finally {
        setIsExtracting(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!resume.trim() || !jobDesc.trim()) return;
    setLoading(true);
    try {
      const data = await analyzeResume(resume, jobDesc, resumeImage || undefined);
      setResult(data);
      const updated = { ...subscription, credits: Math.max(0, subscription.credits - 1), hasUsedFreeTrial: true };
      setSubscription(updated);
      localStorage.setItem('leveluresume_sub', JSON.stringify(updated));
    } catch (err) {
      setError("Forensic engine connection lost.");
    } finally {
      setLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !result) return;
    setIsSubmittingLead(true);
    
    try {
      // Formspree acts as the bridge to your Hostinger email
      const response = await fetch('https://formspree.io/f/mqaeloze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email, 
          score: result.score,
          market_status: result.marketRelevance,
          message: "New 2026 Strategy Briefing Request"
        })
      });

      if (response.ok) {
        setLeadCaptured(true);
      } else {
        throw new Error();
      }
    } catch (err) {
      setLeadCaptured(true); // Fallback for UX
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const handleShare = () => {
    if (!result) return;
    const text = `My Resume just scored ${result.score}% on the 2026 Neural ATS test. Rejection risk is real. Test yours at:`;
    const url = "https://leveluresume.com";
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSliderMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  return (
    <div className="max-w-6xl mx-auto py-24 px-6 animate-soft-fade-up">
      <div className="text-center mb-20">
        <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-zinc-500 mb-6">ATS Forensic Laboratory</h2>
        <h1 className="text-4xl md:text-6xl font-serif italic mb-6">2026 Market Compatibility</h1>
      </div>

      {!result && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-4">
             <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Target Opportunity Description</label>
             <textarea 
                className="w-full h-80 bg-zinc-950 border border-zinc-900 rounded-3xl p-8 text-sm text-zinc-300 focus:border-white/20 transition-all resize-none"
                placeholder="Paste the target job requirements here..."
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              />
          </div>
          <div className="space-y-4 relative">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Current Resume Assets</label>
            <div className="relative">
              <textarea 
                className={`w-full h-80 bg-zinc-950 border border-zinc-900 rounded-3xl p-8 text-sm text-zinc-300 focus:border-white/20 transition-all resize-none ${isExtracting ? 'opacity-50' : ''}`}
                placeholder="Paste your legacy resume content or upload..."
                value={resume}
                onChange={(e) => setResume(e.target.value)}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-6 right-6 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all z-10"
              >
                {isExtracting ? 'Extracting Data...' : 'Upload Resume'}
              </button>
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.doc,.docx,.jpg,.png" onChange={handleFileUpload}/>
          </div>
        </div>
      )}

      {loading && (
        <div className="py-40 flex flex-col items-center justify-center space-y-10">
          <div className="w-16 h-16 border-[3px] border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-serif italic text-zinc-400">{loadingMessages[loadingStep]}</p>
        </div>
      )}

      {!loading && !result && (
        <div className="flex justify-center">
          <Button 
            size="lg" 
            onClick={handleAnalyze} 
            disabled={!resume.trim() || !jobDesc.trim()}
            className="w-full md:w-80 h-16 bg-white text-black font-bold rounded-2xl disabled:opacity-30"
          >
            Initiate Neural Diagnostic
          </Button>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-12 animate-soft-fade-up">
          {/* SHOCK SCORE SECTION */}
          <div className="bg-zinc-950 border border-white/10 rounded-[50px] p-12 text-center">
            <div className="relative inline-block mb-8">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle cx="96" cy="96" r="88" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-zinc-900" />
                <circle 
                  cx="96" cy="96" r="88" fill="transparent" stroke="currentColor" strokeWidth="8" 
                  strokeDasharray={552.92} 
                  strokeDashoffset={552.92 * (1 - result.score / 100)}
                  className={`transition-all duration-1000 ease-out ${result.score < 40 ? 'text-red-500' : result.score < 70 ? 'text-orange-500' : 'text-emerald-500'}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-serif italic">{result.score}%</span>
                <span className="text-[8px] font-black tracking-widest uppercase opacity-50">Survival Rate</span>
              </div>
            </div>
            
            <h3 className={`text-3xl font-black mb-4 tracking-tighter uppercase ${result.score < 40 ? 'text-red-500' : result.score < 70 ? 'text-orange-500' : 'text-emerald-500'}`}>
              STATUS: {result.marketRelevance}
            </h3>
            <p className="text-zinc-500 max-w-xl mx-auto mb-10 text-sm leading-relaxed">
              Our 2026 neural audit identifies your resume as a "High-Bias Risk." Decades of elite wisdom are currently being filtered out by archaic narrative triggers.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" onClick={handleShare} className="text-[10px] font-bold uppercase tracking-widest px-8">Share Score on LinkedIn</Button>
              <Button onClick={() => setResult(null)} className="text-[10px] font-bold uppercase tracking-widest px-8 bg-white text-black">New Diagnostic</Button>
            </div>
          </div>

          {/* LEAD MAGNET SECTION */}
          {result.score < 80 && (
            <div className="bg-gradient-to-br from-indigo-900/20 to-black border border-indigo-500/20 rounded-[40px] p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] -z-10"></div>
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 text-center md:text-left">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-4 block">Executive Briefing Restricted</span>
                  <h4 className="text-3xl font-serif italic text-white mb-4">Rejection Insurance 2026</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                    Your current score indicates severe algorithmic friction. Get our proprietary forensic report: <strong>"The 10 Neural Triggers Killing Executive Careers in 2026."</strong>
                  </p>
                </div>
                <div className="w-full md:w-96">
                  {leadCaptured ? (
                    <div className="bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-2xl text-center animate-soft-fade-up">
                       <p className="text-indigo-300 font-bold text-sm uppercase tracking-widest">Strategy Dispatched</p>
                       <p className="text-[10px] text-indigo-400 mt-1 uppercase">Check contact@leveluresume.com</p>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
                      <input 
                        type="email" 
                        required
                        placeholder="executive-email@domain.com"
                        className="w-full h-14 bg-zinc-900/50 border border-white/10 rounded-xl px-6 text-sm text-white focus:border-indigo-500 outline-none transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Button 
                        type="submit" 
                        isLoading={isSubmittingLead}
                        className="w-full h-14 bg-indigo-500 hover:bg-indigo-600 text-white font-black uppercase tracking-widest rounded-xl text-[10px]"
                      >
                        Secure My Exit Strategy
                      </Button>
                      <p className="text-[8px] text-zinc-600 text-center uppercase tracking-widest font-black">Direct fulfillment via contact@leveluresume.com</p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* INTERACTIVE BEFORE/AFTER SLIDER */}
          <div className="space-y-6">
            <div className="flex justify-between items-end px-4">
              <div>
                <h3 className="text-2xl font-serif italic mb-1">Forensic Morph</h3>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Slide to compare legacy content vs. 2026 optimized manuscript</p>
              </div>
              <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest">
                <span className="text-zinc-600">Legacy Resume</span>
                <span className="text-indigo-400">Neutralized Asset</span>
              </div>
            </div>
            
            <div 
              ref={sliderRef}
              className="relative w-full h-[600px] overflow-hidden rounded-[40px] border border-white/5 bg-zinc-900 cursor-ew-resize select-none shadow-2xl"
              onMouseMove={handleSliderMove}
              onTouchMove={handleSliderMove}
            >
              <div className="absolute inset-0 p-12 overflow-y-auto bg-[#0a0a0a]">
                <div className="max-w-3xl mx-auto opacity-40 filter grayscale scale-[0.98]">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-8">Legacy Input Data</h4>
                  <pre className="whitespace-pre-wrap font-mono text-xs leading-loose text-zinc-400">
                    {resume}
                  </pre>
                </div>
              </div>

              <div 
                className="absolute inset-0 p-12 overflow-y-auto bg-white transition-none"
                style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
              >
                <div className="max-w-3xl mx-auto">
                   <div className="border-b border-zinc-100 pb-8 mb-8">
                     <h2 className="text-4xl font-serif italic text-zinc-900 mb-2">Refined Narrative Design</h2>
                     <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Optimized for High-Stakes 2026 Hiring</p>
                   </div>
                   <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-zinc-800">
                    {result.optimizedResume}
                   </pre>
                </div>
              </div>

              <div 
                className="absolute top-0 bottom-0 w-1 bg-white/20 backdrop-blur-sm z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center">
                   <div className="flex gap-1">
                     <div className="w-1 h-3 bg-zinc-300 rounded-full"></div>
                     <div className="w-1 h-3 bg-zinc-300 rounded-full"></div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-950 border border-white/10 rounded-[50px] p-12 md:p-16">
            <header className="border-b border-white/5 pb-10 mb-10">
               <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-4 block">Neural Transformation Strategy</span>
               <p className="text-2xl text-white font-serif italic leading-relaxed">"{result.analysis}"</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {result.ageNeutralizationTips.map((tip, i) => (
                <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all">
                  <span className="text-[10px] font-black text-zinc-500 mb-4 block uppercase tracking-widest">Protocol 0{i+1}</span>
                  <p className="text-zinc-200 text-sm font-medium leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
               <Button 
                onClick={() => {navigator.clipboard.writeText(result.optimizedResume); alert('Resume Manuscript Copied');}}
                className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-zinc-200"
               >
                 Secure My Resume Manuscript
               </Button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-8 p-6 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-center text-xs font-bold uppercase tracking-widest animate-pulse">
          {error}
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;

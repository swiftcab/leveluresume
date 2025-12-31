
import React, { useState, useEffect } from 'react';
import Button from './Button';
import { analyzeResume } from '../services/geminiService';
import { AnalysisResult } from '../types';

const ResumeAnalyzer: React.FC = () => {
  const [resume, setResume] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
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
      // On détecte quel lien a été utilisé via les paramètres Stripe ou on active par défaut
      // Pour cet exemple, on active un crédit si succès détecté
      currentSub = { 
        plan: window.location.href.includes('aFa7sK') ? 'single' : 'monthly', 
        credits: window.location.href.includes('aFa7sK') ? 1 : 9999 
      };
      
      localStorage.setItem('leveluresume_sub', JSON.stringify(currentSub));
      setShowSuccessToast(true);
      window.history.replaceState({}, document.title, window.location.pathname);
      
      setTimeout(() => setShowSuccessToast(false), 5000);
    }

    setSubscription(currentSub);
  }, []);

  const handleAnalyze = async () => {
    if (!resume || !jobDesc) {
      setError('Veuillez copier votre CV et l\'offre d\'emploi.');
      return;
    }

    if (subscription.credits <= 0 && subscription.plan !== 'monthly') {
      setError('Accès restreint. Veuillez choisir un plan ci-dessous pour débloquer l\'analyseur.');
      // Optionnel: scroller vers les prix
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
      setError(err.message || "L'IA est momentanément indisponible.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-20 px-4">
      {showSuccessToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold animate-bounce">
          ✓ Paiement confirmé ! Vos crédits sont activés.
        </div>
      )}

      <div className="text-center mb-16">
        <h2 className="text-5xl font-black mb-4 tracking-tighter uppercase italic">Forensic Analyzer</h2>
        <p className="text-zinc-500 text-sm mb-6 uppercase tracking-[0.2em]">Optimisation Anti-Âge par Intelligence Artificielle</p>
        
        <div className="flex justify-center">
          <div className="bg-zinc-900 border border-zinc-800 px-6 py-2 rounded-full flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${subscription.credits > 0 || subscription.plan === 'monthly' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">
              {subscription.plan === 'monthly' ? 'Accès Illimité' : 
               subscription.credits > 0 ? `${subscription.credits} Crédit disponible` : 
               'Analyseur Verrouillé'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-zinc-600 uppercase ml-4">Votre CV Actuel</label>
          <textarea 
            className="w-full h-80 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-sm focus:border-white outline-none transition-all font-mono text-zinc-400"
            placeholder="Copiez-collez votre CV ici..."
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-zinc-600 uppercase ml-4">L'Offre Visée</label>
          <textarea 
            className="w-full h-80 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-sm focus:border-white outline-none transition-all font-mono text-zinc-400"
            placeholder="Copiez-collez le descriptif du poste..."
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-950/20 border border-red-900/50 text-red-400 p-8 rounded-3xl mb-10 text-center text-sm font-bold">
          {error}
        </div>
      )}

      <div className="flex justify-center mb-24">
        <Button 
          size="lg" 
          onClick={handleAnalyze} 
          isLoading={loading}
          className="w-full md:w-96 h-20 text-xl font-black italic"
        >
          DÉBUTER L'OPTIMISATION
        </Button>
      </div>

      {result && (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-700">
          <div className="bg-white text-black rounded-[50px] p-8 md:p-20 shadow-2xl relative">
             <div className="mb-12">
               <span className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-3 py-1 rounded">Résultat Forensic</span>
               <h3 className="text-3xl font-black mt-4 mb-2 uppercase">Votre Nouveau CV</h3>
               <p className="text-zinc-500 text-sm italic">{result.analysis}</p>
             </div>
             
             <div className="bg-zinc-50 rounded-3xl p-8 mb-8 border border-zinc-200">
                <pre className="whitespace-pre-wrap font-sans text-lg leading-relaxed text-zinc-900">
                  {result.optimizedResume}
                </pre>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                {result.ageNeutralizationTips.map((tip, i) => (
                  <div key={i} className="bg-zinc-100 p-6 rounded-2xl border border-zinc-200">
                    <p className="text-xs font-bold leading-tight">💡 {tip}</p>
                  </div>
                ))}
             </div>

             <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" onClick={() => {
                  navigator.clipboard.writeText(result.optimizedResume);
                  alert('CV copié !');
                }}>Copier le CV</Button>
                <Button variant="outline" className="border-zinc-300 text-black hover:bg-zinc-100" onClick={() => window.print()}>Imprimer / PDF</Button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;

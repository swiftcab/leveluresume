
import React from 'react';
import { PRICING_PLANS } from '../constants';
import Button from './Button';

const Pricing: React.FC = () => {
  return (
    <div className="py-24 bg-black" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Invest in Your Experience</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">The "Overqualified" label is expensive. Our protocols pay for themselves with your first interview invite.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan) => (
            <div 
              key={plan.id}
              className={`relative rounded-3xl p-8 border ${plan.popular ? 'border-white bg-zinc-900 shadow-[0_0_40px_rgba(255,255,255,0.05)]' : 'border-zinc-800 bg-black'} transition-transform hover:scale-[1.02] duration-300 ${plan.comingSoon ? 'opacity-80' : ''}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              {plan.comingSoon && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-zinc-700">
                  Coming Soon
                </span>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-zinc-500 text-sm mb-6">{plan.description}</p>
              <div className="mb-8">
                <span className="text-4xl font-bold">{plan.price}</span>
              </div>
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                    <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.comingSoon ? (
                <Button 
                  className="w-full" 
                  variant="outline"
                  disabled
                >
                  Coming Soon
                </Button>
              ) : (
                <a href={plan.paymentLink} className="block">
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'primary' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800 text-center">
          <h4 className="text-lg font-bold mb-2">Our Performance Guarantee</h4>
          <p className="text-zinc-400">Land interviews in 30 days or we refund you in full. Your experience is your edge—let's prove it.</p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;


import { PricingPlan, BlogPost } from './types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'career-accelerator',
    name: 'Executive Single',
    price: '$19',
    description: 'A surgical strike on your priority application. Get noticed now.',
    features: [
      'Gemini 3 Pro Forensic Analysis',
      'Age Trigger Neutralization',
      '2025 ATS Semantic Re-coding',
      'Instant Access (Single Credit)'
    ],
    cta: 'Optimize 1 Resume',
    paymentLink: 'https://buy.stripe.com/aFa7sKft5fqc50Yegs9Zm02'
  },
  {
    id: 'interview-machine',
    name: 'The Monthly Pass',
    price: '$49/mo',
    description: 'For the aggressive seeker. Total market domination.',
    features: [
      'UNLIMITED AI Optimizations',
      'Cover Letter Engine v2.0',
      'Permanent CV Health Scanner',
      '24/7 Priority Protocol Support'
    ],
    cta: 'Get Unlimited Access',
    popular: true,
    paymentLink: 'https://buy.stripe.com/eVq00i5Sva5S7963BO9Zm01'
  },
  {
    id: 'transformation-suite',
    name: 'Total Rebrand',
    price: '$249',
    description: 'The ultimate C-Suite makeover. We build your legacy narrative.',
    features: [
      'Full Monthly Pass Access',
      'LinkedIn Profile Forensic Audit',
      'Executive Negotiation Scripts',
      'High-Stakes Strategy Guide'
    ],
    cta: 'Reserve Your Spot',
    paymentLink: '#',
    comingSoon: true
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The 15-Year Rule: How to Ghost Your Graduation Year and Double Your Salary',
    slug: 'science-dates-cv',
    category: 'Strategy',
    date: 'Jan 2025',
    excerpt: 'Your graduation year is your worst enemy. Here is how to delete it without looking like you are hiding something.',
    content: `
The Science of Neutral Timing

Ageism is a silent killer. It triggers the second a recruiter sees a date from the 90s. 

The Ghost Degree
Listing your school is mandatory. Listing 1996 is a liability. In the high-stakes world of executive hiring, 2025 standards dictate that you list the institution and the degree only. The year is irrelevant data that only serves to put you in a box. 

The 15-Year Barrier
Modern ATS algorithms and junior recruiters have a 15-year window. Anything before 2010 is ancient history. We move your early career into a specific section called "Foundational Experience." No dates. No fluff. Just the proof that you have been winning since day one.

Modern Terminology
The language of business has changed. If your resume says "Personnel Management," you are already obsolete. We flip that to "Talent Strategy & Human Capital ROI." Speak the language of the person signing the check.
    `
  },
  {
    id: '2',
    title: 'Why Workday and Greenhouse are Trashing Your 20-Page Resume',
    slug: 'comprendre-ats-modernes',
    category: 'Technical',
    date: 'Feb 2025',
    excerpt: 'Stop keyword stuffing. Start Intent Matching. Here is how the new AI-driven ATS actually sorts candidates.',
    content: `
The Era of Semantic Search

Keyword stuffing is dead. If you are still trying to hide "Sales" in white text at the bottom of your CV, you are fighting a losing battle. 

Intent Matching
Modern systems like Workday use NLP (Natural Language Processing). They don't look for the word "Sales." They look for evidence of "Ability to scale revenue in a SaaS environment." We re-write your bullet points to trigger these high-value intent matches.

Compatibility Scoring
Our data shows that an optimized resume reaches a 94% compatibility score on average. Standard resumes? They barely hit 62%. That 32% gap is the difference between a six-figure offer and a "We've decided to move in another direction" email.
    `
  }
];

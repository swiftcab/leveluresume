
import { PricingPlan, BlogPost } from './types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'career-accelerator',
    name: 'Career Accelerator',
    price: '$19.50',
    description: 'Optimisation forensique unique pour une candidature stratégique.',
    features: [
      '1 Crédit d\'optimisation complet',
      'Nettoyage des déclencheurs d\'âge',
      'Alignement sémantique ATS',
      'Lettre de motivation incluse'
    ],
    cta: 'Acheter 1 Crédit',
    paymentLink: 'https://buy.stripe.com/aFa7sKft5fqc50Yegs9Zm02'
  },
  {
    id: 'interview-machine',
    name: 'Interview Machine',
    price: '$49.50/mo',
    description: 'Le choix des candidats actifs. Accès illimité.',
    features: [
      'Optimisations ILLIMITÉES',
      'Générateur de lettres à volonté',
      'Scanner de CV anti-âge permanent',
      'Support prioritaire par email'
    ],
    cta: 'Passer en Illimité',
    popular: true,
    paymentLink: 'https://buy.stripe.com/eVq00i5Sva5S7963BO9Zm01'
  },
  {
    id: 'transformation-suite',
    name: 'Executive Suite',
    price: '$248.50',
    description: 'La refonte totale de votre marque personnelle pour dirigeants.',
    features: [
      'Tout le plan Interview Machine',
      'Optimisation Profil LinkedIn',
      'Script de négociation de salaire',
      'Accès direct à un stratège senior'
    ],
    cta: 'Coming Soon',
    paymentLink: '#',
    comingSoon: true
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Comment supprimer les déclencheurs d\'âge de votre CV',
    slug: 'guide-anti-agisme',
    category: 'Stratégie',
    date: 'Jan 2024',
    excerpt: 'Apprenez à présenter vos 20 ans d\'expérience comme un atout moderne sans effrayer les recruteurs.',
    content: `
# L'expérience est une force, pas un fardeau.

Dans le marché actuel, les algorithmes ATS filtrent souvent les candidats trop expérimentés en se basant sur des dates de diplômes ou des technologies obsolètes.

## 1. La règle de la graduation
Si votre diplôme a plus de 15 ans, supprimez l'année. Mentionnez l'institution et le titre, c'est suffisant.

## 2. Le nettoyage technologique
Ne listez plus "Microsoft Office". Listez des compétences comme "Transformation Digitale", "Agile", ou "IA Générative appliquée au management".

## 3. La chronologie sélective
Ne remontez pas au-delà de 2005 dans votre section expérience détaillée. Résumez votre début de carrière en une ligne : "Parcours initial en gestion de projets (1995-2005)".
    `
  }
];


export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  paymentLink: string;
  popular?: boolean;
  comingSoon?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  slug: string;
}

export interface AnalysisResult {
  optimizedResume: string;
  analysis: string;
  ageNeutralizationTips: string[];
}

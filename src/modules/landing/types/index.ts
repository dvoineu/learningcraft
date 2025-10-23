/**
 * Landing Module Types
 */

export interface LandingPageProps {
  locale: string;
  dictionary: any;
}

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

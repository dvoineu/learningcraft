# Landing Module

Marketing landing page components.

## Features

- Hero section
- Features showcase
- How it works
- Pricing plans
- Testimonials
- FAQ section
- Call-to-action sections

## Components

- `LandingPage` - Main landing page
- `Hero` - Hero section
- `Features` - Features showcase
- `HowItWorks` - Process explanation
- `Pricing` - Pricing plans
- `Testimonials` - User testimonials
- `FAQ` - Frequently asked questions
- `FinalCTA` - Final call-to-action
- `Header` - Navigation header
- `Demo` - Interactive demo
- `SocialProof` - Social proof elements
- `Subjects` - Subject showcase

## Usage

```tsx
import { LandingPage } from '@/modules/landing';

function HomePage({ locale, dictionary }) {
  return <LandingPage locale={locale} dictionary={dictionary} />;
}
```

## Types

- Landing page props and configuration types

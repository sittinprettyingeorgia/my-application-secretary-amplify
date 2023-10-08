import { Plan } from '@/types';

export const ROUTES = {
  LANDING: '/',
  PRICING: '/pricing',
  FAQ: '/faq',
  LOGIN: '/login',
  ONBOARDING: '/onboarding',
  HOW_IT_WORKS: '/howItWorks',
  CHECKOUT: '/checkout',
  TERMS: '/compliance/terms',
  PRIVACY: '/compliance/privacy',
  PROFILE: '/profile',
  DASHBOARD: '/dashboard',
  ABOUT_US: '/aboutUs',
  HOME: '/home'
};

export const APP_NAME = 'My Application Secretary';

export const CONSTANTS = {
  POST: 'POST',
  X_API_KEY: 'x-api-key',
  API_KEY_CONST: 'API_KEY'
};

export const NO_AUTH_USER = [
  {
    name: 'Pricing',
    path: ROUTES.PRICING
  },
  {
    name: 'How it works',
    path: ROUTES.HOW_IT_WORKS
  },
  {
    name: 'Login',
    path: ROUTES.DASHBOARD
  }
];

export const AUTH_USER = [
  {
    name: 'Profile',
    path: ROUTES.PRICING
  },
  {
    name: 'Account',
    path: ROUTES.HOW_IT_WORKS
  },
  {
    name: 'Logout',
    path: ROUTES.LANDING
  }
];

export const PLANS: { [key: string]: Plan } = {
  basic: { cost: 2000, limit: 50 },
  preferred: { cost: 5000, limit: 200 },
  premium: { cost: 99000, limit: 500 }
};

type Step = {
  description: string;
  image: string;
};
export const ONBOARDING_STEPS: { [key: string]: Step } = {
  'Upload Your Resume': {
    description:
      ' My Application Secretary will use Natural Language Processing to lift qualifications and experiences from your resume.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  },
  'Verify your job preferences': {
    description:
      ' We want to make sure you are exposed to opportunities that best fit your needs. So My Application Secretary needs to understand your goals just a little better.',
    image:
      'https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80'
  },
  'Install our chrome extension.': {
    description:
      ' My Application Secretary will communicate with our chrome extension to take control of your browser and search and apply to jobs.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80'
  }
};

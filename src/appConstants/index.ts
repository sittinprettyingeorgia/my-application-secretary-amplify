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

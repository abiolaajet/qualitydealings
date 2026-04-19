import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY || '';

if (!secretKey) {
  console.warn('Warning: STRIPE_SECRET_KEY is not defined in environment variables.');
}

// Initialize Stripe with the Secret Key from environment variables
export const stripe = new Stripe(secretKey, {
  apiVersion: '2023-10-16' as any,
  typescript: true,
});

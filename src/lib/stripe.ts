import Stripe from 'stripe'

// Demo mode - use placeholder values if environment variables are not set
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_demo_stripe_secret_key', {
  apiVersion: '2025-07-30.basil',
})

export const getStripe = async () => {
  if (typeof window !== 'undefined') {
    const { loadStripe } = await import('@stripe/stripe-js')
    return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo_stripe_publishable_key')
  }
  return null
}

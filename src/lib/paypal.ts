import axios from 'axios'

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!
const PAYPAL_MODE = process.env.PAYPAL_MODE || 'sandbox'

const baseURL = PAYPAL_MODE === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com'

export async function getPayPalAccessToken(): Promise<string> {
  try {
    const response = await axios.post(
      `${baseURL}/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en_US',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: PAYPAL_CLIENT_ID,
          password: PAYPAL_CLIENT_SECRET,
        },
      }
    )

    return response.data.access_token
  } catch (error) {
    console.error('PayPal access token error:', error)
    throw new Error('Failed to get PayPal access token')
  }
}

export async function createPayPalSubscription(planId: string, userId: string) {
  try {
    const accessToken = await getPayPalAccessToken()

    const subscriptionData = {
      plan_id: planId,
      start_time: new Date(Date.now() + 60000).toISOString(), // Start in 1 minute
      subscriber: {
        email_address: 'user@example.com', // You'll get this from your user data
      },
      application_context: {
        brand_name: 'OpsSight',
        locale: 'en-US',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'SUBSCRIBE_NOW',
        payment_method: {
          payer_selected: 'PAYPAL',
          payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED',
        },
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
      },
    }

    const response = await axios.post(
      `${baseURL}/v1/billing/subscriptions`,
      subscriptionData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'PayPal-Request-Id': `subscription-${userId}-${Date.now()}`,
        },
      }
    )

    return response.data
  } catch (error) {
    console.error('PayPal subscription creation error:', error)
    throw new Error('Failed to create PayPal subscription')
  }
}

import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export { razorpay }

export async function createRazorpaySubscription(planId: string, userId: string) {
  try {
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 12, // 12 months
      start_at: Math.floor(Date.now() / 1000) + 60, // Start in 1 minute
      expire_by: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60), // Expire in 1 year
      notes: {
        user_id: userId,
        plan: 'premium',
      },
    })

    return subscription
  } catch (error) {
    console.error('Razorpay subscription creation error:', error)
    throw new Error('Failed to create Razorpay subscription')
  }
}

export async function createRazorpayOrder(amount: number, currency: string = 'INR', userId: string) {
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: `order_${userId}_${Date.now()}`,
      notes: {
        user_id: userId,
      },
    })

    return order
  } catch (error) {
    console.error('Razorpay order creation error:', error)
    throw new Error('Failed to create Razorpay order')
  }
}

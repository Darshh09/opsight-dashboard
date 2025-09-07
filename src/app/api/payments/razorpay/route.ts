import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { createRazorpaySubscription, createRazorpayOrder } from '@/lib/razorpay'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { planId, amount, currency = 'INR' } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // For subscription plans, create subscription
    if (planId) {
      const subscription = await createRazorpaySubscription(planId, user.id)
      return NextResponse.json({
        subscriptionId: subscription.id,
        short_url: subscription.short_url
      })
    }

    // For one-time payments, create order
    if (amount) {
      const order = await createRazorpayOrder(amount, currency, user.id)
      return NextResponse.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency
      })
    }

    return NextResponse.json({ error: 'Invalid payment request' }, { status: 400 })
  } catch (error) {
    console.error('Razorpay payment error:', error)
    return NextResponse.json({ error: 'Failed to create Razorpay payment' }, { status: 500 })
  }
}

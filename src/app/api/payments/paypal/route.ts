import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { createPayPalSubscription } from '@/lib/paypal'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { planId } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const subscription = await createPayPalSubscription(planId, user.id)

    return NextResponse.json({
      subscriptionId: subscription.id,
      approvalUrl: subscription.links.find((link: Record<string, unknown>) => link.rel === 'approve')?.href
    })
  } catch (error) {
    console.error('PayPal payment error:', error)
    return NextResponse.json({ error: 'Failed to create PayPal subscription' }, { status: 500 })
  }
}

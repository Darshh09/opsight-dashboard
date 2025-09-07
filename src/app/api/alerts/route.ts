import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { alertRules: true, usageTracking: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      alertRules: user.alertRules,
      usage: user.usageTracking
    })
  } catch (error) {
    console.error('Get alerts error:', error)
    return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, metric, threshold, condition, channel, recipients } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        subscription: true,
        usageTracking: true,
        alertRules: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check pilot restrictions
    const isPilotMode = user.subscription?.status === 'TRIAL' || !user.subscription
    const pilotLimit = 2
    const currentAlertCount = user.alertRules.length

    if (isPilotMode && currentAlertCount >= pilotLimit) {
      return NextResponse.json({
        error: 'Alert rule limit reached. Upgrade to Premium for unlimited alerts.',
        limitReached: true
      }, { status: 403 })
    }

    // Create alert rule
    const alertRule = await prisma.alertRule.create({
      data: {
        userId: user.id,
        name,
        metric,
        threshold: parseFloat(threshold),
        condition,
        channel,
        recipients: Array.isArray(recipients) ? recipients : recipients.split(',').map((r: string) => r.trim()),
      }
    })

    // Update usage tracking
    await prisma.usageTracking.upsert({
      where: { userId: user.id },
      update: {
        alertRulesCreated: { increment: 1 }
      },
      create: {
        userId: user.id,
        aiQueriesUsed: 0,
        alertRulesCreated: 1,
        csvFilesUploaded: 0,
      }
    })

    return NextResponse.json({ alertRule })
  } catch (error) {
    console.error('Create alert error:', error)
    return NextResponse.json({ error: 'Failed to create alert' }, { status: 500 })
  }
}

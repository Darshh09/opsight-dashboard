import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'
import { generateAIInsight } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { prompt, context } = await request.json()

    // Get user and their subscription
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        subscription: true,
        usageTracking: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user is in pilot mode and has queries remaining
    const isPilotMode = user.subscription?.status === 'TRIAL' || !user.subscription
    const pilotLimit = 10
    const currentUsage = user.usageTracking?.aiQueriesUsed || 0

    if (isPilotMode && currentUsage >= pilotLimit) {
      return NextResponse.json({
        error: 'AI query limit reached. Upgrade to Premium for unlimited AI insights.',
        limitReached: true
      }, { status: 403 })
    }

    // Generate AI insight
    const insight = await generateAIInsight(prompt, context)

    // Update usage tracking
    await prisma.usageTracking.upsert({
      where: { userId: user.id },
      update: {
        aiQueriesUsed: { increment: 1 }
      },
      create: {
        userId: user.id,
        aiQueriesUsed: 1,
        alertRulesCreated: 0,
        csvFilesUploaded: 0,
      }
    })

    return NextResponse.json({
      insight,
      usage: {
        queriesUsed: currentUsage + 1,
        queriesRemaining: isPilotMode ? Math.max(0, pilotLimit - currentUsage - 1) : -1
      }
    })
  } catch (error) {
    console.error('AI insights error:', error)
    return NextResponse.json({ error: 'Failed to generate insight' }, { status: 500 })
  }
}

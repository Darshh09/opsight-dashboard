import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

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

    // Check pilot restrictions
    const isPilotMode = user.subscription?.status === 'TRIAL' || !user.subscription
    const pilotLimit = 5 * 1024 * 1024 // 5MB in bytes

    if (isPilotMode && file.size > pilotLimit) {
      return NextResponse.json({
        error: `File size exceeds 5MB limit in pilot mode. Upgrade to Premium for larger file uploads.`,
        limitReached: true
      }, { status: 413 })
    }

    // Validate file type
    if (!file.name.endsWith('.csv')) {
      return NextResponse.json({ error: 'Only CSV files are allowed' }, { status: 400 })
    }

    // Create upload record
    const csvUpload = await prisma.csvUpload.create({
      data: {
        userId: user.id,
        fileName: file.name,
        fileSize: file.size,
        status: 'uploaded',
      }
    })

    // Update usage tracking
    await prisma.usageTracking.upsert({
      where: { userId: user.id },
      update: {
        csvFilesUploaded: { increment: 1 }
      },
      create: {
        userId: user.id,
        aiQueriesUsed: 0,
        alertRulesCreated: 0,
        csvFilesUploaded: 1,
      }
    })

    // Here you would typically process the CSV file
    // For now, we'll just return success
    // In a real implementation, you might:
    // 1. Save the file to cloud storage (AWS S3, etc.)
    // 2. Parse the CSV data
    // 3. Store the data in your database
    // 4. Update the upload status

    return NextResponse.json({
      upload: csvUpload,
      message: 'File uploaded successfully'
    })
  } catch (error) {
    console.error('CSV upload error:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}

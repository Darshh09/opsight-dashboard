import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Opsight - AI-Powered Business Analytics Dashboard'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2d1b69 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
        }}
      >
        {/* Logo/Icon */}
        <div
          style={{
            width: 120,
            height: 120,
            background: 'linear-gradient(135deg, #ec4899, #a21caf, #60a5fa)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              border: '4px solid white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                background: 'white',
                borderRadius: '50%',
              }}
            />
          </div>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: 20,
            maxWidth: 1000,
            lineHeight: 1.1,
          }}
        >
          Opsight
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            color: '#a1a1aa',
            textAlign: 'center',
            marginBottom: 40,
            maxWidth: 800,
            lineHeight: 1.2,
          }}
        >
          AI-Powered Business Analytics Dashboard
        </div>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            fontSize: 24,
            color: '#e4e4e7',
            textAlign: 'center',
          }}
        >
          <div>Real-Time KPIs</div>
          <div>•</div>
          <div>Custom Dashboards</div>
          <div>•</div>
          <div>48hr Delivery</div>
        </div>

        {/* Bottom gradient */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 100,
            background: 'linear-gradient(to top, #0f0f0f, transparent)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}

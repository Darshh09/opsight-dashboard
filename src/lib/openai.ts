import OpenAI from 'openai'

// Create OpenAI instance with fallback for missing API key
const createOpenAI = () => {
  const apiKey = process.env.OPENAI_API_KEY || 'demo-openai-key'

  if (!process.env.OPENAI_API_KEY) {
    console.warn('OpenAI API key not found. Using demo mode.')
  }

  return new OpenAI({
    apiKey: apiKey,
  })
}

export const openai = createOpenAI()

export async function generateAIInsight(prompt: string, context?: Record<string, unknown>): Promise<string> {
  // Check if we have a real API key
  if (!process.env.OPENAI_API_KEY) {
    // Return demo insights when API key is not available
    return getDemoInsight()
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert SaaS business analyst. Provide actionable insights based on the data provided. Keep responses concise but informative."
        },
        {
          role: "user",
          content: `${prompt}\n\nContext: ${JSON.stringify(context || {})}`
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content || "Unable to generate insight at this time."
  } catch (error) {
    console.error('OpenAI API error:', error)
    return "AI service temporarily unavailable. Please try again later."
  }
}

// Demo insights for when OpenAI API key is not available
function getDemoInsight(): string {
  const demoInsights = [
    "Based on your data trends, consider focusing on customer retention strategies. Your churn rate appears to be above industry average.",
    "Revenue growth looks promising! Consider scaling your marketing efforts during peak performance periods.",
    "Your conversion funnel shows potential optimization opportunities in the middle stages. A/B testing could help improve conversion rates.",
    "Customer acquisition costs seem to be trending upward. Consider diversifying your marketing channels for better ROI.",
    "Your monthly recurring revenue shows steady growth. Focus on upselling existing customers to accelerate growth.",
    "The data suggests your product-market fit is strong. Consider expanding to new market segments.",
    "Your customer lifetime value is increasing, which is a positive sign. Focus on customer success initiatives.",
    "Payment failure rates appear to be within normal range. Monitor for any seasonal patterns that might require attention."
  ]

  // Return a random demo insight
  const randomIndex = Math.floor(Math.random() * demoInsights.length)
  return demoInsights[randomIndex]
}

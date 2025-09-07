import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateAIInsight(prompt: string, context?: Record<string, unknown>): Promise<string> {
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

import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM_EMAIL || 'alerts@opssight.com',
      subject,
      html,
    }

    await sgMail.send(msg)
    return { success: true }
  } catch (error) {
    console.error('SendGrid error:', error)
    return { success: false, error }
  }
}

export async function sendSlackAlert(webhookUrl: string, message: string) {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: message,
        username: 'OpsSight Alerts',
        icon_emoji: ':warning:',
      }),
    })

    return { success: response.ok }
  } catch (error) {
    console.error('Slack webhook error:', error)
    return { success: false, error }
  }
}

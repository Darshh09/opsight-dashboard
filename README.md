# OpsSight Dashboard

A modern, AI-powered analytics dashboard for SaaS businesses, e-commerce stores, and agencies.

## 🚀 Features

- **Real-time Analytics**: Track revenue, churn, growth metrics
- **AI Insights**: Get intelligent recommendations and predictions
- **Custom Dashboards**: Tailored analytics for your business
- **Multi-payment Integration**: Stripe, PayPal, Razorpay support
- **Alert System**: Smart notifications via email, Slack, SMS
- **Responsive Design**: Works perfectly on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js with Google OAuth
- **Payments**: Stripe, PayPal, Razorpay
- **AI**: OpenAI GPT integration
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd opsight-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure your environment variables** (see Environment Variables section)

5. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_your_stripe_webhook_secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"

# PayPal
PAYPAL_CLIENT_ID="your_paypal_client_id"
PAYPAL_CLIENT_SECRET="your_paypal_client_secret"

# Razorpay
RAZORPAY_KEY_ID="rzp_test_your_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_key_secret"

# OpenAI
OPENAI_API_KEY="sk-your-openai-api-key"

# Email (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Slack (Optional)
SLACK_BOT_TOKEN="xoxb-your-slack-bot-token"
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/your/webhook/url"
```

## 🚀 Deployment on Vercel

### 1. **Prepare for Deployment**

Make sure your code is pushed to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. **Deploy to Vercel**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the following settings:

**Build Settings:**
- Framework Preset: `Next.js`
- Build Command: `npm run vercel-build`
- Output Directory: `.next`
- Install Command: `npm install`

**Environment Variables:**
Add all the environment variables from your `.env.local` file in the Vercel dashboard.

### 3. **Database Setup for Production**

For production, you'll need a PostgreSQL database. Recommended options:

**Option 1: Vercel Postgres**
1. In your Vercel project dashboard
2. Go to Storage tab
3. Create a new Postgres database
4. Copy the connection string to `DATABASE_URL`

**Option 2: External Database**
- [Supabase](https://supabase.com) (Free tier available)
- [PlanetScale](https://planetscale.com) (Free tier available)
- [Railway](https://railway.app) (Free tier available)

### 4. **Configure Domain**

1. In Vercel dashboard, go to Settings > Domains
2. Add your custom domain
3. Update `NEXTAUTH_URL` to your production domain

### 5. **Set up OAuth Providers**

**Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `https://your-domain.vercel.app/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (for development)

**Stripe:**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Get your API keys
3. Set up webhooks pointing to: `https://your-domain.vercel.app/api/webhooks/stripe`

## 🔄 Database Migrations

After setting up your production database:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Or run migrations
npx prisma migrate deploy
```

## 📱 Features Overview

### Dashboard Pages
- **Overview**: Key metrics and KPIs
- **Sales**: Revenue tracking and analytics
- **Leads**: Lead generation and conversion
- **AI Insights**: AI-powered recommendations
- **Alerts**: Smart notification system

### Demo Features
- Interactive dashboard previews
- Custom build request forms
- Service showcase
- Contact and lead capture

## 🛡️ Security

- Environment variables are properly secured
- API routes are protected with authentication
- CORS headers configured
- Security headers implemented
- Input validation and sanitization

## 📊 Performance

- Optimized for Core Web Vitals
- Image optimization with Next.js
- Code splitting and lazy loading
- Static generation where possible
- CDN delivery via Vercel

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact: [your-email@domain.com]

## 🎯 Roadmap

- [ ] Advanced AI insights
- [ ] More payment providers
- [ ] Mobile app
- [ ] White-label solution
- [ ] Advanced reporting
- [ ] Team collaboration features

---

Built with ❤️ by [Your Name]

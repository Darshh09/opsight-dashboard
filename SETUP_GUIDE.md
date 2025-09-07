# 🚀 OpsSight Free Pilot Setup Guide

## 📋 Prerequisites

1. **Node.js** (v18 or higher)
2. **PostgreSQL** database
3. **API Keys** for services (see below)

## 🔑 Required API Keys & Services

### 1. **Stripe** (Payment Processing)
- **Sign up**: https://stripe.com
- **Get keys**: Dashboard → Developers → API keys
- **Required keys**:
  - `STRIPE_PUBLISHABLE_KEY` (pk_test_...)
  - `STRIPE_SECRET_KEY` (sk_test_...)
  - `STRIPE_WEBHOOK_SECRET` (whsec_...)

### 2. **PayPal** (Payment Processing)
- **Sign up**: https://developer.paypal.com
- **Get keys**: Dashboard → My Apps & Credentials
- **Required keys**:
  - `PAYPAL_CLIENT_ID`
  - `PAYPAL_CLIENT_SECRET`
  - `PAYPAL_MODE` (sandbox/live)

### 3. **Razorpay** (Payment Processing - India)
- **Sign up**: https://razorpay.com
- **Get keys**: Dashboard → Settings → API Keys
- **Required keys**:
  - `RAZORPAY_KEY_ID` (rzp_test_...)
  - `RAZORPAY_KEY_SECRET`

### 4. **OpenAI** (AI Insights)
- **Sign up**: https://platform.openai.com
- **Get key**: API Keys section
- **Required key**:
  - `OPENAI_API_KEY` (sk-...)

### 5. **SendGrid** (Email Alerts)
- **Sign up**: https://sendgrid.com
- **Get key**: Settings → API Keys
- **Required key**:
  - `SENDGRID_API_KEY` (SG...)

### 6. **Slack** (Optional - for alerts)
- **Create webhook**: https://api.slack.com/messaging/webhooks
- **Required key**:
  - `SLACK_WEBHOOK_URL`

## 🗄️ Database Setup

### 1. **Create PostgreSQL Database**
```sql
CREATE DATABASE opsight_db;
CREATE USER opsight_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE opsight_db TO opsight_user;
```

### 2. **Run Database Migrations**
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma db push

# (Optional) Seed database
npx prisma db seed
```

## ⚙️ Environment Configuration

### 1. **Copy Environment File**
```bash
cp env.example .env.local
```

### 2. **Update .env.local with your keys**
```env
# Database
DATABASE_URL="postgresql://opsight_user:your_password@localhost:5432/opsight_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-key"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# PayPal
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-paypal-client-secret"
PAYPAL_MODE="sandbox"

# Razorpay
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="your-razorpay-secret"

# OpenAI
OPENAI_API_KEY="sk-..."

# SendGrid
SENDGRID_API_KEY="SG..."
SENDGRID_FROM_EMAIL="alerts@yourdomain.com"

# Slack (Optional)
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..."

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

## 🚀 Development Setup

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Start Development Server**
```bash
npm run dev
```

### 3. **Access Application**
- **URL**: http://localhost:3000
- **Default**: Redirects to dashboard after 3 seconds

## 🔧 Stripe Webhook Setup

### 1. **Install Stripe CLI**
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows
# Download from: https://github.com/stripe/stripe-cli/releases
```

### 2. **Login to Stripe**
```bash
stripe login
```

### 3. **Forward Webhooks to Local**
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### 4. **Copy Webhook Secret**
- Copy the `whsec_...` key from the terminal
- Add it to your `.env.local` file

## 📊 Pilot Mode Features

### ✅ **Free Features (No Limits)**
- Dashboard Overview
- Sales Analytics
- Leads Funnel Visualization
- Basic Charts and KPIs

### 🔒 **Pilot Restrictions**
- **AI Insights**: 10 queries limit
- **Alert Rules**: 2 rules limit
- **CSV Upload**: 5MB file size limit
- **Data Retention**: 30 days

### 💎 **Premium Features (After Upgrade)**
- Unlimited AI queries
- Unlimited alert rules
- Larger file uploads
- Extended data retention
- Priority support
- Advanced analytics

## 🎯 Testing the Pilot System

### 1. **Test AI Insights**
- Go to AI Insights page
- Try asking questions (limited to 10)
- Verify limit enforcement

### 2. **Test Alert Rules**
- Go to Alerts page
- Try creating more than 2 rules
- Verify limit enforcement

### 3. **Test CSV Upload**
- Go to Leads page
- Try uploading files larger than 5MB
- Verify size limit enforcement

### 4. **Test Upgrade Flow**
- Click "Upgrade to Premium" buttons
- Test different payment methods
- Verify Stripe/PayPal/Razorpay integration

## 🚀 Deployment

### 1. **Vercel Deployment**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### 2. **Environment Variables for Production**
- Set all the same environment variables in your hosting platform
- Use production API keys (not test keys)
- Update `NEXTAUTH_URL` to your production domain
- Update `NEXT_PUBLIC_APP_URL` to your production domain

## 🔍 Monitoring & Analytics

### 1. **Usage Tracking**
- Monitor pilot usage in database
- Track conversion rates
- Analyze user behavior

### 2. **Payment Monitoring**
- Stripe Dashboard for payment analytics
- PayPal Dashboard for transaction monitoring
- Razorpay Dashboard for Indian payments

### 3. **Error Monitoring**
- Set up error tracking (Sentry, LogRocket, etc.)
- Monitor API failures
- Track user experience issues

## 📞 Support & Contact

- **Email**: support@opssight.com
- **Sales**: sales@opssight.com
- **Documentation**: https://docs.opssight.com

## 🎉 You're Ready!

Your OpsSight free pilot is now ready to onboard users and convert them to premium subscribers. The system includes:

- ✅ Complete pilot mode with restrictions
- ✅ Multiple payment gateways (Stripe, PayPal, Razorpay)
- ✅ Real AI insights with OpenAI
- ✅ Email alerts with SendGrid
- ✅ Professional upgrade flow
- ✅ Usage tracking and analytics
- ✅ Webhook handling for payments

Start your 30-day MVP journey! 🚀

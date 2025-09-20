import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PilotProvider } from "@/contexts/PilotContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Opsight - AI-Powered Business Analytics Dashboard | Real-Time Insights",
    template: "%s | Opsight - Business Analytics Dashboard"
  },
  description: "Transform your business data into actionable insights with Opsight's AI-powered analytics dashboard. Real-time KPIs, custom visualizations, and automated reporting for SaaS, e-commerce, and enterprise businesses. Free pilot dashboard in 48 hours.",
  keywords: [
    "business analytics dashboard",
    "AI-powered analytics",
    "real-time business insights",
    "SaaS dashboard",
    "e-commerce analytics",
    "custom dashboard development",
    "business intelligence",
    "data visualization",
    "KPI dashboard",
    "automated reporting",
    "Stripe analytics",
    "HubSpot integration",
    "Google Analytics dashboard",
    "business metrics",
    "data-driven decisions"
  ],
  authors: [{ name: "Darshit Shukla", url: "https://opsight.ai" }],
  creator: "Darshit Shukla",
  publisher: "Opsight",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://opsight.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://opsight.ai",
    title: "Opsight - AI-Powered Business Analytics Dashboard",
    description: "Transform your business data into actionable insights with Opsight's AI-powered analytics dashboard. Real-time KPIs, custom visualizations, and automated reporting.",
    siteName: "Opsight",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Opsight - AI-Powered Business Analytics Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Opsight - AI-Powered Business Analytics Dashboard",
    description: "Transform your business data into actionable insights with Opsight's AI-powered analytics dashboard. Real-time KPIs, custom visualizations, and automated reporting.",
    images: ["/og-image.png"],
    creator: "@opsight_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-gray-50 dark:bg-gray-900`}
      >
        <PilotProvider>
          {children}
        </PilotProvider>
      </body>
    </html>
  );
}

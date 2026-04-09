import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import BackToTop from "@/components/BackToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "NexusTrack | Professional Global Shipment Tracking",
    template: "%s | NexusTrack"
  },
  description: "Secure, enterprise-grade real-time shipment tracking for modern logistics and supply chain professionals. Sub-second global visibility.",
  keywords: ["shipment tracking", "logistics platform", "real-time cargo monitor", "supply chain visibility", "freight tracking", "NexusTrack"],
  authors: [{ name: "NexusTrack Engineering" }],
  creator: "NexusTrack",
  publisher: "NexusTrack Global",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nexustrack.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NexusTrack | Global Logistics Intelligence",
    description: "The nervous system of global trade. Sub-second visibility from port to porch.",
    url: "https://nexustrack.com",
    siteName: "NexusTrack",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NexusTrack Global Logistics Monitor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexusTrack | Global Logistics Intelligence",
    description: "The nervous system of global trade. Sub-second visibility from port to porch.",
    images: ["/og-image.png"],
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground shrink-0`}>
        <div className="min-h-screen hero-gradient flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ChatWidget />
          <BackToTop />
        </div>
      </body>
    </html>
  );
}

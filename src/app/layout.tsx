import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexusTrack | Professional Shipment Tracking",
  description: "Secure, real-time shipment tracking for modern logistics professionals.",
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
        </div>
      </body>
    </html>
  );
}

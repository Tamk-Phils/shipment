import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrackFlow | Professional Shipment Tracking",
  description: "Secure, real-time shipment tracking for modern logistics professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        <div className="min-h-screen hero-gradient flex flex-col">
          <Header />
          <div className="flex-1">
            {children}
          </div>
          <ChatWidget />
        </div>
      </body>
    </html>
  );
}

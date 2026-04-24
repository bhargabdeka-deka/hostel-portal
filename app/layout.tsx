import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Playfair_Display, Orbitron, Inter } from "next/font/google";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ORION Hostel Portal | Excellence Since 1998",
  description: "Official resident portal for ORION Hostel. Manage your stay, connect with alumni, and stay updated with official notices.",
  icons: {
    icon: "/icon.jpeg",
  },
};

import { Torchlight } from "@/components/shared/Torchlight";
import { GridBackground } from "@/components/shared/GridBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${playfair.variable} ${orbitron.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground font-sans antialiased relative">
        <GridBackground />
        <Torchlight />
        {children}
      </body>
    </html>
  );
}

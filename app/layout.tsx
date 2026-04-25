import type { Metadata } from "next";
import { Outfit, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ORION Hostel Portal | Excellence Since 1998",
  description: "Official resident portal for ORION Hostel. Manage your stay, connect with alumni, and stay updated with official notices.",
  icons: {
    icon: "/icon.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground font-sans antialiased relative">
        {children}
      </body>
    </html>
  );
}

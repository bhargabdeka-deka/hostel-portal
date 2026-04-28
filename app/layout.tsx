import type { Metadata } from "next";
import { Outfit, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://orionjech7.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ORION — Jorhat Engineering College Hostel 7",
    template: "%s | ORION — JEC",
  },
  description:
    "Official portal for ORION — Jorhat Engineering College Hostel 7. Access notices, gallery, alumni network, rules, and contact information.",
  keywords: [
    "ORION",
    "Jorhat Engineering College Hostel 7",
    "JEC Hostel 7",
    "Jorhat Engineering College",
    "Orionite",
    "hostel Jorhat Assam",
    "JEC Hostel No 7",
  ],
  authors: [{ name: "ORION Administration" }],
  creator: "ORION",
  publisher: "ORION",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "ORION Portal",
    title: "ORION — Jorhat Engineering College Hostel 7",
    description:
      "Official portal for ORION — Jorhat Engineering College Hostel 7. Explore our alumni network, gallery, notices, and more.",
    images: [
      {
        url: "/hero-hostel.jpeg",
        width: 1200,
        height: 630,
        alt: "ORION — Jorhat Engineering College",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ORION — Jorhat Engineering College Hostel 7",
    description:
      "Official portal for ORION, Jorhat Engineering College. Notices, alumni, gallery, and more.",
    images: ["/hero-hostel.jpeg"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  // Google Search Console verification — replace with your actual token
  verification: {
    google: "47de421a33633894",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${outfit.variable} ${inter.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <head>
        {/* Favicon and Icon Links */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Additional Meta Tags for Better SEO */}
        <meta name="theme-color" content="#1f2937" />
        <meta name="msapplication-TileColor" content="#1f2937" />
        <meta name="msapplication-TileImage" content="/android-chrome-192x192.png" />
        
        {/* Google Analytics — replace G-XXXXXXXXXX with your Measurement ID */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}} /> */}

        {/* Structured Data — Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollegeOrUniversity",
              name: "ORION — Hostel No 7, Jorhat Engineering College",
              url: BASE_URL,
              logo: `${BASE_URL}/hostel_logo.jpeg`,
              image: `${BASE_URL}/hero-hostel.jpeg`,
              description:
                "ORION (Hostel No 7) is a residential facility at Jorhat Engineering College, Assam, established in February 1982. Home to 75 residents and 800+ alumni worldwide.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Hostel No 7, JEC Road",
                addressLocality: "Jorhat",
                addressRegion: "Assam",
                postalCode: "785007",
                addressCountry: "IN",
              },
              foundingDate: "1982",
              sameAs: ["https://www.instagram.com/orion_jec"],
            }),
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground font-sans antialiased relative">
        {children}
      </body>
    </html>
  );
}

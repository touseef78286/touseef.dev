import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metaTitle = "AI Systems Engineer — Agents · Automation · Infrastructure";
const metaDescription =
  "Touseef Panjtan — AI systems engineer from Islamabad building multi-agent systems, automation pipelines, and intelligent infrastructure. Case studies, systems thinking, and live experiments.";

export const metadata: Metadata = {
  title: {
    default: "AI Systems Engineer — Agents · Automation · Infrastructure",
    template: "%s · Touseef Panjtan",
  },
  description: metaDescription,
  metadataBase: new URL("https://touseef-dev.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: "website",
    siteName: "touseef-dev.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: metaTitle,
    description: metaDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#070a0f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-[#03201b]"
        >
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
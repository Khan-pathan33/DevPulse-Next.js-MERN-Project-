import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "DevPulse - Full-Stack Next.js & MERN Showcase Hub",
    template: "%s | DevPulse",
  },
  description:
    "An ultra-modern developer showcase in dusty pink aesthetics built with Next.js App Router, Server Actions, Route Handlers, and MERN technology stack (MongoDB, Express, React 19, Node.js).",
  keywords: [
    "Next.js",
    "MERN Stack",
    "MongoDB",
    "Express.js",
    "React 19",
    "Node.js",
    "Server Actions",
    "App Router",
    "Dusty Pink",
    "Full-Stack",
  ],
  authors: [{ name: "DevPulse Team" }],
  openGraph: {
    title: "DevPulse - Full-Stack Next.js & MERN Showcase Hub",
    description:
      "Explore production-grade developer templates, Server Actions, Mongoose models, and live API endpoints.",
    url: "https://devpulse.io",
    siteName: "DevPulse",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevPulse - Full-Stack Next.js & MERN Showcase Hub",
    description:
      "A complete showcase of Next.js App Router & MERN stack integration in an elegant dusty pink design.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col selection:bg-rose-400/80 selection:text-white">
        <ThemeProvider>
          <div className="relative min-h-screen flex flex-col bg-grid-pattern">
            {/* Ambient dusty pink atmospheric glows */}
            <div className="fixed -top-40 -left-40 w-96 h-96 bg-rose-400/12 rounded-full blur-[130px] pointer-events-none" />
            <div className="fixed top-1/3 -right-40 w-96 h-96 bg-pink-300/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="fixed -bottom-40 left-1/3 w-96 h-96 bg-[#c06c84]/10 rounded-full blur-[140px] pointer-events-none" />

            <Navbar />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

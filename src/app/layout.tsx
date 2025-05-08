import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import BackgroundImage from "@/components/ui/BackgroundImage";
import OptimizedBackground from "@/components/ui/OptimizedBackground";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://italianbrainrot-games.github.io'),
  title: "Italian Brainrot Game Portal",
  description: "Discover, experience and share various Italian Brainrot games on our portal",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16' },
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/safari-pinned-tab.svg',
        color: '#000000',
      },
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
  applicationName: 'Italian Brainrot Game Portal',
  appleWebApp: {
    capable: true,
    title: 'Italian Brainrot',
    statusBarStyle: 'black-translucent',
    startupImage: [
      {
        url: '/favicon/apple-splash-2048-2732.png',
        media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/favicon/apple-splash-1668-2388.png',
        media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/favicon/apple-splash-1536-2048.png',
        media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/favicon/apple-splash-1125-2436.png',
        media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/favicon/apple-splash-750-1334.png',
        media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/favicon/apple-splash-640-1136.png',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://italianbrainrot.com',
    siteName: 'Italian Brainrot Game Portal',
    title: 'Italian Brainrot Game Portal',
    description: 'Discover, experience and share various Italian Brainrot games on our portal',
    images: [
      {
        url: '/images/share.png',
        width: 1200,
        height: 630,
        alt: 'Italian Brainrot Game Portal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Italian Brainrot Game Portal',
    description: 'Discover, experience and share various Italian Brainrot games on our portal',
    images: ['/images/share.png'],
    creator: '@ItalianBrainrot',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/bg-body.png"
          as="image"
          type="image/png"
        />
        <link
          rel="stylesheet"
          href="/no-flash.css"
        />
        <meta 
          property="og:logo" 
          content="/logo.png" 
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            body {
              background-color: #000 !important;
              background-image: url('/bg-body.png') !important;
              background-repeat: repeat !important;
              background-size: auto !important;
              background-attachment: fixed !important;
            }
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}
      >
        {/* Use both approaches for maximum compatibility */}
        <BackgroundImage />
        <OptimizedBackground />

        <header className="border-b border-white/10 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center">
                <Link href="/" className="font-bold text-xl text-white">
                  <Image
                    src="/long_logo.png"
                    alt="Italian Brainrot"
                    width={180}
                    height={50}
                    className="hidden sm:block object-contain"
                    priority
                  />
                  <Image
                    src="/logo.png"
                    alt="Italian Brainrot"
                    width={40}
                    height={40}
                    className="sm:hidden object-contain"
                    priority
                  />
                </Link>
              </div>
              <nav className="flex space-x-8">
                <Link href="/" className="text-white/80 hover:text-white">
                  Home
                </Link>
                <Link href="/games" className="text-white/80 hover:text-white">
                  Games
                </Link>
                <Link href="/blog" className="text-white/80 hover:text-white">
                  Blog
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {children}

        <footer className="bg-black/80 border-t border-white/10 mt-0">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-wrap justify-center items-center">
              <div className="text-center">
                <h3 className="text-sm font-semibold text-white inline-block mr-2">Italian Brainrot</h3>
                <p className="text-white/70 text-xs inline-block">
                  Discover, experience and share various Italian Brainrot games on our portal
                </p>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-white/10 text-center text-white/50">
              <p className="text-xs">© {new Date().getFullYear()} Italian Brainrot Game Portal. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

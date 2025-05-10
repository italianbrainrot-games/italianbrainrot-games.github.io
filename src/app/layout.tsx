import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import BackgroundImage from "@/components/ui/BackgroundImage";
import OptimizedBackground from "@/components/ui/OptimizedBackground";
import { GoogleAnalytics } from '@next/third-parties/google'
import { getSiteInfo, getSeoConfig } from "@/lib/site-config";
import CanonicalUrl from "@/components/ui/CanonicalUrl";
import DomainRedirector from "@/components/ui/DomainRedirector";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteInfo = getSiteInfo();
const seoConfig = getSeoConfig();

export const viewport: Viewport = seoConfig.viewport as Viewport;

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.metadataBase),
  title: siteInfo.title,
  description: siteInfo.description,
  keywords: siteInfo.keywords,
  icons: seoConfig.icons,
  applicationName: siteInfo.siteName,
  appleWebApp: {
    capable: seoConfig.appleWebApp.capable,
    statusBarStyle: "black-translucent",
    startupImage: seoConfig.appleWebApp.startupImage
  },
  formatDetection: seoConfig.formatDetection,
  openGraph: {
    type: 'website',
    locale: siteInfo.locale,
    url: siteInfo.url,
    siteName: siteInfo.siteName,
    title: siteInfo.title,
    description: siteInfo.description,
    images: seoConfig.openGraph.images,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteInfo.title,
    description: siteInfo.description,
    images: seoConfig.twitter.images,
    creator: siteInfo.creator,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteInfo.language}>
      <head>
        <CanonicalUrl />
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
        {/* 域名重定向组件（默认禁用） */}
        <DomainRedirector enabled={false} />
        
        {/* Google Analytics */}
        <GoogleAnalytics gaId={siteInfo.googleAnalyticsId} />
        
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
                    alt={siteInfo.siteName}
                    width={180}
                    height={50}
                    className="hidden sm:block object-contain"
                    priority
                  />
                  <Image
                    src="/logo.png"
                    alt={siteInfo.siteName}
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
                <h3 className="text-sm font-semibold text-white inline-block mr-2">{siteInfo.siteName}</h3>
                <p className="text-white/70 text-xs inline-block">
                  {siteInfo.description}
                </p>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-white/10 text-center text-white/50">
              <p className="text-xs">© {new Date().getFullYear()} {siteInfo.siteName}. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

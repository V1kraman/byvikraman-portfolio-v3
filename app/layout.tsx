import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Cormorant_Garamond, Antonio } from 'next/font/google';
import './globals.css';
import { SafeJsonProtection } from '@/components/SafeJsonProtection';
import { CustomCursor } from '@/components/CustomCursor';
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  style: ['italic', 'normal'],
});

const antonio = Antonio({
  subsets: ['latin'],
  variable: '--font-antonio',
  weight: ['400', '600', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#121210' },
    { media: '(prefers-color-scheme: light)', color: '#F4F0E8' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://byvikraman.me'),
  title: {
    default: 'Vikraman V. | ECE Student, Embedded Systems & Software',
    template: '%s | Vikraman V.',
  },
  description:
    'Personal digital space and engineering notebook of Vikraman V. — Electronics and Communication Engineering student building embedded hardware prototypes, firmware, and software.',
  authors: [{ name: 'Vikraman V.', url: 'https://byvikraman.me' }],
  creator: 'Vikraman V.',
  alternates: {
    canonical: 'https://byvikraman.me',
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Vikraman V.',
  },
  keywords: [
    'Vikraman V',
    'Vikraman',
    'Electronics and Communication Engineering',
    'ECE',
    'Embedded Systems',
    'ESP32-S3',
    'Arduino',
    'Hardware Prototyping',
    'Firmware',
    'TypeScript',
    'Next.js',
    'Engineering Notebook',
    'Portfolio',
  ],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Vikraman V. | ECE Student, Embedded Systems & Software',
    description:
      'Personal digital space and engineering notebook of Vikraman V. — Electronics and Communication Engineering student building embedded hardware prototypes, firmware, and software.',
    url: 'https://byvikraman.me',
    siteName: 'Vikraman V.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vikraman V. | ECE Student, Embedded Systems & Software',
    description:
      'Personal digital space and engineering notebook of Vikraman V. — Electronics and Communication Engineering student building embedded hardware prototypes, firmware, and software.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="dark scroll-smooth bg-background text-foreground"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.className} ${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${antonio.variable} bg-background text-foreground antialiased selection:bg-primary/25 selection:text-foreground overflow-x-hidden min-h-[100dvh] flex flex-col`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-sm focus:bg-primary focus:text-primary-foreground focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:shadow-lg"
        >
          Skip to content
        </a>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof window==="undefined")return;try{var t=localStorage.getItem("portfolio-theme");if(t==="light"){document.documentElement.classList.remove("dark");}else if(t==="dark"){document.documentElement.classList.add("dark");}var m=localStorage.getItem("portfolio-motion");if(m==="paused"){document.documentElement.classList.add("calm");}}catch(e){}var os=JSON.stringify,op=JSON.parse;JSON.stringify=function(v,r,s){try{return os(v,r,s);}catch(e){if(e&&(e.name==="TypeError"||e instanceof TypeError)&&String(e.message||"").toLowerCase().indexOf("circular")!==-1){var w=new WeakSet();return os(v,function(k,val){if(typeof val==="object"&&val!==null){if(typeof Node!=="undefined"&&val instanceof Node){if(w.has(val))return undefined;w.add(val);return {};}if(w.has(val))return undefined;w.add(val);}if(typeof r==="function")return r.call(this,k,val);return val;},s);}throw e;};};JSON.parse=function(t,r){if(t===undefined||t==="undefined"||t===null||t==="")return null;try{return op(t,r);}catch(e){if(e&&(e.name==="SyntaxError"||e instanceof SyntaxError)&&String(e.message||"").toLowerCase().indexOf("undefined")!==-1){return null;}throw e;};};})();`,
          }}
          suppressHydrationWarning
        />
        <SafeJsonProtection />
        <CustomCursor />
        {/* Restrained editorial grid & subtle warm film grain atmosphere */}
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[-10] pointer-events-none bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_90%_75%_at_50%_0%,#000_30%,transparent_90%)]"
        />
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[-10] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] dark:opacity-[0.12] mix-blend-multiply dark:mix-blend-screen pointer-events-none"
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

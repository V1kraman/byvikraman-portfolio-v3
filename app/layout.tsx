import type {Metadata} from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { SafeJsonProtection } from '@/components/SafeJsonProtection';

const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Vikraman V | Developer & Engineer',
  description: 'Portfolio of Vikraman V, Electronics and Communication Engineering student and developer.',
  openGraph: {
    title: 'Vikraman V | Developer & Engineer',
    description: 'Portfolio of Vikraman V, Electronics and Communication Engineering student and developer.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vikraman V | Developer & Engineer',
    description: 'Portfolio of Vikraman V, Electronics and Communication Engineering student and developer.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark scroll-smooth bg-[#0A0A0C]" data-scroll-behavior="smooth">
      <body className={`${manrope.className} bg-[#0A0A0C] text-[#E2E2E2] antialiased selection:bg-white/10 selection:text-white overflow-x-hidden`} suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof window==="undefined")return;var os=JSON.stringify,op=JSON.parse;JSON.stringify=function(v,r,s){try{return os(v,r,s);}catch(e){if(e&&(e.name==="TypeError"||e instanceof TypeError)&&String(e.message||"").toLowerCase().indexOf("circular")!==-1){var w=new WeakSet();return os(v,function(k,val){if(typeof val==="object"&&val!==null){if(typeof Node!=="undefined"&&val instanceof Node){if(w.has(val))return undefined;w.add(val);return {};}if(w.has(val))return undefined;w.add(val);}if(typeof r==="function")return r.call(this,k,val);return val;},s);}throw e;};};JSON.parse=function(t,r){if(t===undefined||t==="undefined"||t===null||t==="")return null;try{return op(t,r);}catch(e){if(e&&(e.name==="SyntaxError"||e instanceof SyntaxError)&&String(e.message||"").toLowerCase().indexOf("undefined")!==-1){return null;}throw e;};};})();`,
          }}
          suppressHydrationWarning
        />
        <SafeJsonProtection />
        <div className="fixed inset-0 z-[-10] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-screen pointer-events-none"></div>
        {children}
      </body>
    </html>
  );
}

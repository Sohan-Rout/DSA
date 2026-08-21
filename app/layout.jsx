import "./globals.css";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AuthProvider } from '@/app/contexts/AuthContext';
import { UserProvider } from '@/app/contexts/UserContext';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import ClientLayoutWrapper from "@/app/components/ui/ClientLayoutWrapper";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata = {
  metadataBase: new URL("https://www.dsavisualizer.in"),
  title: 'DSA Visualizer | Visualize & Learn DSA the Smart Way',
  description: 'Master Data Structures and Algorithms with interactive visualizations. Perfect for students, beginners, and interview prep. Visualize Stack, Queue, Tree, Graph, Sorting & more.',
  keywords: [
    'DSA Visualizer',
    'Data Structures and Algorithms',
    'Visual DSA Tool',
    'Learn DSA Online',
    'DSA for Beginners',
    'DSA Practice',
    'Stack Visualizer',
    'Queue Visualizer',
    'Graph Visualizer',
    'Sorting Algorithms',
  ],
  authors: [{ name: 'Sohan Rout' }],
  creator: 'Sohan Rout',
  publisher: 'DSA Visualizer',
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico?v=2',
  },
  openGraph: {
    title: 'DSA Visualizer | Visualize & Learn DSA the Smart Way',
    description: 'Interactive platform to visualize and learn DSA concepts easily. Great for students and interview preparation.',
    url: '/',
    siteName: 'DSA Visualizer',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'DSA Visualizer Preview Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSA Visualizer | Learn DSA the Smart Way',
    description: 'Visualize algorithms like Stack, Queue, Graphs, and Sorting in real-time. Learn DSA interactively.',
    images: ['/og.png'],
  },
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {
          // Server Components can't set cookies; middleware/route handlers refresh the session.
        },
      },
    }
  );
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta name="application-name" content="DSA Visualizer" />
        <meta property="og:site_name" content="DSA Visualizer" />
        <link rel="icon" href="/favicon.ico?v=2" />
        
        {/* Google Analytics Script */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <AuthProvider session={session}>
        <UserProvider>
          <ThemeProvider>
            <ClientLayoutWrapper>
              {children}
            </ClientLayoutWrapper>
          </ThemeProvider>
        </UserProvider>
        </AuthProvider>
      </body>
      <SpeedInsights/>
    </html>
  );
}
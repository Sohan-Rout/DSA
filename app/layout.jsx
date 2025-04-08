import "./globals.css";
import Script from "next/script"; // Best practice: import Script from next/script

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata = {
  title: 'DSA Visualizer | Learn DSA Easily',
  description: 'Visualize Data Structures like Stack, Queue, Trees, Graphs and learn DSA interactively.',
  icons: {
    icon: '/favicon.ico?v=2', // cache busting trick
  },
  keywords: [
    'DSA Visualizer',
    'Algorithms',
    'Learn DSA',
    'Data Structures',
    'Visualize Algorithms',
  ],
  authors: [{ name: 'Sohan Rout' }],
  robots: 'index, follow',
  openGraph: {
    title: 'DSA Visualizer | Learn DSA Easily',
    description: 'Best platform to learn DSA visually.',
    url: 'https://dsavisualizer.in/',
    siteName: 'DSA Visualizer',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'DSA Visualizer',
      },
    ],
    twitter: {
      card: 'summary_large_image',
      title: 'DSA Visualizer | Learn DSA Easily',
      description: 'Best platform to learn DSA visually.',
      images: ['/og.png'],
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
      <body>{children}</body>
    </html>
  );
}
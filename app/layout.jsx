import "./globals.css";

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
        url: '/og.png', // your new banner image
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
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
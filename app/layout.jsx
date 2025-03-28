import "./globals.css";

export const metadata = {
  title: "DsaVisualizer",
  description: "Learn DSA with the help of illustrations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
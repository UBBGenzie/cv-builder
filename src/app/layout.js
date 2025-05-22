// src/app/layout.js
import './globals.css';
import { IBM_Plex_Sans } from 'next/font/google';

const ibm = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '600'] });

export const metadata = {
  title: 'CV Builder',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={ibm.className}>
      <body>{children}</body>
    </html>
  );
}

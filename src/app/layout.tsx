import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './../components/Navbar';
import { RadioProvider } from '../context/useUserType';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Feria del Brasier',
  description: 'Feria del Brasier',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es-ES'>
      <body className={inter.className}>
        <RadioProvider>
          <Navbar />
          <div className='page_wrap h-[calc(100vh-3rem)] mx-auto'>{children}</div>
        </RadioProvider>
      </body>
    </html>
  );
}

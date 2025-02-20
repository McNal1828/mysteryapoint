import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import '@picocss/pico';
import Link from 'next/link';
import Header from './header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: '25미스야 카스포인트',
  description: '일일 점수판',
};

export default function RootLayout({ children }) {
  return (
    <html lang='ko'>
      <head>
        <link rel='manifest' href='/manifest.json' />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className='container'>
          <Header />
        </header>
        <main className='container'>{children}</main>
        <footer className='container'></footer>
      </body>
    </html>
  );
}

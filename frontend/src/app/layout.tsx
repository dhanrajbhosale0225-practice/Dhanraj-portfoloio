import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/hooks/useTheme';
import ParticleBackground from '@/components/animations/ParticleBackground';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'DJ | Data Scientist & Software Engineer',
  description: 'Portfolio of DJ - A passionate Data Scientist and Software Engineer with expertise in machine learning, data analytics, and building scalable solutions.',
  keywords: ['Data Scientist', 'Software Engineer', 'Machine Learning', 'Python', 'Portfolio', 'UPES', 'Navikenz'],
  authors: [{ name: 'DJ' }],
  openGraph: {
    title: 'DJ | Data Scientist & Software Engineer',
    description: 'Transforming Data into Intelligent Solutions',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider>
          <div className="relative min-h-screen flex flex-col">
            <ParticleBackground />
            <Navbar />
            <main className="flex-grow relative z-10">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
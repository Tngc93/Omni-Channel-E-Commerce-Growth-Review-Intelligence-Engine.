import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/navigation/Navbar';
import { Sidebar } from '@/components/navigation/Sidebar';

export const metadata: Metadata = {
  title: 'E-Commerce Growth & Review Intelligence Engine',
  description: 'AI-Powered E-Commerce Return Root-Cause Diagnostics & Growth Analytics',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-900/30">
              <div className="mx-auto max-w-7xl">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

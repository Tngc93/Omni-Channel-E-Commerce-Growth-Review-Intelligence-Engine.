import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/navigation/Navbar';
import { Sidebar } from '@/components/navigation/Sidebar';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

export const metadata: Metadata = {
  title: 'ReviewIQ — Universal E-Commerce Growth & Review Intelligence Engine',
  description: 'AI-Powered Multi-Category Return Diagnostics & Growth Lab across Consumer Tech, Fashion, Beauty, and Home.',
};

import { StoreRoleProvider } from '@/lib/context/StoreRoleContext';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-[#f5f5f7] dark:bg-[#06080d] text-slate-900 dark:text-slate-100 antialiased transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            <StoreRoleProvider>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex flex-1 overflow-hidden">
                  <Sidebar />
                  <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-slate-100/60 dark:bg-slate-900/20 transition-colors duration-300">
                    <div className="mx-auto max-w-7xl">{children}</div>
                  </main>
                </div>
              </div>
            </StoreRoleProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import { BasecampProvider } from '@/lib/store';
import MuiThemeRegistry from '@/components/MuiThemeRegistry';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Basecamp — Open Community for Builders, Creators & Explorers',
  description:
    'Basecamp is an open community that brings people together to learn, connect, collaborate, share ideas, and participate in workshops, meetups, and trails. Not limited to students.',
  icons: {
    icon: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className="bg-bc-black text-bc-white selection:bg-bc-red selection:text-white min-h-screen flex flex-col antialiased"
        suppressHydrationWarning
      >
        <BasecampProvider>
          <MuiThemeRegistry>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </MuiThemeRegistry>
        </BasecampProvider>
      </body>
    </html>
  );
}

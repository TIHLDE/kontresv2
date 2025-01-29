import Header from '@/components/layout/header/header';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';
import { cn } from '@/lib/utils';
import { TRPCReactProvider } from '@/trpc/react';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Kontres - Reserver TIHLDEs gjenstander',
    description: 'Reserver alt som TIHLDE har å tilby!',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(inter.className, 'min-h-screen flex flex-col')}
                suppressHydrationWarning
            >
                <SessionProvider>
                    <TRPCReactProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <Header className="lg:flex hidden" />
                            {children}
                            <Toaster />
                        </ThemeProvider>
                    </TRPCReactProvider>
                </SessionProvider>
            </body>
        </html>
    );
}

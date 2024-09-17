import BlurBackground from '@/components/layout/blur-background';
import BottomBarWrapper from '@/components/layout/bottom-bar/bottom-bar-wrapper';
import Header from '@/components/layout/header/header';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';
import { cn } from '@/lib/utils';
import { TRPCReactProvider } from '@/trpc/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';

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
        <html lang="en">
            <body className={cn(inter.className, 'overflow-x-hidden')}>
                <TRPCReactProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Header className="lg:flex hidden" />
                        <div className="py-page pb-32">
                            <Toaster />
                            <BlurBackground>{children}</BlurBackground>
                        </div>
                        <div className="lg:hidden fixed bottom-5 w-full flex z-10">
                            <Suspense>
                                <BottomBarWrapper />
                            </Suspense>
                        </div>
                        {/* <Footer /> <-- Denne må fikses for mobilvisning!! */}
                    </ThemeProvider>
                </TRPCReactProvider>
            </body>
        </html>
    );
}

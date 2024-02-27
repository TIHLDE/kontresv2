import BottomBar from '@/components/layout/bottom-bar';
import Header from '@/components/layout/header';
import { ThemeProvider } from '@/components/ui/theme-provider';

import { getUserData } from '../utils/apis/user';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { getItems } from '@/utils/apis/items';
import { Toaster } from '@/components/ui/toaster';

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
    const userId = cookies().get('user_id');
    let userData;
    try {
        userData = await getUserData(userId?.value ?? '');
    } catch (error) {
        console.error(error);
    }

    let items;
    try {
        items = await getItems();
    } catch (error) {
        console.error(error);
    }

    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header userData={userData} items={items} className="lg:flex hidden" />
                    <div className='py-24'>
                        <Toaster />
                        {children}
                    </div>
                    <BottomBar
                        className="fixed bottom-0 lg:hidden"
                        user={userData}
                    />
                    {/* <Footer /> <-- Denne må fikses for mobilvisning!! */}
                </ThemeProvider>
            </body>
        </html>
    );
}

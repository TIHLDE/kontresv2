'use client';

import { Card, CardContent } from '@/components/ui/card';

import { SideBarNavigationButton } from '../../layout';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <Card className="h-full min-w-72">
            <CardContent className="pt-6">
                <div className="flex flex-col">
                    <SideBarNavigationButton
                        route="/admin/reservations"
                        highlighted={pathname === '/admin/reservations'}
                    >
                        Reservasjoner
                    </SideBarNavigationButton>
                    <SideBarNavigationButton
                        route="/admin/items"
                        highlighted={pathname === '/admin/items'}
                    >
                        Gjenstander
                    </SideBarNavigationButton>
                    <SideBarNavigationButton
                        route="/admin/reservations"
                        highlighted={pathname === '/admin/mystery'}
                    >
                        ???
                    </SideBarNavigationButton>
                </div>
            </CardContent>
        </Card>
    );
}

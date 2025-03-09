import { SideBarNavigationButton } from './layout';
import { CalendarIcon, ShapesIcon } from 'lucide-react';

const Admin = async () => {
    // Get the user

    // Set default values for searchParams if none is defined

    return (
        <div className="flex p-20 flex-col">
            <h1 className="scroll-m-20 text-4xl font-normal tracking-tight lg:text-5xl">
                Admin
            </h1>
            <h2 className="scroll-m-20 text-2xl font-normal tracking-tight opacity-50">
                Hva ønsker du å se?
            </h2>
            <div className="w-fit flex flex-col pt-5">
                <SideBarNavigationButton
                    route="/admin/reservations"
                    className="w-full justify-start gap-5"
                    link={{
                        className: 'w-full',
                    }}
                >
                    <CalendarIcon size={20} />
                    Reservasjoner
                </SideBarNavigationButton>
                <SideBarNavigationButton
                    link={{
                        className: 'w-full',
                    }}
                    route="/admin/items"
                    className="w-full justify-start gap-5"
                >
                    <ShapesIcon size={20} />
                    Gjenstander
                </SideBarNavigationButton>
            </div>
        </div>
    );
};

export default Admin;

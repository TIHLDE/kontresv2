import Breadcrumbs from './_components/breadcrumbs';

export default async function BookingLayout({
    children,
}: React.PropsWithChildren) {
    return (
        <>
            <Breadcrumbs />
            <div>{children}</div>
        </>
    );
}

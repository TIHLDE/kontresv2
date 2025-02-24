export default function CalendarLayout({
    children,
    reservation,
    booking,
}: {
    children: React.ReactNode;
    reservation: React.ReactNode;
    booking: React.ReactNode;
}) {
    return (
        <>
            {children}
            {reservation}
            {booking}
        </>
    );
}

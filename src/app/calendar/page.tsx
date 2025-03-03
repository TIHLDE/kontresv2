import Calendar from './_components/calendar';
import Filter from './_components/filter';

export default function CalendarPage() {
    return (
        <main className="flex flex-col lg:flex-row p-2 gap-2 h-[calc(100vh_-_80px)]">
            <Filter id={1} />
            <Calendar id={1} />
        </main>
    );
}

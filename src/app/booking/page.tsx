import SearchFilters from './components/SearchFilters';

export default async function Page() {
    return (
        <div className="container max-w-page">
            <h1 className="text-3xl font-semibold">Booking</h1>
            <p className="text-sm text-muted-foreground mb-5">
                Bla gjennom det TIHLDE har å tilby av kontor og utstyr
            </p>
            <div className="grid grid-cols-4 gap-4">
                <SearchFilters />
                <div className="max-h-full sticky bg-red-500 col-span-3">B</div>
            </div>
        </div>
    );
}

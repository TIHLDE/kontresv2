export default async function Page() {
    return (
        <div className="container max-w-page">
            <h1 className="text-3xl font-semibold">Booking</h1>
            <p className="text-sm text-muted-foreground mb-5">
                Bla gjennom det TIHLDE har å tilby av kontor og utstyr
            </p>
            <div className="grid grid-cols-4 gap-4">
                <div>
                    <img
                        className="aspect-video object-cover"
                        src="https://images.unsplash.com/photo-1737251043885-1fa62cb12933?q=80&w=2573&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="cover image"
                    />
                </div>
            </div>
        </div>
    );
}

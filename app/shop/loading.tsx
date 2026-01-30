export default function ShopLoading() {
    return (
        <div className="relative min-h-screen bg-[#F8FAFF] overflow-hidden">
            {/* Background Skeleton */}
            <div className="absolute inset-0 pointer-events-none bg-slate-50">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 opacity-80" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] mix-blend-multiply" />
            </div>

            <div className="container relative z-10 px-4 md:px-6 pt-[220px] pb-32 mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">

                    {/* Sidebar Skeleton */}
                    <div className="w-full lg:w-80 space-y-8 flex-shrink-0">
                        {/* Garage Skeleton */}
                        <div className="titanium-card p-8 h-48 animate-pulse bg-white/50" />
                        {/* Dossier Skeleton */}
                        <div className="titanium-card p-8 h-96 animate-pulse bg-white/50" />
                    </div>

                    {/* Main Content Skeleton */}
                    <div className="flex-1">
                        <div className="mb-24 space-y-6">
                            <div className="h-4 w-32 bg-slate-200 rounded-full animate-pulse" />
                            <div className="h-24 w-2/3 bg-slate-200 rounded-[2rem] animate-pulse" />
                            <div className="h-6 w-1/2 bg-slate-100 rounded-lg animate-pulse" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-16 lg:gap-x-16 lg:gap-y-24">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="titanium-card h-[400px] animate-pulse relative overflow-hidden bg-white">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 to-transparent skew-x-12 translate-x-[-200%] animate-[shimmer_2s_infinite]" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

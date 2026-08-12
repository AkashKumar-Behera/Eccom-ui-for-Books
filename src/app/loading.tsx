export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-white text-stone-900 animate-pulse">
      {/* Top Banner Shimmer Placeholder */}
      <div className="w-full h-8 bg-teal-100" />

      {/* Header Navigation Shimmer */}
      <div className="w-full h-16 sm:h-20 border-b border-stone-200 px-4 sm:px-8 flex items-center justify-between bg-white">
        <div className="w-8 h-8 sm:w-24 bg-stone-200 rounded-md" />
        <div className="w-36 sm:w-48 h-8 bg-stone-200 rounded-lg" />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-stone-200 rounded-full" />
          <div className="w-8 h-8 bg-stone-200 rounded-full" />
          <div className="w-8 h-8 bg-stone-200 rounded-full" />
        </div>
      </div>

      {/* Main Container matching exact web & mobile padding/margins */}
      <main className="w-full space-y-8 pb-12 bg-white">
        {/* Hero Section Banner Shimmer */}
        <div className="w-full px-4 sm:px-8 pt-4 sm:pt-6">
          <div className="w-full h-[220px] sm:h-[380px] md:h-[480px] lg:h-[540px] bg-stone-200 rounded-2xl sm:rounded-3xl relative overflow-hidden shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-100/60 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          </div>
        </div>

        {/* Section Heading Shimmer */}
        <div className="w-full px-4 sm:px-8 flex justify-center py-4">
          <div className="h-10 sm:h-12 w-60 sm:w-80 bg-stone-200 rounded-full" />
        </div>

        {/* Featured Collections / Categories Cards Grid Shimmer */}
        <div className="w-full px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="bg-stone-50 border border-stone-200 rounded-3xl p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-sm"
              >
                {/* Image Placeholder */}
                <div className="w-full h-56 sm:h-72 bg-stone-200 rounded-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-100/60 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                </div>
                {/* Title & Button Placeholder */}
                <div className="space-y-3 flex flex-col items-center py-2">
                  <div className="h-6 w-3/4 bg-stone-200 rounded-md" />
                  <div className="h-4 w-1/2 bg-stone-200/70 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

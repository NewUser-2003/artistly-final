
import { Suspense } from "react";
import { ArtistFilterProvider } from "../../context/ArtistFilterContext";
import ArtistList from "../../components/ArtistCard/ArtistList";
import FilterBlock from "../../components/FilterBlock/FilterBlock";

export default function ArtistsPage() {
  return (
    <ArtistFilterProvider>
      <main
        className="
          min-h-screen
          max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12
          bg-gradient-to-br
          from-pink-50 via-purple-50 to-blue-50
          dark:from-gray-900 dark:via-indigo-900 dark:to-gray-900
          transition-colors duration-500
        "
      >
        <header className="max-w-4xl mx-auto md:mx-0 mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary drop-shadow-sm tracking-tight">
            Browse Artists
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
            Discover and book top performers for your event. Use the filters to find artists by category, location, or fee range.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-10">
          <aside className="md:w-1/4 w-full sticky top-24 self-start">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-2xl">
              <FilterBlock />
            </div>
          </aside>

          <section className="flex-1 w-full">
            <Suspense
              fallback={
                <div className="text-center py-16 text-gray-400 dark:text-gray-600">
                  Loading artists...
                </div>
              }
            >
              <ArtistList />
            </Suspense>
          </section>
        </div>
      </main>
    </ArtistFilterProvider>
  );
}



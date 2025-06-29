
import fs from "fs";
import path from "path";
import { useState } from "react";
import Head from "next/head";
import { Button } from "../src/components/ui/button";

// Artist type definition for type safety and clarity
interface Artist {
  id: number;
  name: string;
  category: string[];
  languages?: string[];
  feeRange?: string;
  location?: string;
  image?: string;
  bio?: string;
}

// getStaticProps: Loads artist data at build time from local JSON
// This is only available in the Pages Router, not the App Router
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "public", "artists.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return {
    props: {
      artists: data,
    },
  };
}

// Main component for the shortlist demo page
export default function ArtistsShortlistPage({ artists }: { artists: Artist[] }) {
  // Local state for the user's shortlist
  const [shortlist, setShortlist] = useState<Artist[]>([]);

  // Handles adding/removing an artist from the shortlist
  function handleShortlist(artist: Artist) {
    setShortlist((prev) =>
      prev.find((a) => a.id === artist.id)
        ? prev.filter((a) => a.id !== artist.id)
        : [...prev, artist]
    );
  }

  return (
    <>
      <Head>
        <title>Shortlist Artists | Artistly</title>
        <meta name="description" content="Shortlist your favorite artists on Artistly" />
      </Head>

      <main
        className="
          min-h-screen
          max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12
          bg-gradient-to-br
          from-indigo-50 via-purple-100 to-pink-50
          dark:from-gray-900 dark:via-purple-900 dark:to-pink-900
          transition-colors duration-500
          text-gray-900 dark:text-gray-100
          flex flex-col items-center
        "
      >
        <section className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-8 sm:p-12 border border-gray-200 dark:border-gray-700">
          <h1 className="text-4xl font-extrabold mb-6 text-primary tracking-tight text-center">
            Shortlist Artists
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-10 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
            Browse and shortlist your favorite artists. This page demonstrates static generation with{" "}
            <span className="font-semibold text-primary">getStaticProps</span>.
          </p>

          {/* Artist List */}
          <ul className="space-y-6">
            {artists.map((artist) => {
              const isShortlisted = shortlist.some((a) => a.id === artist.id);
              return (
                <li
                  key={artist.id}
                  className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-5 flex-1 min-w-0">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-20 h-20 rounded-full object-cover flex-shrink-0 shadow-md"
                    />
                    <div className="min-w-0">
                      <h3 className="font-semibold text-lg text-primary truncate">{artist.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {artist.category?.join(", ")}
                      </p>
                      {artist.languages && (
                        <p className="text-sm text-gray-400 dark:text-gray-500 truncate">
                          Languages: {artist.languages.join(", ")}
                        </p>
                      )}
                      {artist.location && (
                        <p className="text-sm text-gray-400 dark:text-gray-500 truncate">
                          Location: {artist.location}
                        </p>
                      )}
                      {artist.feeRange && (
                        <p className="text-sm text-gray-400 dark:text-gray-500 truncate">
                          Fee Range: {artist.feeRange}
                        </p>
                      )}
                      {artist.bio && (
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                          {artist.bio}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant={isShortlisted ? "secondary" : "outline"}
                    size="sm"
                    className="whitespace-nowrap"
                    aria-pressed={isShortlisted}
                    onClick={() => handleShortlist(artist)}
                  >
                    {isShortlisted ? "Shortlisted" : "Shortlist"}
                  </Button>
                </li>
              );
            })}
          </ul>

          <hr className="my-12 border-gray-300 dark:border-gray-700" />

          {/* Shortlist Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-primary text-center">Your Shortlist</h2>
            {shortlist.length === 0 ? (
              <p className="text-center text-gray-400">No artists shortlisted yet.</p>
            ) : (
              <ul className="space-y-6">
                {shortlist.map((artist) => (
                  <li
                    key={artist.id}
                    className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-5 flex-1 min-w-0">
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-20 h-20 rounded-full object-cover flex-shrink-0 shadow-md"
                      />
                      <div className="min-w-0">
                        <h3 className="font-semibold text-lg text-primary truncate">{artist.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {artist.category?.join(", ")}
                        </p>
                        {artist.languages && (
                          <p className="text-sm text-gray-400 dark:text-gray-500 truncate">
                            Languages: {artist.languages.join(", ")}
                          </p>
                        )}
                        {artist.location && (
                          <p className="text-sm text-gray-400 dark:text-gray-500 truncate">
                            Location: {artist.location}
                          </p>
                        )}
                        {artist.feeRange && (
                          <p className="text-sm text-gray-400 dark:text-gray-500 truncate">
                            Fee Range: {artist.feeRange}
                          </p>
                        )}
                        {artist.bio && (
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            {artist.bio}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="whitespace-nowrap"
                      aria-label={`Remove ${artist.name} from shortlist`}
                      onClick={() => setShortlist((prev) => prev.filter((a) => a.id !== artist.id))}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

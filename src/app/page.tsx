import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const categories = [
  {
    name: "Singers",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    href: "/artists?category=Singer",
    description: "Bollywood, classical, and live vocalists.",
  },
  {
    name: "Dancers",
    imageUrl:
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80",
    href: "/artists?category=Dancer",
    description: "Classical, contemporary, and group performers.",
  },
  {
    name: "Speakers",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    href: "/artists?category=Speaker",
    description: "Motivational, corporate, and event speakers.",
  },
  {
    name: "DJs",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    href: "/artists?category=DJ",
    description: "Bollywood, EDM, and club DJs.",
  },
  {
    name: "Magicians",
    imageUrl:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    href: "/artists?category=Magician",
    description: "Stage and close-up magicians.",
  },
  {
    name: "Bands",
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
    href: "/artists?category=Band",
    description: "Live bands for all occasions.",
  },
];

export default function Home() {
  const backgroundImage =
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1920&h=1080";

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white min-h-[65vh] flex items-center justify-center overflow-hidden">
        <Image
          src={backgroundImage}
          alt="Concert background"
          fill
          style={{ objectFit: "cover" }}
          className="z-0"
          priority
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 text-center px-4 py-16 sm:py-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="block text-white">Connect with Amazing</span>
            <span className="block text-amber-400">Performing Artists</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-200">
            Artistly connects event planners with talented performers across
            India — singers, dancers, DJs, and more.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/artists" passHref legacyBehavior={false}>
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
              >
                Browse Artists
              </Button>
            </Link>
            <Link href="/onboard" passHref legacyBehavior={false}>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Join as Artist
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 transition-colors duration-500">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white sm:text-4xl">
              Featured Artist Categories
            </h2>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Explore a variety of professional performers for every event.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {categories.map((cat) => (
              <Link key={cat.name} href={cat.href} className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                <div className="relative h-48 w-full">
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-primary group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/artists" passHref legacyBehavior={false}>
              <Button size="lg" variant="secondary">
                View All Artists
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}


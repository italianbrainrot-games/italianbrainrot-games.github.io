import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/generate-metadata';
import gamesData from '@/data/games.json';

export const metadata: Metadata = generateMetadata({
  title: 'Games',
  description: 'Browse and play the best Merge Fellas games collection',
  path: '/games'
});

export default function GamesPage() {
  // Use data from games.json
  const games = gamesData;

  return (
    <main className="flex min-h-screen flex-col items-center px-4 sm:px-8 md:px-10 lg:px-12 py-4">
      <div className="w-full max-w-[1920px]">
        {/* Top section with title and filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="flex items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">All Games</h1>
            <p className="ml-4 text-sm text-white/60">Explore multiple options for maximum fun</p>
          </div>

          <div className="flex items-center mt-4 sm:mt-0">
            <Link href="https://www.instagram.com/" target="_blank" className="mr-4">
              <div className="bg-red-500 rounded-md p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </div>
            </Link>


          </div>
        </div>

        {/* Game cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6">
          {games.map((game) => (
            <Link key={game.slug} href={`/games/${game.slug}`} className="block">
              <div className="trending-game-card bg-black/40 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 transition-all duration-300 hover:shadow-lg">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={game.iconUrl}
                    alt={game.name}
                    width={500}
                    height={281}
                    className="w-full h-full object-cover transition-transform duration-300 trending-game-image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                  <div className="absolute top-2 left-2 bg-yellow-500/90 backdrop-blur-sm rounded-md px-2 py-1 text-xs font-medium text-black flex items-center z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {game.rating.toFixed(1)}
                  </div>
                  <div className="absolute bottom-0 right-0 p-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-base md:text-lg text-white transition-colors duration-300 trending-game-title line-clamp-2">{game.name}</h3>
                  <p className="text-white/70 text-xs mt-1 mb-2 line-clamp-2">{game.description.substring(0, 150)}...</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {game.category.slice(0, 2).map((cat, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-white/80">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

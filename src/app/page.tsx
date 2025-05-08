import Link from 'next/link';
import Image from 'next/image';
import VerticalGameMarquee from '@/components/home/VerticalGameMarquee';
import HorizontalGameMarquee from '@/components/home/HorizontalGameMarquee';
import ArticleCarousel from '@/components/home/ArticleCarousel';
import ResponsiveStyles from '@/components/home/ResponsiveStyles';
import CustomShareButton from '@/components/ui/CustomShareButton';
import gamesData from '@/data/games.json';
import blogData from '@/data/blog.json';
import type { Metadata } from 'next';
import { getHomeSEO } from '@/lib/seo/seo-config';

export const metadata: Metadata = getHomeSEO();
export const dynamic = 'force-static';
export const revalidate = false;

// Star icon component
function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function Home() {
  // Sort by rating and get the top 4 games as popular games
  const popularGames = [...gamesData].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <main className="flex min-h-screen flex-col items-center p-0">
      <div className="w-full max-w-[1920px] px-4 sm:px-8 md:px-10 lg:px-12">
        {/* Mobile layout - Article carousel on top, game marquee below */}
        <ResponsiveStyles />

        <div className="block lg:hidden py-2 space-y-4">
          {/* Mobile article carousel */}
          <div>
            <ArticleCarousel />
          </div>

          {/* Mobile game marquee (horizontal) */}
          <div>
            <HorizontalGameMarquee />
          </div>
        </div>

        {/* Desktop layout - Game marquee on left, article carousel on right */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-6 py-4">
          {/* Left side game marquee (vertical) */}
          <div className="lg:col-span-4 xl:col-span-3 h-full">
            <VerticalGameMarquee />
          </div>

          {/* Right side article carousel */}
          <div className="lg:col-span-8 xl:col-span-9 pr-12 h-full">
            <ArticleCarousel />
          </div>
        </div>

        <section className="py-8">
          <div className="relative mb-8">
            <div className="py-6 px-4 border-b border-purple-500/20">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                <h2 className="text-xl font-bold text-white drop-shadow-md flex items-center">
                  <span className="w-1 h-6 bg-red-600 mr-2 inline-block"></span>
                  Trending Now
                </h2>
                <Link href="/games" className="text-sm text-white/90 flex items-center view-all-link">
                  <span className='font-bold view-all-text'>VIEW ALL</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-1 text-amber-500 view-all-arrow transition-transform duration-300">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-pink-500/5 opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Popular game cards */}
            {popularGames.map((game) => (
              <div key={game.slug} className="trending-game-card bg-black/40 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 transition-all duration-300 hover:shadow-lg">
                <Link href={`/games/${game.slug}`}>
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={game.iconUrl}
                      alt={game.name}
                      fill
                      className="object-cover transition-transform duration-300 trending-game-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                    <div className="absolute top-2 left-2 bg-yellow-500/90 backdrop-blur-sm rounded-md px-2 py-1 text-xs font-medium text-black flex items-center z-10">
                      <StarIcon className="w-3 h-3 mr-1" />
                      {game.rating.toFixed(1)}
                    </div>
                  </div>
                </Link>
                <div className="p-3">
                  <Link href={`/games/${game.slug}`}>
                    <h3 className="font-bold text-base md:text-lg text-white transition-colors duration-300 trending-game-title line-clamp-2">{game.name}</h3>
                    <p className="text-white/70 text-xs mt-1 mb-2 line-clamp-2">{game.description.substring(0, 150)}...</p>
                  </Link>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex flex-wrap gap-1">
                      {game.category.slice(0, 2).map((cat, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-white/80">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <CustomShareButton
                      title={game.name}
                      slug={game.slug}
                      type="game"
                      iconOnly={true}
                      imageUrl={game.iconUrl}
                      className="text-white/70 hover:text-white p-1.5 rounded-full hover:bg-white/10"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8 pb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-6">
            <h2 className="text-xl font-bold text-white drop-shadow-md flex items-center">
              <span className="w-1 h-6 bg-red-600 mr-2 inline-block"></span>
              Latest Blog Posts
            </h2>
            <Link href="/blog" className="text-sm text-white/90 flex items-center view-all-link">
              <span className='font-bold view-all-text'>VIEW ALL</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-1 text-amber-500 view-all-arrow transition-transform duration-300">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {/* Blog post cards */}
            {blogData.map((post) => (
              <div key={post.slug} className="bg-black/40 backdrop-blur-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-white/10">
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative aspect-video">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="p-3">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.categories.slice(0, 2).map((category) => (
                      <span key={category} className="inline-block px-2 py-0.5 bg-orange-500/80 text-white rounded-full text-xs">
                        {category}
                      </span>
                    ))}
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="font-medium text-base mb-1 text-white hover:text-orange-400 transition-colors">{post.title}</h3>
                    <p className="text-white/70 text-xs mb-2 line-clamp-2">{post.excerpt}</p>
                  </Link>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/50">{post.date}</span>
                    <div className="flex items-center gap-2">
                      <CustomShareButton
                        title={post.title}
                        slug={post.slug}
                        type="blog"
                        iconOnly={true}
                        imageUrl={post.coverImage}
                        className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
                      />
                      <Link href={`/blog/${post.slug}`} className="text-orange-400 hover:text-orange-300 transition-colors text-xs flex items-center">
                        Read More
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}


import Link from 'next/link';
import Image from 'next/image';
import GamePlayer from '@/components/game/game-player';
import ShareButton from '@/components/ui/ShareButton';
import games from '@/data/games.json';
import { generateMetadata as generatePageMetadata } from '@/lib/generate-metadata';

export const dynamic = 'force-static';
export const revalidate = false;

// Required for static site generation with dynamic routes when using output: 'export'
export async function generateStaticParams() {
  return games.map((game) => ({
    gameName: game.slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ gameName: string }> }) {
  const { gameName } = await params;
  const game = games.find(game => game.slug === gameName);
  
  if (!game) {
    return {};
  }
  
  return generatePageMetadata({
    title: game.name,
    description: game.description,
    path: `/games/${game.slug}`,
    image: game.iconUrl
  });
}

// 游戏数据接口
interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  embedUrl: string;
  comments: {
    username: string;
    avatar: string;
    content: string;
    timestamp: string;
    likes: number;
  }[];
  releaseDate: string;
  developer: string;
  category: string[];
  tags: string[];
  votes: number;
  technology: string;
  platform: string[];
  controls: string;
}


// 模拟游戏数据获取函数
function getGameData(gameName: string) {
  const temp = games.find(game => game.slug === gameName)
  return {
    id: temp?.name,
    title: temp?.name,
    description: temp?.description,
    imageUrl: temp?.iconUrl,
    rating: temp?.rating,
    embedUrl: temp?.realUrl,
    comments: temp?.comments || [{}],
    releaseDate: '2023-01-15',
    developer: 'Brainrot Studios',
    category: temp?.category || [],
    tags: temp?.tags || [],
    votes: temp?.votes || 0,
    technology: temp?.technology || 'HTML5',
    platform: temp?.platform || ['Browser'],
    controls: temp?.controls || ''
  } as Game
}

export default async function GamePage({ params }: { params: Promise<{ gameName: string }> }) {
  // const game = getGameData(params.gameName);
  const { gameName } = await params;
  const game = getGameData(gameName);

  // Get similar games based on category
  const similarGames = games
    .filter(g =>
      g.slug !== gameName &&
      g.category.some(cat => game.category.includes(cat))
    )
    .slice(0, 5);

  return (
    <main className="px-0 sm:px-4 md:px-12 lg:px-24 py-4">
      <div className="max-w-full w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 游戏主内容 */}
          <div className="flex-1">
            {/* 游戏嵌入框 */}
            <GamePlayer game={game} />

            {/* 游戏信息 - 三列布局 */}
            <div className="flex flex-col md:flex-row gap-8 my-8 bg-black/40 backdrop-blur-md rounded-none sm:rounded-xl p-4 sm:p-6 mx-0 border border-white/10">
              {/* 左侧 - 游戏封面图 */}
              <div className="md:w-1/4 shrink-0">
                <div className="aspect-[16/9] rounded-lg overflow-hidden">
                  <Image
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full h-full object-contain sm:object-cover"
                    width={500}
                    height={281}
                  />
                </div>
              </div>

              {/* 中间 - 游戏标题和描述 */}
              <div className="md:w-2/4">
                <div className="flex justify-between items-start mb-3">
                  <h1 className="text-3xl font-bold text-white">{game.title}</h1>
                  <ShareButton
                    title={game.title}
                    imageUrl={game.imageUrl}
                    iconOnly={true}
                    className="text-white/70 hover:text-white p-1.5 rounded-full hover:bg-white/10"
                  />
                </div>
                <p className="text-white/80 mb-4">{game.description}</p>

                {/* 游戏控制说明 */}
                {game.controls && (
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2 text-white">Controls</h3>
                    <div className="text-white/80 whitespace-pre-line text-sm bg-black/20 p-3 rounded-lg">
                      {game.controls}
                    </div>
                  </div>
                )}
              </div>

              {/* 右侧 - 游戏元数据 */}
              <div className="md:w-1/4 space-y-4 text-white">
                <div>
                  <span className="block text-white/60 text-sm">Type:</span>
                  <span className="font-medium">{game.category.join(', ')}</span>
                </div>
                <div>
                  <span className="block text-white/60 text-sm">Tags:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {game.tags.map((tag, index) => (
                      <span key={index} className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="block text-white/60 text-sm">Developer:</span>
                  <span className="font-medium text-amber-500">{game.developer}</span>
                </div>
                <div>
                  <span className="block text-white/60 text-sm">Technology:</span>
                  <span className="font-medium">{game.technology}</span>
                </div>
                <div>
                  <span className="block text-white/60 text-sm">Rating:</span>
                  <div className="flex items-center">
                    <span className="font-medium">{game.rating.toFixed(1)}</span>
                    <span className="mx-1">/ 10</span>
                    <span className="text-amber-500">({game.votes} votes)</span>
                  </div>
                </div>
                <div>
                  <span className="block text-white/60 text-sm">Platform:</span>
                  <span className="font-medium">{game.platform.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Comments and Similar Games Section */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Comments Section - Left */}
              <div className="lg:w-2/3 bg-black/40 backdrop-blur-md rounded-none sm:rounded-xl p-4 sm:p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white uppercase">Comments</h2>
                  <div className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
                    <span className="text-xs text-white">!</span>
                  </div>
                </div>

                <p className="text-white/80 text-sm mb-2">
                  Check out what other players think about this game!
                </p>

                <div className="text-xl font-bold text-white mb-6">{game.comments.length} Comments</div>

                {/* Comment list */}
                <div className="space-y-6">
                  {game.comments.map((comment, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={comment.avatar}
                          alt={comment.username}
                          width={40}
                          height={40}
                          className="object-contain sm:object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-white">@{comment.username}</span>
                          <span className="text-xs text-gray-400">{formatTimeAgo(comment.timestamp)}</span>
                        </div>
                        <p className="text-white/90 mb-2">{comment.content}</p>
                        <div className="flex gap-4">
                          <button className="flex items-center gap-1 text-white/60 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                            </svg>
                            <span>{comment.likes}</span>
                          </button>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Similar Games Section - Right */}
              <div className="lg:w-1/3 bg-black/40 backdrop-blur-md rounded-none sm:rounded-xl p-4 sm:p-6 border border-white/10">
                <h2 className="text-2xl font-bold text-white uppercase mb-6">Similar</h2>

                <div className="space-y-4">
                  {similarGames.map((game) => (
                    <Link key={game.slug} href={`/games/${game.slug}`} className="block">
                      <div className="flex gap-3 group">
                        <div className="relative w-24 h-16 rounded-md overflow-hidden shrink-0">
                          <Image
                            src={game.iconUrl}
                            alt={game.name}
                            fill
                            className="object-contain sm:object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">{game.name}</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {game.category.slice(0, 1).map((cat, idx) => (
                              <span key={idx} className="text-xs px-2 py-0.5 bg-orange-500/80 text-white rounded-sm">
                                {cat}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60 group-hover:text-orange-400 transition-colors">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Helper function to format timestamp
function formatTimeAgo(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    const now = new Date();

    // Calculate minutes ago
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);

    if (diffMins < 1) return 'just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return '1 month ago';
    if (diffMonths < 12) return `${diffMonths} months ago`;

    const diffYears = Math.floor(diffMonths / 12);
    if (diffYears === 1) return '1 year ago';
    return `${diffYears} years ago`;
  } catch {
    return '5 minutes ago'; // Fallback
  }
}

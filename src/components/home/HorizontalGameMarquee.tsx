'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Marquee } from '@/components/magicui/marquee';
import { useState } from 'react';
import gamesData from '@/data/games.json';

// 游戏数据接口
interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
}

export default function HorizontalGameMarquee() {
  const [isPaused] = useState(false);
  const [isReversed] = useState(false);

  // 使用 games.json 中的数据
  const games = gamesData.map(game => ({
    id: game.slug,
    title: game.name,
    description: game.category.join(' • '),
    imageUrl: game.iconUrl,
    rating: game.rating
  }));

  return (
    <div className="relative bg-black/20 backdrop-blur-md rounded-xl overflow-hidden border border-white/10">
      <div className="flex justify-between items-center p-2 border-b border-white/10">
        <h2 className="text-base font-bold flex items-center text-white">
          <span className="bg-red-600 text-white px-1 py-0.5 rounded-sm mr-1.5 text-xs">New</span>
          New Games
        </h2>
        <div className="flex items-center text-xs text-white/80">
          <span className="mr-1">Short by:</span>
          <span className="font-medium">Today</span>
        </div>
      </div>

      <div className="relative overflow-hidden px-0 py-2 h-48">
        {!isPaused ? (
          <Marquee
            pauseOnHover={true}
            reverse={isReversed}
            className="py-2 [--gap:1rem] h-full"
            repeat={2}
          >
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </Marquee>
        ) : (
          <div className="flex gap-4 p-2 overflow-x-auto h-full">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}

        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/60 to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/60 to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  );
}

// 游戏卡片组件
function GameCard({ game }: { game: Game }) {
  return (
    <Link href={`/games/${game.id}`} className="block">
      <div className="relative w-36 h-36 rounded-lg overflow-hidden mx-1 game-card-container">
        <Image
          src={game.imageUrl}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-300 ease-in-out game-card-image origin-center"
        />
        {/* 底部毛玻璃标题栏 */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md p-2 pointer-events-none flex justify-between items-center rounded-b-lg">
          <h3 className="text-white font-bold text-sm leading-tight transition-colors duration-300 game-card-title pr-2 truncate">{game.title}</h3>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
            <PlayIcon className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
}

// 图标组件
function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

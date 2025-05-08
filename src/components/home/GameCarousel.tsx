'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 游戏数据接口
interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function GameCarousel() {
  // 模拟游戏数据
  const games: Game[] = [
    {
      id: 'example-1',
      title: 'Kimetsu no Yaiba Movie',
      description: 'Mugen Ressha-hen',
      imageUrl: '/images/game-1.jpg',
    },
    {
      id: 'example-2',
      title: 'Made in Abyss Movie 3',
      description: 'Fukaki Tamashii no Reimei',
      imageUrl: '/images/game-2.jpg',
    },
    {
      id: 'example-3',
      title: '示例游戏 3',
      description: '这是一个示例游戏描述',
      imageUrl: '/images/game-3.jpg',
    },
    {
      id: 'example-4',
      title: '示例游戏 4',
      description: '这是一个示例游戏描述',
      imageUrl: '/images/game-1.jpg',
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <span className="bg-red-600 text-white px-2 py-1 rounded-md mr-2">New</span>
          Trailer
        </h2>
        <div className="flex items-center text-sm">
          <span className="mr-2">Sort by:</span>
          <span className="font-medium">Today</span>
          <ChevronDown className="w-4 h-4 ml-1" />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {games.map((game) => (
            <div key={game.id} className="flex-[0_0_100%] min-w-0 relative pr-0">
              <Link href={`/games/${game.id}`} className="block">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                  <Image
                    src={game.imageUrl}
                    alt={game.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white font-medium text-lg">{game.title}</h3>
                    <p className="text-white/80 text-sm">{game.description}</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/50 rounded-full p-1">
                    <PlayIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1"
        onClick={scrollNext}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="flex justify-center mt-3 gap-1">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === selectedIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}

// 播放图标组件
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

// 下拉图标组件
function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

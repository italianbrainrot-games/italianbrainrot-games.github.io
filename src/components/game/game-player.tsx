'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './game-player.css';

// 游戏数据接口
interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  embedUrl: string;
}

export default function GamePlayer({ game }: { game: Game }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 处理全屏切换
  const toggleFullscreen = () => {
    if (!playerRef.current) return;

    if (!isFullscreen) {
      if (playerRef.current.requestFullscreen) {
        playerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // 处理游戏播放
  const playGame = () => {
    setIsPlaying(true);
  };

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="game-player-container w-full overflow-hidden rounded-none sm:rounded-[2rem]">
      <div
        ref={playerRef}
        className={`relative w-full bg-black/80 backdrop-blur-md overflow-hidden rounded-none sm:rounded-[2rem] ${
          isFullscreen ? 'fullscreen-mode' : ''
        }`}
        style={{
          ...(isFullscreen && {
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0,
            borderRadius: 0,
          })
        }}
      >
        {isPlaying ? (
          <div className={`relative ${isFullscreen ? 'w-full h-full' : ''}`}>
            <iframe
              ref={iframeRef}
              src={game.embedUrl}
              title={game.title}
              className={`w-full border-0 ${isFullscreen ? '' : 'rounded-none sm:rounded-[2rem]'}`}
              style={
                isFullscreen
                  ? { width: '100%', height: '100vh' }
                  : { height: 'calc(100vh - 200px)', minHeight: '400px' }
              }
              allowFullScreen
              referrerPolicy='no-referrer'
            />
            <button
              onClick={toggleFullscreen}
              className={`absolute ${isFullscreen ? 'bottom-8 right-8' : 'bottom-4 right-4'} z-50 flex items-center justify-center w-12 h-12 bg-black/50 backdrop-blur-md rounded-full border border-white/20 shadow-lg hover:bg-black/70 hover:scale-110 transition-all duration-300 cursor-pointer`}
              aria-label="全屏"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isFullscreen ? (
                  <>
                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                  </>
                ) : (
                  <>
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </>
                )}
              </svg>
            </button>
          </div>
        ) : (
          <div className="relative w-full overflow-hidden rounded-none sm:rounded-[2rem]">
            <div
              className="w-full flex items-center justify-center"
              style={{
                height: 'calc(100vh - 200px)',
                minHeight: '400px',
                position: 'relative'
              }}
            >
              <div className="relative w-[480px] h-[270px] max-w-full">
                <Image
                  src={game.imageUrl}
                  alt={game.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>
              <button
                onClick={playGame}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-md rounded-full border-2 border-white/40 shadow-lg hover:bg-white/30 hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-pointer"
                aria-label="开始游戏"
              >
                <div className="relative flex items-center justify-center w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-white/30 rounded-full"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="white" className="relative z-10 transform transition-transform duration-300 ml-2">
                    <polygon points="8,5 19,12 8,19" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

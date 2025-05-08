'use client';

export default function ResponsiveStyles() {
  return (
    <style jsx global>{`
      @media (max-width: 1023px) {
        :root {
          --article-carousel-aspect-ratio: 0.7/1;
          --vertical-game-marquee-height: calc(70vh - 100px);
        }
      }
      @media (min-width: 1024px) {
        :root {
          --article-carousel-aspect-ratio: auto;
          --article-carousel-height: calc(70vh - 120px);
          --vertical-game-marquee-height: calc(70vh - 120px);
        }
      }
    `}</style>
  );
}

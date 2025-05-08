'use client';

export default function ResponsiveStyles() {
  return (
    <style jsx global>{`
      @media (max-width: 1023px) {
        :root {
          --article-carousel-aspect-ratio: 0.7/1;
        }
      }
      @media (min-width: 1024px) {
        :root {
          --article-carousel-aspect-ratio: 1.8/1;
        }
      }
    `}</style>
  );
}
